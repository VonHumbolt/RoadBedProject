package com.kaankaplan.road_bed.entities;

import java.io.Serializable;
import java.util.Date;

public class RefreshToken implements Serializable {

    public String refreshToken;
    public String email;
    public Date createdAt;

    public RefreshToken(String refreshToken, String email, Date createdAt) {
        this.refreshToken = refreshToken;
        this.email = email;
        this.createdAt = createdAt;
    }

    public RefreshToken() {
    }
}
