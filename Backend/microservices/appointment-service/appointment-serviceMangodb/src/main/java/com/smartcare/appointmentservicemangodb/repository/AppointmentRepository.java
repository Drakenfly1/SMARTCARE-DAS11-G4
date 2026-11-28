package com.smartcare.appointmentservicemangodb.repository;

import com.smartcare.appointmentservicemangodb.model.Appointment;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AppointmentRepository extends MongoRepository<Appointment, String> {
}