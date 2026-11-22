package com.smartcare.pharmacyservice.controller;

import jakarta.validation.Valid;
import com.smartcare.pharmacyservice.model.Category;
import com.smartcare.pharmacyservice.service.CategoryService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService service;

    public CategoryController(CategoryService service) {
        this.service = service;
    }

    // POST : Ajouter
    @PostMapping
    public ResponseEntity<Category> create(
            @Valid @RequestBody Category category) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.create(category));
    }

    // GET : Lister
    @GetMapping
    public List<Category> getAll() {
        return service.findAll();
    }

    // GET : Rechercher par ID
    @GetMapping("/{id}")
    public Category getById(@PathVariable String id) {
        return service.findById(id);
    }

    // PUT : Modifier
    @PutMapping("/{id}")
    public Category update(
            @PathVariable String id,
            @Valid @RequestBody Category category) {

        return service.update(id, category);
    }

    // DELETE : Supprimer
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable String id) {

        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
