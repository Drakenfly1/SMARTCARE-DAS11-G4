package com.smartcare.pharmacyservice.repository;

import com.smartcare.pharmacyservice.model.Medication;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MedicationRepository
        extends MongoRepository<Medication, String> {

    Optional<Medication> findByReference(String reference);

    boolean existsByReference(String reference);
}