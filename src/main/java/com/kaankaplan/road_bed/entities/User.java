package com.kaankaplan.road_bed.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;


@Document(collection = "users")
public class User {

    @Id
    private String userId;

    @Indexed(unique = true)
    public String email;

    public String fullName;

    public String password;

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
