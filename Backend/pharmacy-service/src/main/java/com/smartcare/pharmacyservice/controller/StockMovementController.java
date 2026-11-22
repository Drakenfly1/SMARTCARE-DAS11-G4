package com.smartcare.pharmacyservice.controller;

import com.smartcare.pharmacyservice.model.StockMovement;
import com.smartcare.pharmacyservice.service.StockMovementService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stock-movements")
public class StockMovementController {

    private final StockMovementService service;

    public StockMovementController(
            StockMovementService service) {
        this.service = service;
    }

    @GetMapping
    public List<StockMovement> getAll() {
        return service.findAll();
    }

    @GetMapping("/stock/{stockId}")
    public List<StockMovement> getByStock(
            @PathVariable String stockId) {
        return service.findByStockId(stockId);
    }
}
