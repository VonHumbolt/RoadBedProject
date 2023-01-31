package com.kaankaplan.road_bed.controllers;

import com.kaankaplan.road_bed.business.abstracts.HouseService;
import com.kaankaplan.road_bed.entities.House;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("houses/")
public class HouseController {
    private final HouseService houseService;

    @Autowired
    public HouseController(HouseService houseService) {
        this.houseService = houseService;
    }

    @PreAuthorize("hasAnyRole('AUTHORITY_TENANT')")
    @PostMapping("save")
    public House saveHouse(@RequestPart("house") House house, @RequestPart("multipartFile") MultipartFile multipartFile){

        return houseService.save(house, multipartFile);
    }
}
