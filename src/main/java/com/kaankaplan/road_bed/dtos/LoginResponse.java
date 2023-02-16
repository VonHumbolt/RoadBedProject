package com.kaankaplan.road_bed.dtos;

public record LoginResponse (
        String userId,
        String email,
        String accessToken,
        String refreshToken
) { }
