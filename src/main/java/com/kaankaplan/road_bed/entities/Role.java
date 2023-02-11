package com.kaankaplan.road_bed.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

@Document(collection = "roles")
public class Role implements Serializable {

    @Id
    private String roleId;

    public String roleName;

    public Role(String roleName) {
        this.roleName = roleName;
    }

    public Role() { }

    public String getRoleId() {
        return roleId;
    }
}
