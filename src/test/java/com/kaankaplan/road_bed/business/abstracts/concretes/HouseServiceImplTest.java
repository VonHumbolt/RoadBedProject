package com.kaankaplan.road_bed.business.abstracts.concretes;

import com.kaankaplan.road_bed.business.abstracts.TenantService;
import com.kaankaplan.road_bed.config.cloudinary.ImageUploadService;
import com.kaankaplan.road_bed.dtos.ReserveHouseRequest;
import com.kaankaplan.road_bed.entities.*;
import com.kaankaplan.road_bed.repositories.HouseRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class HouseServiceImplTest {

    @Mock
    private HouseRepository houseRepository;

    @Mock
    private ImageUploadService imageUploadService;
    @Mock
    private TenantService tenantService;

    @InjectMocks
    private HouseServiceImpl houseServiceImpl;


    @Test
    void canGetAllHouses() {
        Pageable pageRequest = PageRequest.of(0, 10);
        // when
        houseServiceImpl.getAll();

        //then
        verify(houseRepository, never()).findAll(pageRequest);
    }

    @Test
    void canGetHouseByCategoryName() {
        String categoryName = "Seaside";
        houseServiceImpl.getHousesByCategoryName(categoryName);

        verify(houseRepository).findHousesByCategoryCategoryName(categoryName);
    }

    @Test
    void canGetHouseByCityName() {
        String cityName = "Çanakkale";
        houseServiceImpl.getHousesByCityName(cityName);

        verify(houseRepository).findHousesByCity_CityName(cityName);
    }

    @Test
    void canGetHouseByHouseId() {
        String houseId = "hosueId";
        houseServiceImpl.getHouseByHouseId(houseId);

        verify(houseRepository).findHouseByHouseId(houseId);
    }

    @Test
    void canGetHousesByCityAndEmptyDates() {
        // given
        String cityName = "Çanakkale";
        Date startDate = new Date();
        Date endDate = new Date(24023);

        houseServiceImpl.getHousesByCityAndEmptyDates(cityName, startDate, endDate);

        verify(houseRepository).findHousesByCity_CityNameAndReservedDatesIsNotContaining(cityName, List.of(startDate, endDate));
    }

    @Test
    void shouldSaveHouse() {
        House house = new House(3, null, 120f, new City(), "address");
        List<MultipartFile> multipartFiles = List.of(new MockMultipartFile("name", "name".getBytes()));
        house.owner = new User("kaankaplan@gmail.com", "Kaan Kaplan", "1234", new Role("TENANT"));

        // when
        houseServiceImpl.save(house, multipartFiles);

        // then
        verify(houseRepository).save(house);
    }

    @Test
    void shouldDeleteHouse() {
        House house = new House(3, null, 120f, new City(), "address");
        house.imageUrlList = List.of(new Image("imageId", "https://imageurl.com"));
        house.owner = new User("kaankaplan@gmail.com", "Kaan Kaplan", "1234", new Role("TENANT"));

        houseServiceImpl.deleteHouse(house);

        verify(houseRepository).deleteById(house.getHouseId());
        verify(tenantService).removeHouseFromTenantsOwnHouse(house, house.owner.email);
    }

    @Test
    void shouldReserveHouse() {
        ReserveHouseRequest reserveHouseRequest = new ReserveHouseRequest(
                "houseId",
                List.of(new Date()),
                "kaankaplan@gmail.com",
                1,
                1200
            );
        House house = new House(3, null, 120f, new City(), "address");

        given(houseRepository.findHouseByHouseId(reserveHouseRequest.houseId())).willReturn(house);

        houseServiceImpl.reserveHouse(reserveHouseRequest);

        verify(houseRepository).findHouseByHouseId(reserveHouseRequest.houseId());
        verify(tenantService).addHouseToTenantsVisitedHouses(house, reserveHouseRequest);
        verify(houseRepository).save(house);
    }
}