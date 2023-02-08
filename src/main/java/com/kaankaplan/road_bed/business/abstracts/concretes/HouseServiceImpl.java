package com.kaankaplan.road_bed.business.abstracts.concretes;

import com.kaankaplan.road_bed.business.abstracts.HouseService;
import com.kaankaplan.road_bed.config.cloudinary.ImageUploadService;
import com.kaankaplan.road_bed.config.concerns.loging.ToLog;
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

    @Autowired
    public HouseServiceImpl(HouseRepository houseRepository, ImageUploadService imageUploadService) {
        this.houseRepository = houseRepository;
        this.imageUploadService = imageUploadService;
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

    @Override
    public House getHouseByHouseId(String houseId) {
        return houseRepository.findHouseByHouseId(houseId);
    }

    @CacheEvict(value = "houses", allEntries = true)
    @ToLog
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
