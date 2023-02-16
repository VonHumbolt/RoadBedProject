package com.kaankaplan.road_bed.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;


@Document(collection = "users")
public class User implements Serializable {

    @Id
    private String userId;

    public String email;

    public String fullName;

    public String password;

    public List<House> favoriteHouses = new ArrayList<>();

    @Field
    public Role role;

    public User(String email, String fullName, String password, Role role) {
        this.email = email;
        this.fullName = fullName;
        this.password = password;
        this.role = role;
    }

    public User() { }

    public String getUserId() {
        return userId;
    }

}
