package com.kaankaplan.road_bed.repositories;

import com.kaankaplan.road_bed.entities.House;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HouseRepository extends MongoRepository<House, String> {

}
