package com.smartcare.pharmacyservice.controller;

import jakarta.validation.Valid;
import com.smartcare.pharmacyservice.model.Medication;
import com.smartcare.pharmacyservice.service.MedicationService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medications")
public class MedicationController {

    private final MedicationService service;

    public MedicationController(MedicationService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Medication> create(
            @Valid @RequestBody Medication medication) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.create(medication));
    }

    @GetMapping
    public List<Medication> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public Medication getById(@PathVariable String id) {
        return service.findById(id);
    }

    @PutMapping("/{id}")
    public Medication update(
            @PathVariable String id,
            @Valid @RequestBody Medication medication) {

        return service.update(id, medication);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable String id) {

        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
