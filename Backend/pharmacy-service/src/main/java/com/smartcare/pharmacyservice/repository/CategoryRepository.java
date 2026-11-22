package com.smartcare.pharmacyservice.repository;

import com.smartcare.pharmacyservice.model.Category;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository
        extends MongoRepository<Category, String> {

    boolean existsByNameIgnoreCase(String name);
}