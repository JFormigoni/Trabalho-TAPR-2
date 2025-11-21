package com.example.productservice.repository;

import com.example.productservice.model.Tire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TireRepository extends JpaRepository<Tire, Long> {
    
    List<Tire> findByActiveTrue();
    
    List<Tire> findByBrandAndActiveTrue(String brand);
    
    List<Tire> findBySizeAndActiveTrue(String size);
    
    @Query("SELECT t FROM Tire t WHERE t.width = :width AND t.profile = :profile AND t.diameter = :diameter AND t.active = true")
    List<Tire> findByDimensions(@Param("width") Integer width, 
                                @Param("profile") Integer profile, 
                                @Param("diameter") Integer diameter);
    
    List<Tire> findBySeasonAndActiveTrue(String season);
}
