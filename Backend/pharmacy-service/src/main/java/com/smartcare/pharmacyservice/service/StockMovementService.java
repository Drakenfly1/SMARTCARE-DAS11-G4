package com.smartcare.pharmacyservice.service;

import com.smartcare.pharmacyservice.dto.StockMovementRequest;
import com.smartcare.pharmacyservice.model.Stock;
import com.smartcare.pharmacyservice.model.StockMovement;
import com.smartcare.pharmacyservice.repository.StockMovementRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class StockMovementService {

    private final StockMovementRepository repository;
    private final StockService stockService;

    public StockMovementService(
            StockMovementRepository repository,
            StockService stockService) {
        this.repository = repository;
        this.stockService = stockService;
    }

    @Transactional
    public Stock entry(String stockId,
                       StockMovementRequest request) {

        Stock stock = stockService.addStock(
                stockId, request.quantity()
        );

        saveMovement(stock, "ENTRY", request);

        return stock;
    }

    @Transactional
    public Stock exit(String stockId,
                      StockMovementRequest request) {

        Stock stock = stockService.removeStock(
                stockId, request.quantity()
        );

        saveMovement(stock, "EXIT", request);

        return stock;
    }

    private void saveMovement(
            Stock stock,
            String type,
            StockMovementRequest request) {

        StockMovement movement = new StockMovement();

        movement.setStockId(stock.getId());
        movement.setMedicationId(stock.getMedicationId());
        movement.setType(type);
        movement.setQuantity(request.quantity());
        movement.setReason(request.reason());
        movement.setPerformedBy(request.performedBy());
        movement.setMovementDate(LocalDateTime.now());

        repository.save(movement);
    }

    public List<StockMovement> findAll() {
        return repository.findAllByOrderByMovementDateDesc();
    }

    public List<StockMovement> findByStockId(String stockId) {
        stockService.findById(stockId);

        return repository
                .findByStockIdOrderByMovementDateDesc(stockId);
    }
}