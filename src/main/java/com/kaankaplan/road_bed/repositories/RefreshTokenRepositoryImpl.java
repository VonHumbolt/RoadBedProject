package com.kaankaplan.road_bed.repositories;

import com.kaankaplan.road_bed.entities.RefreshToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class RefreshTokenRepositoryImpl implements RefreshTokenRepository{

    private final RedisTemplate<String, Object> redisTemplate;

    private final String HASH_KEY = "refresh_token";

    @Autowired
    public RefreshTokenRepositoryImpl(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    @Override
    public Optional<RefreshToken> getRefreshTokenByToken(String refreshToken) {

        RefreshToken token = (RefreshToken) redisTemplate.opsForHash().get(HASH_KEY, refreshToken);

        return Optional.ofNullable(token);
    }

    @Override
    public RefreshToken saveRefreshToken(RefreshToken refreshToken) {

        redisTemplate.opsForHash().put(HASH_KEY, refreshToken.refreshToken, refreshToken);
        return refreshToken;
    }

    @Override
    public void deleteRefreshToken(String refreshToken) {
        redisTemplate.opsForHash().delete(HASH_KEY, refreshToken);
    }
}
