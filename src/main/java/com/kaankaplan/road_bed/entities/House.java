package com.kaankaplan.road_bed.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "houses")
public class House {

    @Id
    private String houseId;

    public int capacity;

    public String imageUrl;

    public Float price;

    public City city;

    public String address;

    public House(int capacity, String imageUrl, Float price, City city, String address) {
        this.capacity = capacity;
        this.imageUrl = imageUrl;
        this.price = price;
        this.city = city;
        this.address= address;
    }

    public House() { }

    public String getHouseId() {
        return houseId;
    }
}
