package com.kaankaplan.road_bed.business.concretes;

import com.kaankaplan.road_bed.business.abstracts.CityService;
import com.kaankaplan.road_bed.business.abstracts.HouseService;
import com.kaankaplan.road_bed.config.cloudinary.ImageUploadService;
import com.kaankaplan.road_bed.entities.City;
import com.kaankaplan.road_bed.entities.House;
import com.kaankaplan.road_bed.repositories.HouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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

    @Override
    public List<House> getAll() {
        return houseRepository.findAll();
    }

    @Override
        public House save(House house, MultipartFile multipartFile) {

            Map uploadResults =  imageUploadService.uploadImage(multipartFile);
            String imageUrl = (String) uploadResults.get("url");

            house.imageUrl = imageUrl;

            return houseRepository.save(house);
    }
}
