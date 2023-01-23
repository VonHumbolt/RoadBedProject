package com.kaankaplan.road_bed.dtos;

public record TenantRegisterRequest(
        String email,
        String fullName,
        String password
) { }
