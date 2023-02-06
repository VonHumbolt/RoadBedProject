package com.kaankaplan.road_bed.business.abstracts.concretes;

import com.kaankaplan.road_bed.entities.City;
import com.kaankaplan.road_bed.repositories.CityRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class CityServiceImplTest {

    @Mock
    private CityRepository cityRepository;

    @InjectMocks
    private CityServiceImpl cityServiceImpl;


    @Test
    void canGetAllCities() {
        // when
        cityServiceImpl.getAllCities();

        // then
        verify(cityRepository).findAll();
    }

    @Test
    void canGetCityByName() {
        String cityName = "Çanakkale";

        cityServiceImpl.getCityByName(cityName);

        verify(cityRepository).findCityByCityName(cityName);
    }

    @Test
    void canSaveCity() {
        // given
        City city = new City("Ankara");

        // when
        cityServiceImpl.save(city);

        // then
        ArgumentCaptor<City> argumentCaptor = ArgumentCaptor.forClass(City.class);
        verify(cityRepository).save(argumentCaptor.capture());

        assertThat(argumentCaptor.getValue()).isEqualTo(city);

    }
}