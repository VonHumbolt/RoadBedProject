package com.kaankaplan.road_bed.entities;

import java.io.Serializable;

public class Image implements Serializable {

    private final String imageId;
    public String imageUrl;

    public Image(String imageId, String imageUrl) {
        this.imageId = imageId;
        this.imageUrl = imageUrl;
    }

    public String getImageId() {
        return imageId;
    }
}
