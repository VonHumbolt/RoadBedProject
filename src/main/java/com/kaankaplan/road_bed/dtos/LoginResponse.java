package com.kaankaplan.road_bed.dtos;

public record LoginResponse (
        String email,
        String accessToken,
        String refreshToken
) { }
