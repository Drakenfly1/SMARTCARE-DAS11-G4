package com.smartcare.pharmacyservice.controller;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import com.smartcare.pharmacyservice.model.Stock;
import com.smartcare.pharmacyservice.service.StockService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.smartcare.pharmacyservice.dto.StockMovementRequest;
import com.smartcare.pharmacyservice.service.StockMovementService;
import java.util.List;



@RestController
@RequestMapping("/api/stocks")
@Validated
public class StockController {

    private final StockMovementService movementService;
    private final StockService service;


    public StockController(
            StockService service,
            StockMovementService movementService) {

        this.service = service;
        this.movementService = movementService;
    }

    @PostMapping
    public ResponseEntity<Stock> create(
            @Valid @RequestBody Stock stock) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.create(stock));
    }

    @GetMapping
    public List<Stock> getAll() {
        return service.findAll();
    }

    @GetMapping("/alerts")
    public List<Stock> getAlerts() {
        return service.getLowStocks();
    }

    @GetMapping("/{id}")
    public Stock getById(@PathVariable String id) {
        return service.findById(id);
    }


    @PostMapping("/{id}/entry")
    public Stock entry(
            @PathVariable String id,
            @Valid @RequestBody StockMovementRequest request) {

        return movementService.entry(id, request);
    }

    @PostMapping("/{id}/exit")
    public Stock exit(
            @PathVariable String id,
            @Valid @RequestBody StockMovementRequest request) {

        return movementService.exit(id, request);
    }

}
