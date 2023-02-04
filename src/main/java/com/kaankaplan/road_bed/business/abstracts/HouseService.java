package com.kaankaplan.road_bed.business.abstracts;

import com.kaankaplan.road_bed.entities.House;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface HouseService {

    House save(House house, List<MultipartFile> multipartFiles);

    List<House> getAll();

    List<House> getHousesByCategoryName(String categoryName);

    List<House> getHousesByCityName(String cityName);
}
