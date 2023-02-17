package com.kaankaplan.road_bed.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Document(collection = "houses")
public class House implements Serializable {

    @Id
    private String houseId;

    public int capacity;

    public List<Image> imageUrlList;

    public Float price;

    public String description;

    public Category category;

    public User owner;
    public List<Date> reservedDates = new ArrayList<>();
    public City city;

    public String address;

    public House(int capacity, List<Image> imageUrlList, Float price, City city, String address) {
        this.capacity = capacity;
        this.imageUrlList = imageUrlList;
        this.price = price;
        this.city = city;
        this.address= address;
    }

    public House() { }

    public String getHouseId() {
        return houseId;
    }

}
