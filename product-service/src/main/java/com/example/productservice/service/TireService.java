package com.example.productservice.service;

import com.example.productservice.dto.TireRequest;
import com.example.productservice.model.Tire;
import com.example.productservice.repository.TireRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TireService {
    
    private final TireRepository tireRepository;
    
    public List<Tire> getAllTires() {
        return tireRepository.findByActiveTrue();
    }
    
    public Tire getTireById(Long id) {
        return tireRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pneu não encontrado"));
    }
    
    public List<Tire> getTiresByBrand(String brand) {
        return tireRepository.findByBrandAndActiveTrue(brand);
    }
    
    public List<Tire> getTiresBySize(String size) {
        return tireRepository.findBySizeAndActiveTrue(size);
    }
    
    public List<Tire> getTiresByDimensions(Integer width, Integer profile, Integer diameter) {
        return tireRepository.findByDimensions(width, profile, diameter);
    }
    
    public List<Tire> getTiresBySeason(String season) {
        return tireRepository.findBySeasonAndActiveTrue(season);
    }
    
    @Transactional
    public Tire createTire(TireRequest request) {
        Tire tire = new Tire();
        tire.setBrand(request.getBrand());
        tire.setModel(request.getModel());
        tire.setSize(request.getSize());
        tire.setWidth(request.getWidth());
        tire.setProfile(request.getProfile());
        tire.setDiameter(request.getDiameter());
        tire.setLoadIndex(request.getLoadIndex());
        tire.setSpeedRating(request.getSpeedRating());
        tire.setSeason(request.getSeason());
        tire.setPrice(request.getPrice());
        tire.setStock(request.getStock());
        tire.setDescription(request.getDescription());
        tire.setImageUrl(request.getImageUrl());
        tire.setActive(true);
        
        return tireRepository.save(tire);
    }
    
    @Transactional
    public Tire updateTire(Long id, TireRequest request) {
        Tire tire = getTireById(id);
        
        tire.setBrand(request.getBrand());
        tire.setModel(request.getModel());
        tire.setSize(request.getSize());
        tire.setWidth(request.getWidth());
        tire.setProfile(request.getProfile());
        tire.setDiameter(request.getDiameter());
        tire.setLoadIndex(request.getLoadIndex());
        tire.setSpeedRating(request.getSpeedRating());
        tire.setSeason(request.getSeason());
        tire.setPrice(request.getPrice());
        tire.setStock(request.getStock());
        tire.setDescription(request.getDescription());
        tire.setImageUrl(request.getImageUrl());
        
        return tireRepository.save(tire);
    }
    
    @Transactional
    public void deleteTire(Long id) {
        Tire tire = getTireById(id);
        tire.setActive(false);
        tireRepository.save(tire);
    }
    
    @Transactional
    public void updateStock(Long id, Integer quantity) {
        Tire tire = getTireById(id);
        tire.setStock(tire.getStock() + quantity);
        tireRepository.save(tire);
    }
}
