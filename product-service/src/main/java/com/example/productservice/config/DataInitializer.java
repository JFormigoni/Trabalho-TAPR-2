package com.example.productservice.config;

import com.example.productservice.model.Tire;
import com.example.productservice.repository.TireRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Arrays;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    
    private final TireRepository tireRepository;
    
    @Override
    public void run(String... args) {
        if (tireRepository.count() == 0) {
            tireRepository.saveAll(Arrays.asList(
                new Tire(null, "Michelin", "Primacy 4", "205/55R16", 205, 55, 16, "91", "V", "ALL_SEASON", 
                    new BigDecimal("450.00"), 50, "Pneu de alta performance para carros de passeio", 
                    "https://example.com/michelin-primacy4.jpg", true),
                
                new Tire(null, "Pirelli", "P7 Cinturato", "225/45R17", 225, 45, 17, "94", "W", "SUMMER", 
                    new BigDecimal("520.00"), 30, "Excelente aderência em piso seco e molhado", 
                    "https://example.com/pirelli-p7.jpg", true),
                
                new Tire(null, "Goodyear", "Eagle F1", "245/40R18", 245, 40, 18, "97", "Y", "SUMMER", 
                    new BigDecimal("680.00"), 25, "Pneu esportivo de alto desempenho", 
                    "https://example.com/goodyear-eagle.jpg", true),
                
                new Tire(null, "Continental", "WinterContact", "195/65R15", 195, 65, 15, "91", "T", "WINTER", 
                    new BigDecimal("380.00"), 40, "Ideal para condições de inverno e neve", 
                    "https://example.com/continental-winter.jpg", true),
                
                new Tire(null, "Bridgestone", "Turanza T005", "215/60R16", 215, 60, 16, "95", "V", "ALL_SEASON", 
                    new BigDecimal("490.00"), 45, "Conforto e durabilidade para uso diário", 
                    "https://example.com/bridgestone-turanza.jpg", true),
                
                new Tire(null, "Yokohama", "BluEarth", "185/65R15", 185, 65, 15, "88", "H", "ALL_SEASON", 
                    new BigDecimal("320.00"), 60, "Pneu econômico com baixa resistência ao rolamento", 
                    "https://example.com/yokohama-bluearth.jpg", true),
                
                new Tire(null, "Michelin", "Pilot Sport 4", "255/35R19", 255, 35, 19, "96", "Y", "SUMMER", 
                    new BigDecimal("850.00"), 20, "Performance máxima para carros esportivos", 
                    "https://example.com/michelin-pilot.jpg", true),
                
                new Tire(null, "Pirelli", "Scorpion Verde", "235/55R18", 235, 55, 18, "100", "V", "ALL_SEASON", 
                    new BigDecimal("620.00"), 35, "Pneu SUV com eficiência energética", 
                    "https://example.com/pirelli-scorpion.jpg", true)
            ));
        }
    }
}
