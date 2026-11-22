package com.smartcare.pharmacyservice.service;

import com.smartcare.pharmacyservice.exception.ResourceNotFoundException;
import com.smartcare.pharmacyservice.model.Category;
import com.smartcare.pharmacyservice.repository.CategoryRepository;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository repository;

    public CategoryService(CategoryRepository repository) {
        this.repository = repository;
    }

    // Ajouter une categorie
    public Category create(Category category) {

        if (repository.existsByNameIgnoreCase(category.getName())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Cette categorie existe deja"
            );
        }

        category.setId(null);
        return repository.save(category);
    }

    // Consulter toutes les categories
    public List<Category> findAll() {
        return repository.findAll();
    }

    // Rechercher une categorie par ID
    public Category findById(String id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Categorie introuvable : " + id
                        )
                );
    }

    // Modifier une categorie
    public Category update(String id, Category data) {

        Category category = findById(id);

        if (!category.getName().equalsIgnoreCase(data.getName())
                && repository.existsByNameIgnoreCase(data.getName())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Cette categorie existe deja"
            );
        }

        category.setName(data.getName());
        category.setDescription(data.getDescription());

        return repository.save(category);
    }

    // Supprimer une categorie
    public void delete(String id) {
        Category category = findById(id);
        repository.delete(category);
    }
}