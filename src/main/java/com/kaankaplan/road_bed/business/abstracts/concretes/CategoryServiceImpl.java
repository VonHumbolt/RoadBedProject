package com.kaankaplan.road_bed.business.abstracts.concretes;

import com.kaankaplan.road_bed.business.abstracts.CategoryService;
import com.kaankaplan.road_bed.config.concerns.loging.ToLog;
import com.kaankaplan.road_bed.entities.Category;
import com.kaankaplan.road_bed.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Cacheable(value = "categories")
    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @CacheEvict(value = "categories", allEntries = true)
    @ToLog
    @Override
    public Category save(Category category) {
        return categoryRepository.save(category);
    }
}
