package com.kaankaplan.road_bed.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

@Document(collection = "categories")
public class Category implements Serializable {
    @Id
    private String categoryId;
    public String categoryName;
    public String categoryImageUrl;

    public Category(String categoryName, String categoryImageUrl) {
        this.categoryName = categoryName;
        this.categoryImageUrl = categoryImageUrl;
    }

    public Category() {
    }

    public String getCategoryId() {
        return categoryId;
    }
}
