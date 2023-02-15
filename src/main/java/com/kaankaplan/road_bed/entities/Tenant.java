package com.kaankaplan.road_bed.entities;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Document(collection = "tenants")
public class Tenant extends User{

    @Field
    public List<House> visitedHouses;


    public Tenant() { }
}
