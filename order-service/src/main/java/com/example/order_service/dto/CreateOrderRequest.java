package com.example.order_service.dto;

import lombok.Data;

import java.util.List;

@Data
public class CreateOrderRequest {
    private Long userId;
    private List<OrderItemRequest> items;
    private String deliveryAddress;
    private String deliveryCity;
    private String deliveryState;
    private String deliveryZipCode;
}
