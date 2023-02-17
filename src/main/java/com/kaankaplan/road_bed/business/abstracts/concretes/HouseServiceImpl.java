package com.kaankaplan.road_bed.business.abstracts.concretes;

import com.kaankaplan.road_bed.business.abstracts.HouseService;
import com.kaankaplan.road_bed.business.abstracts.TenantService;
import com.kaankaplan.road_bed.config.cloudinary.ImageUploadService;
import com.kaankaplan.road_bed.config.concerns.loging.ToDeleteLog;
import com.kaankaplan.road_bed.config.concerns.loging.ToLog;
import com.kaankaplan.road_bed.entities.House;
import com.kaankaplan.road_bed.entities.Image;
import com.kaankaplan.road_bed.repositories.HouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Service
public class HouseServiceImpl implements HouseService {

    private final HouseRepository houseRepository;
    private final ImageUploadService imageUploadService;
    private final TenantService tenantService;
    @Autowired
    public HouseServiceImpl(HouseRepository houseRepository, ImageUploadService imageUploadService, TenantService tenantService) {
        this.houseRepository = houseRepository;
        this.imageUploadService = imageUploadService;
        this.tenantService = tenantService;
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

    @Override
    public List<House> getHousesByCityAndEmptyDates(String cityName, Date startDate, Date endDate) {
        List<House> houses = houseRepository.
                findHousesByCity_CityName(
                        cityName
                );

        List<House> newHouses = new ArrayList<>();

        houses.forEach(house -> {
            for (int i=0; i< house.reservedDates.size(); i++) {
                if (startDate.compareTo( house.reservedDates.get(i)) < 0 && endDate.compareTo(house.reservedDates.get(i)) < 0){
                    newHouses.add(house);
                    break;
                }
                else if (startDate.compareTo(house.reservedDates.get(i)) > 0 && endDate.compareTo(house.reservedDates.get(i)) > 0){
                    newHouses.add(house);
                    break;
                }
            }
            if (house.reservedDates.size() == 0) {
                newHouses.add(house);
            }
        });
        return newHouses;
    }

    @CacheEvict(value = "houses", allEntries = true)
    @ToLog
    @Transactional
    @Override
    public House save(House house, List<MultipartFile> multipartFiles) {

        List<Image> houseImages = new ArrayList<>();

        multipartFiles.forEach((file) -> {
            Map uploadResults =  imageUploadService.uploadImage(file);
            String imageId = (String) uploadResults.get("public_id");
            String imageUrl = (String) uploadResults.get("url");

            Image houseImage = new Image(imageId, imageUrl);
            houseImages.add(houseImage);
        });
        house.imageUrlList = houseImages;

        House savedHouse = houseRepository.save(house);

        tenantService.addHouseToTenantsOwnHouse(savedHouse, house.owner.email);

        return savedHouse;
    }

    @CacheEvict(value = "houses", allEntries = true)
    @ToDeleteLog
    @Transactional
    @Override
    public House deleteHouse(House house) {
        house.imageUrlList.forEach(image -> {
            imageUploadService.deleteImage(image.getImageId());
        });

        houseRepository.deleteById(house.getHouseId());

        tenantService.removeHouseFromTenantsOwnHouse(house, house.owner.email);

        return house;
    }
}
