package com.kaankaplan.road_bed.entities;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "admins")
public class Admin extends User{

    public List<House> deletedHouses;

    public List<User> deletedUsers;

    public Admin() { }
}
