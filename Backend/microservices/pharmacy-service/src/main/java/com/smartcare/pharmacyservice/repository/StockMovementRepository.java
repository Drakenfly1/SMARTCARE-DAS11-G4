package com.smartcare.pharmacyservice.repository;

import com.smartcare.pharmacyservice.model.StockMovement;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface StockMovementRepository
        extends MongoRepository<StockMovement, String> {

    List<StockMovement>
    findByStockIdOrderByMovementDateDesc(String stockId);

    List<StockMovement>
    findAllByOrderByMovementDateDesc();
}
