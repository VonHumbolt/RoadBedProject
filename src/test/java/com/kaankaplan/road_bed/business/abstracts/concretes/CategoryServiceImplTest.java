package com.kaankaplan.road_bed.business.abstracts.concretes;

import com.kaankaplan.road_bed.entities.Category;
import com.kaankaplan.road_bed.repositories.CategoryRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class CategoryServiceImplTest {

    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private CategoryServiceImpl categoryServiceImpl;

    @Test
    void canGetAllCategories() {
        categoryServiceImpl.getAllCategories();

        verify(categoryRepository).findAll();
    }

    @Test
    void canSaveCategory() {
        // given
        Category category = new Category("Village", "https://www.imageurl.com");

        // when
        categoryServiceImpl.save(category);

        // then
        ArgumentCaptor<Category> argumentCaptor = ArgumentCaptor.forClass(Category.class);
        verify(categoryRepository).save(argumentCaptor.capture());

        Category capturedValue = argumentCaptor.getValue();

        assertThat(capturedValue).isEqualTo(category);
    }
}