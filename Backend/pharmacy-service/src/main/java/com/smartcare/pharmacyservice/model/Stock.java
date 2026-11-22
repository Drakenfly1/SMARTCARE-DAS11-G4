package com.smartcare.pharmacyservice.model;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "stocks")
public class Stock {

    @Id
    private String id;

    @Indexed(unique = true)
    @NotBlank
    private String medicationId;

    @Min(0)
    private int quantity;

    @Min(0)
    private int minimumQuantity;

    private LocalDateTime lastUpdated;

    public Stock() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getMedicationId() { return medicationId; }
    public void setMedicationId(String medicationId) {
        this.medicationId = medicationId;
    }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getMinimumQuantity() {
        return minimumQuantity;
    }
    public void setMinimumQuantity(int minimumQuantity) {
        this.minimumQuantity = minimumQuantity;
    }

    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }
    public void setLastUpdated(LocalDateTime lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
}
