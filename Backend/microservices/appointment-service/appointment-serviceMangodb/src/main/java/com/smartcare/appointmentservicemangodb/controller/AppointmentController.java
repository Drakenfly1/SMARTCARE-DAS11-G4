package com.smartcare.appointmentservicemangodb.controller;

import com.smartcare.appointmentservicemangodb.model.Appointment;
import com.smartcare.appointmentservicemangodb.repository.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentRepository repository;

    @Value("${server.port}")
    private String port;

    @GetMapping
    public List<Appointment> getAll() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getById(@PathVariable String id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Appointment create(@RequestBody Appointment appointment) {
        return repository.save(appointment);
    }

    // Will be used later to see WHICH instance answered (load balancing proof)
    @GetMapping("/instance")
    public Map<String, String> instance() {
        return Map.of("service", "appointment-service", "port", port);
    }
}