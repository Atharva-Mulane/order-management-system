package com.example.orderservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.orderservice.model.Order;
import com.example.orderservice.service.OrderService;

@RestController
@RequestMapping("/orders") 
@CrossOrigin(origins = { "http://localhost:5173", "http://atharva-order-management-ui.s3-website-us-east-1.amazonaws.com" })
public class OrderController {

    @Autowired
    private OrderService orderService;

    // Endpoint: POST /orders
    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestParam("customerName") String customerName,
                                             @RequestParam("orderAmount") Double orderAmount,
                                             @RequestParam("invoice") MultipartFile invoice) {
        Order createdOrder = orderService.createOrder(customerName, orderAmount, invoice);
        return ResponseEntity.ok(createdOrder);
    }

    // Endpoint: GET /orders/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable String id) {
        Order order = orderService.getOrderById(id);
        if (order != null) {
            return ResponseEntity.ok(order);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint: GET /orders
    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }
}