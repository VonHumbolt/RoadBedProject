package com.kaankaplan.road_bed.business.abstracts;


import com.kaankaplan.road_bed.dtos.TenantRegisterRequest;
import com.kaankaplan.road_bed.entities.House;
import com.kaankaplan.road_bed.entities.Tenant;
import org.springframework.web.multipart.MultipartFile;


public interface TenantService {

    Tenant getTenantByEmail(String email);

    Tenant saveTenant(TenantRegisterRequest tenantRegisterRequest);

    void addHouseToTenantsOwnHouse(House house, String email);

    Tenant updateProfilePicture(String userId, MultipartFile multipartFile);
}
