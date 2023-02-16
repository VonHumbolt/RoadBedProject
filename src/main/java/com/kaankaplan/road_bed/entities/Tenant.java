package com.kaankaplan.road_bed.entities;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "tenants")
public class Tenant extends User{

    public List<House> visitedHouses = new ArrayList<>();

    public List<House> ownHouses = new ArrayList<>();
    public Tenant() { }
}
