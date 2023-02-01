package com.kaankaplan.road_bed.business.abstracts;

import com.kaankaplan.road_bed.entities.Category;

import java.util.List;

public interface CategoryService {

    List<Category> getAllCategories();

    Category save(Category category);

}
