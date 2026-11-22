package com.smartcare.pharmacyservice.service;

import com.smartcare.pharmacyservice.exception.ResourceNotFoundException;
import com.smartcare.pharmacyservice.model.Medication;
import com.smartcare.pharmacyservice.repository.MedicationRepository;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class MedicationService {

    private final MedicationRepository repository;

    public MedicationService(MedicationRepository repository) {
        this.repository = repository;
    }

    // Ajouter un medicament
    public Medication create(Medication medication) {

        if (repository.existsByReference(
                medication.getReference())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Cette reference existe deja"
            );
        }

        medication.setId(null);
        return repository.save(medication);
    }

    // Consulter tous les medicaments
    public List<Medication> findAll() {
        return repository.findAll();
    }

    // Consulter un medicament
    public Medication findById(String id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Medicament introuvable : " + id
                        )
                );
    }

    // Modifier un medicament
    public Medication update(String id, Medication data) {

        Medication medication = findById(id);

        repository.findByReference(data.getReference())
                .ifPresent(existing -> {
                    if (!existing.getId().equals(id)) {
                        throw new ResponseStatusException(
                                HttpStatus.CONFLICT,
                                "Cette reference existe deja"
                        );
                    }
                });

        medication.setName(data.getName());
        medication.setDescription(data.getDescription());
        medication.setReference(data.getReference());
        medication.setDosage(data.getDosage());
        medication.setUnit(data.getUnit());
        medication.setPrice(data.getPrice());
        medication.setExpirationDate(data.getExpirationDate());
        medication.setCategoryId(data.getCategoryId());

        return repository.save(medication);
    }

    // Supprimer un medicament
    public void delete(String id) {
        Medication medication = findById(id);
        repository.delete(medication);
    }
}