package com.smartcare.pharmacyservice.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "stock_movements")
public class StockMovement {

    @Id
    private String id;

    private String stockId;
    private String medicationId;
    private String type;
    private int quantity;
    private String reason;
    private String performedBy;
    private LocalDateTime movementDate;

    public StockMovement() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getStockId() { return stockId; }
    public void setStockId(String stockId) {
        this.stockId = stockId;
    }

    public String getMedicationId() { return medicationId; }
    public void setMedicationId(String medicationId) {
        this.medicationId = medicationId;
    }

    public String getType() { return type; }
    public void setType(String type) {
        this.type = type;
    }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getReason() { return reason; }
    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getPerformedBy() { return performedBy; }
    public void setPerformedBy(String performedBy) {
        this.performedBy = performedBy;
    }

    public LocalDateTime getMovementDate() {
        return movementDate;
    }
    public void setMovementDate(LocalDateTime movementDate) {
        this.movementDate = movementDate;
    }
}
