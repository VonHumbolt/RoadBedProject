package com.kaankaplan.road_bed.repositories;

import com.kaankaplan.road_bed.entities.House;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface HouseRepository extends MongoRepository<House, String> {

    List<House> findHousesByCategoryCategoryName(String categoryName);

    List<House> findHousesByCity_CityName(String cityName);

    House findHouseByHouseId(String houseId);

    List<House> findHousesByCity_CityNameAndReservedDatesIsNotContaining(String city_cityName, List<Date> reservedDates);
}
