package com.example.orderservice.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.Instant;
import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.sns.AmazonSNS;
import com.amazonaws.services.sns.model.PublishRequest;
import com.example.orderservice.model.Order;
import com.example.orderservice.repository.OrderRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private AmazonS3 amazonS3;

    @Autowired
    private AmazonSNS amazonSNS;

    @Value("${aws.s3.bucket.name}")
    private String s3BucketName;

    @Value("${aws.sns.topic.arn}")
    private String snsTopicArn;

    /**
     * Creates a new order, uploads the invoice to S3, saves data to DynamoDB,
     * and sends an SNS notification.
     *
     * @param customerName  The name of the customer.
     * @param orderAmount   The amount of the order.
     * @param invoice       The invoice PDF file.
     * @return The saved Order object.
     */
    public Order createOrder(String customerName, Double orderAmount, MultipartFile invoice) {
        // 1. Upload the invoice PDF to S3 and get its URL[cite: 23].
        String invoiceUrl = uploadFileToS3(invoice);

        // 2. Create the Order object with the details[cite: 12, 13, 14, 15].
        Order order = new Order();
        order.setCustomerName(customerName);
        order.setOrderAmount(orderAmount);
        order.setOrderDate(Instant.now().toString()); // Set current time as ISO Timestamp[cite: 14].
        order.setInvoiceFileUrl(invoiceUrl);

        // 3. Save the complete order object to DynamoDB[cite: 22].
        orderRepository.save(order);

        // 4. Publish a notification message to the SNS topic[cite: 24].
        String message = String.format("New order created! ID: %s, Customer: %s, Amount: %.2f",
                order.getOrderId(), order.getCustomerName(), order.getOrderAmount());
        publishToSnsTopic(message);

        return order;
    }

    /**
     * Retrieves a single order by its ID from DynamoDB.
     *
     * @param orderId The UUID of the order.
     * @return The found Order object or null if not found.
     */
    public Order getOrderById(String orderId) {
        return orderRepository.findById(orderId);
    }

    /**
     * Retrieves all orders from the DynamoDB table.
     *
     * @return A list of all Order objects.
     */
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    /**
     * Private helper method to handle the file upload to S3.
     *
     * @param multipartFile The file from the HTTP request.
     * @return The public URL of the uploaded file.
     */
    private String uploadFileToS3(MultipartFile multipartFile) {
        String fileName = System.currentTimeMillis() + "_" + multipartFile.getOriginalFilename();
        File file = convertMultiPartFileToFile(multipartFile);
        amazonS3.putObject(s3BucketName, fileName, file);
        file.delete(); // Clean up the temporary file from the server.
        return amazonS3.getUrl(s3BucketName, fileName).toString();
    }

    /**
     * Private helper method to publish a message to the configured SNS topic.
     *
     * @param message The string message to be sent.
     */
    private void publishToSnsTopic(String message) {
        PublishRequest publishRequest = new PublishRequest()
                .withTopicArn(snsTopicArn)
                .withMessage(message)
                .withSubject("New Order Created");
        amazonSNS.publish(publishRequest);
    }

    /**
     * Private helper method to convert a MultipartFile to a standard Java File.
     *
     * @param file The MultipartFile to convert.
     * @return The converted File object.
     */
    private File convertMultiPartFileToFile(MultipartFile file) {
        // Create a temporary file.
        File convertedFile = new File(Objects.requireNonNull(file.getOriginalFilename()));
        try (FileOutputStream fos = new FileOutputStream(convertedFile)) {
            fos.write(file.getBytes());
        } catch (IOException e) {
            // In a real application, handle this exception more gracefully.
            throw new RuntimeException("Error converting multipart file to file", e);
        }
        return convertedFile;
    }
}