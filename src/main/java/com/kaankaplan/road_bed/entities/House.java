package com.kaankaplan.road_bed.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;


@Document(collection = "houses")
public class House {

    @Id
    private String houseId;

    public int capacity;

    public String imageUrl;

    public Float price;

    @Field
    public Location location;

    public House(int capacity, String imageUrl, Float price, Location location) {
        this.capacity = capacity;
        this.imageUrl = imageUrl;
        this.price = price;
        this.location = location;
    }

    public House() { }

    public String getHouseId() {
        return houseId;
    }
}
