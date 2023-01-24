package com.kaankaplan.road_bed.repositories;


import com.kaankaplan.road_bed.entities.RefreshToken;

import java.util.Optional;

public interface RefreshTokenRepository {

    Optional<RefreshToken> getRefreshTokenByToken(String refreshToken);

    RefreshToken saveRefreshToken(RefreshToken refreshToken);

    void deleteRefreshToken(String refreshToken);
}
