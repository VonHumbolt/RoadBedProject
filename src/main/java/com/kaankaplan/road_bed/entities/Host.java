package com.kaankaplan.road_bed.entities;

import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "hosts")
public class Host extends User{

    @Indexed(unique = true)
    public String phoneNumber;

    public List<House> ownHouses;

    public Host() { }
}
