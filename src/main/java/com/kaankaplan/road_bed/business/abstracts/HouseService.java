package com.kaankaplan.road_bed.business.abstracts;

import com.kaankaplan.road_bed.entities.House;
import org.springframework.web.multipart.MultipartFile;

public interface HouseService {

    House save(House house, MultipartFile multipartFile);
}
