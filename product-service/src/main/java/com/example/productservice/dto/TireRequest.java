package com.example.productservice.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class TireRequest {
    private String brand;
    private String model;
    private String size;
    private Integer width;
    private Integer profile;
    private Integer diameter;
    private String loadIndex;
    private String speedRating;
    private String season;
    private BigDecimal price;
    private Integer stock;
    private String description;
    private String imageUrl;
}
