package com.kaankaplan.road_bed;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class RoadBedApplication {

    public static void main(String[] args) {
        SpringApplication.run(RoadBedApplication.class, args);
    }

}
