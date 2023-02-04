package com.kaankaplan.road_bed.business.abstracts.concretes;

import com.kaankaplan.road_bed.business.abstracts.CityService;
import com.kaankaplan.road_bed.config.concerns.loging.ToLog;
import com.kaankaplan.road_bed.entities.City;
import com.kaankaplan.road_bed.repositories.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CityServiceImpl implements CityService {

    private final CityRepository cityRepository;

    @Autowired
    public CityServiceImpl(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    @Cacheable(value="cities")
    @Override
    public List<City> getAllCities() {
        return cityRepository.findAll();
    }

    @Override
    public City getCityByName(String cityName) {
        return cityRepository.findCityByCityName(cityName);
    }

    @CacheEvict(value="cities", allEntries = true)
    @ToLog
    @Transactional
    @Override
    public City save(City city) {
        return cityRepository.save(city);
    }
}
