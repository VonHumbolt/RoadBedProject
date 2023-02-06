package com.kaankaplan.road_bed.business.abstracts.concretes;

import com.kaankaplan.road_bed.config.cloudinary.ImageUploadService;
import com.kaankaplan.road_bed.entities.City;
import com.kaankaplan.road_bed.entities.House;
import com.kaankaplan.road_bed.repositories.HouseRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class HouseServiceImplTest {

    @Mock
    private HouseRepository houseRepository;

    @Mock
    private ImageUploadService imageUploadService;

    @InjectMocks
    private HouseServiceImpl houseServiceImpl;


    @Test
    void canGetAllHouses() {
        // when
        houseServiceImpl.getAll();
        //then
        verify(houseRepository).findAll();
    }

    @Test
    void canGetHouseByCategoryName() {
        String categoryName = "Seaside";
        houseServiceImpl.getHousesByCategoryName(categoryName);

        verify(houseRepository).findHousesByCategoryCategoryName(categoryName);
    }

    @Test
    void canGetHouseByCityName() {
        String cityName = "Çanakkale";
        houseServiceImpl.getHousesByCityName(cityName);

        verify(houseRepository).findHousesByCity_CityName(cityName);
    }

    @Test
    void canSaveHouse() {
        House house = new House(3, null, 120f, new City(), "address");
        List<MultipartFile> multipartFiles = List.of(new MockMultipartFile("name", "name".getBytes()));

        // when
        houseServiceImpl.save(house, multipartFiles);

        // then
        verify(houseRepository).save(house);
    }
}