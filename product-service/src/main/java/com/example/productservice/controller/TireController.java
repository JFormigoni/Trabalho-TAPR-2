package com.example.productservice.controller;

import com.example.productservice.dto.TireRequest;
import com.example.productservice.model.Tire;
import com.example.productservice.service.TireService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tires")
@RequiredArgsConstructor
public class TireController {
    
    private final TireService tireService;
    
    @GetMapping
    public ResponseEntity<List<Tire>> getAllTires() {
        return ResponseEntity.ok(tireService.getAllTires());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Tire> getTireById(@PathVariable Long id) {
        return ResponseEntity.ok(tireService.getTireById(id));
    }
    
    @GetMapping("/brand/{brand}")
    public ResponseEntity<List<Tire>> getTiresByBrand(@PathVariable String brand) {
        return ResponseEntity.ok(tireService.getTiresByBrand(brand));
    }
    
    @GetMapping("/size/{size}")
    public ResponseEntity<List<Tire>> getTiresBySize(@PathVariable String size) {
        return ResponseEntity.ok(tireService.getTiresBySize(size));
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<Tire>> searchByDimensions(
            @RequestParam Integer width,
            @RequestParam Integer profile,
            @RequestParam Integer diameter) {
        return ResponseEntity.ok(tireService.getTiresByDimensions(width, profile, diameter));
    }
    
    @GetMapping("/season/{season}")
    public ResponseEntity<List<Tire>> getTiresBySeason(@PathVariable String season) {
        return ResponseEntity.ok(tireService.getTiresBySeason(season));
    }
    
    @PostMapping
    public ResponseEntity<Tire> createTire(@RequestBody TireRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(tireService.createTire(request));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Tire> updateTire(@PathVariable Long id, @RequestBody TireRequest request) {
        return ResponseEntity.ok(tireService.updateTire(id, request));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTire(@PathVariable Long id) {
        tireService.deleteTire(id);
        return ResponseEntity.noContent().build();
    }
    
    @PatchMapping("/{id}/stock")
    public ResponseEntity<Void> updateStock(@PathVariable Long id, @RequestParam Integer quantity) {
        tireService.updateStock(id, quantity);
        return ResponseEntity.ok().build();
    }
}
