package com.kaankaplan.road_bed.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "locations")
public class Location {

    @Id
    private String locationId;

    public City city;

    @Indexed(unique = true)
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
