package com.kaankaplan.road_bed.dtos;

public record RefreshRequest (
        String refreshToken,
        String email
) {
}
