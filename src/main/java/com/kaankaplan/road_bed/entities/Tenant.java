package com.kaankaplan.road_bed.entities;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "tenants")
public class Tenant extends User{

    public List<House> visitedHouses;

    public List<House> favoriteHouses;

    public Tenant() { }
}
