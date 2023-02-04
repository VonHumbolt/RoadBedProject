package com.kaankaplan.road_bed.business.abstracts.concretes;

import com.kaankaplan.road_bed.business.abstracts.CityService;
import com.kaankaplan.road_bed.business.abstracts.HouseService;
import com.kaankaplan.road_bed.config.cloudinary.ImageUploadService;
import com.kaankaplan.road_bed.entities.City;
import com.kaankaplan.road_bed.entities.House;
import com.kaankaplan.road_bed.repositories.HouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class HouseServiceImpl implements HouseService {

    private final HouseRepository houseRepository;
    private final ImageUploadService imageUploadService;
    private final CityService cityService;

    @Autowired
    public HouseServiceImpl(HouseRepository houseRepository, ImageUploadService imageUploadService, CityService cityService) {
        this.houseRepository = houseRepository;
        this.imageUploadService = imageUploadService;
        this.cityService = cityService;
    }

    @Cacheable(value = "houses")
    @Override
    public List<House> getAll() {
        return houseRepository.findAll();
    }

    @Override
    public List<House> getHousesByCategoryName(String categoryName) {
        return houseRepository.findHousesByCategoryCategoryName(categoryName);
    }

    @Override
    public List<House> getHousesByCityName(String cityName) {
        return houseRepository.findHousesByCity_CityName(cityName);
    }

    @CacheEvict(value = "houses", allEntries = true)
    @Transactional
    @Override
    public House save(House house, List<MultipartFile> multipartFiles) {

        List<String> houseImages = new ArrayList<>();

        multipartFiles.forEach((file) -> {
            Map uploadResults =  imageUploadService.uploadImage(file);
            String imageUrl = (String) uploadResults.get("url");
            houseImages.add(imageUrl);
        });

        house.imageUrlList = houseImages;

        return houseRepository.save(house);
    }
}
