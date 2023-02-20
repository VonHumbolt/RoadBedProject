package com.kaankaplan.road_bed.business.abstracts;

import com.kaankaplan.road_bed.dtos.ReserveHouseRequest;
import com.kaankaplan.road_bed.entities.House;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

public interface HouseService {

    House save(House house, List<MultipartFile> multipartFiles);

    List<House> getAll();

    List<House> getHousesByCategoryName(String categoryName);

    List<House> getHousesByCityName(String cityName);

    House getHouseByHouseId(String houseId);

    List<House> getHousesByCityAndEmptyDates(String cityName, Date startDate, Date endDate);

    void reserveHouse(ReserveHouseRequest reserveHouseRequest);

    House deleteHouse(House house);
}
