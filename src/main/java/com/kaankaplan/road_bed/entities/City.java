package com.kaankaplan.road_bed.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

@Document(collection = "cities")
public class City implements Serializable {

    @Id
    private String cityId;

    public String cityName;

    public String cityImageUrl;

    public City(String cityName) {
        this.cityName = cityName;
    }

    public City() { }

    public String getCityId() {
        return cityId;
    }
}
