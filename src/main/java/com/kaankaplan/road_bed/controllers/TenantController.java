package com.kaankaplan.road_bed.controllers;

import com.kaankaplan.road_bed.business.abstracts.TenantService;
import com.kaankaplan.road_bed.entities.Tenant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("tenants/")
public class TenantController {

    private final TenantService tenantService;

    @Autowired
    public TenantController(TenantService tenantService) {
        this.tenantService = tenantService;
    }

    @GetMapping("getByEmail/{email}")
    public Tenant getByEmail(@PathVariable String email){
        return tenantService.getTenantByEmail(email);
    }
}
