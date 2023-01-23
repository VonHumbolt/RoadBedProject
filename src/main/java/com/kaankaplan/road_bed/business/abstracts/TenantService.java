package com.kaankaplan.road_bed.business.abstracts;


import com.kaankaplan.road_bed.dtos.TenantRegisterRequest;
import com.kaankaplan.road_bed.entities.Tenant;


public interface TenantService {

    Tenant saveTenant(TenantRegisterRequest tenantRegisterRequest);

}
