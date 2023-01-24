package com.kaankaplan.road_bed.business.abstracts;

import com.kaankaplan.road_bed.entities.RefreshToken;


public interface RefreshTokenService {

    RefreshToken getRefreshTokenByToken(String refreshToken);

    RefreshToken generateRefreshToken(String email);

    void deleteRefreshToken(String refreshToken);

}
