package com.smartcare.gateway;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(properties = {"spring.cloud.discovery.enabled=false", "eureka.client.enabled=false"})
class SmartcareGatewayApplicationTests {
    @Test
    void contextLoads() {
    }
}
