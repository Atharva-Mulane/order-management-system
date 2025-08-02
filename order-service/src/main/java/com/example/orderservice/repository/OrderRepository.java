package com.example.orderservice.repository;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.example.orderservice.model.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class OrderRepository {

    @Autowired
    private DynamoDBMapper dynamoDBMapper;

    public Order save(Order order) {
        dynamoDBMapper.save(order);
        return order;
    }

    public Order findById(String orderId) {
        return dynamoDBMapper.load(Order.class, orderId);
    }

    public List<Order> findAll() {
        return dynamoDBMapper.scan(Order.class, new DynamoDBScanExpression());
    }
}