package com.example.productservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "tires")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Tire {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String brand;
    
    @Column(nullable = false)
    private String model;
    
    @Column(nullable = false)
    private String size; // Ex: 205/55R16
    
    @Column(nullable = false)
    private Integer width; // Largura em mm
    
    @Column(nullable = false)
    private Integer profile; // Perfil (altura)
    
    @Column(nullable = false)
    private Integer diameter; // Diâmetro do aro em polegadas
    
    @Column(nullable = false)
    private String loadIndex; // Índice de carga
    
    @Column(nullable = false)
    private String speedRating; // Índice de velocidade
    
    @Column(nullable = false)
    private String season; // ALL_SEASON, SUMMER, WINTER
    
    @Column(nullable = false)
    private BigDecimal price;
    
    @Column(nullable = false)
    private Integer stock;
    
    private String description;
    
    private String imageUrl;
    
    @Column(nullable = false)
    private Boolean active = true;
}