package com.kaankaplan.road_bed.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "roles")
public class Role {

    @Id
    private String roleId;

    @Indexed(unique = true)
    public String roleName;

    public Role(String roleName) {
        this.roleName = roleName;
    }

    public Role() { }

    public String getRoleId() {
        return roleId;
    }
}
