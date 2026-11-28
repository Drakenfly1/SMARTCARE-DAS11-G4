package com.smartcare.gateway;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class FallbackController {

    @RequestMapping("/fallback/appointments")
    public ResponseEntity<Map<String, Object>> appointmentsFallback() {
        return ResponseEntity.ok(Map.of(
                "message", "Appointment service is temporarily unavailable",
                "degraded", true));
    }
}