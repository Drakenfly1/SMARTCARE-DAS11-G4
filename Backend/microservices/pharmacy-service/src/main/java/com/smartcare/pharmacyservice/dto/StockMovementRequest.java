package com.smartcare.pharmacyservice.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record StockMovementRequest(

        @Min(value = 1, message = "Quantite minimale : 1")
        int quantity,

        @NotBlank(message = "Le motif est obligatoire")
        String reason,

        @NotBlank(message = "L'operateur est obligatoire")
        String performedBy

) {}