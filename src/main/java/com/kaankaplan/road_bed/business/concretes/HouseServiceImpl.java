package com.kaankaplan.road_bed.business.concretes;

import com.kaankaplan.road_bed.business.abstracts.HouseService;
import com.kaankaplan.road_bed.entities.House;
import com.kaankaplan.road_bed.repositories.HouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HouseServiceImpl implements HouseService {

    private final HouseRepository houseRepository;

    @Autowired
    public HouseServiceImpl(HouseRepository houseRepository) {
        this.houseRepository = houseRepository;
    }

    @Override
    public House save(House house) {
        return houseRepository.save(house);
    }
}
