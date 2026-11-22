package com.smartcare.pharmacyservice.repository;

import com.smartcare.pharmacyservice.model.Stock;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface StockRepository
        extends MongoRepository<Stock, String> {

    Optional<Stock> findByMedicationId(String medicationId);

    boolean existsByMedicationId(String medicationId);
}
