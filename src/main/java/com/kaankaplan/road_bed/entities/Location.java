package com.kaankaplan.road_bed.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "locations")
public class Location {

    @Id
    private String locationId;

    @Field
    public City city;

    public String address;

    public Location(City city, String address) {
        this.city = city;
        this.address = address;
    }

    public Location() { }

    public String getLocationId() {
        return locationId;
    }
}
