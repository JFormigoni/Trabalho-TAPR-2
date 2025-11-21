package com.example.order_service.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class OrderItemRequest {
    private Long tireId;
    private String tireBrand;
    private String tireModel;
    private String tireSize;
    private BigDecimal price;
    private Integer quantity;
}
