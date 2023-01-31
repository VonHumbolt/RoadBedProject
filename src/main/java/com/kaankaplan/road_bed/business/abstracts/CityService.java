package com.kaankaplan.road_bed.business.abstracts;

import com.kaankaplan.road_bed.entities.City;

import java.util.List;

public interface CityService {

    List<City> getAllCities();

    City getCityByName(String cityName);

    City save(City city);

}
