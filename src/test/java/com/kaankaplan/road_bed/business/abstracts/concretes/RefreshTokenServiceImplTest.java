package com.kaankaplan.road_bed.business.abstracts.concretes;

import com.kaankaplan.road_bed.config.jwt.JwtProviderServiceImpl;
import com.kaankaplan.road_bed.entities.RefreshToken;
import com.kaankaplan.road_bed.repositories.RefreshTokenRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class RefreshTokenServiceImplTest {

    @Mock
    private RefreshTokenRepository refreshTokenRepository;

    @Mock
    private JwtProviderServiceImpl jwtProviderService;

    @InjectMocks
    private RefreshTokenServiceImpl refreshTokenServiceImpl;

    @Test
    void canGetRefreshTokenByToken() {
        String refreshToken = "refreshToken";

        refreshTokenServiceImpl.getRefreshTokenByToken(refreshToken);

        verify(refreshTokenRepository).getRefreshTokenByToken(refreshToken);
    }

    @Test
    void shouldGenerateRefreshToken() {
        String email = "kaankaplan@gmail.com";
        String token = "tokentoken";
        given(jwtProviderService.generateRefreshToken(email)).willReturn(token);

        refreshTokenServiceImpl.generateRefreshToken(email);
    }

    @Test
    void shouldDeleteRefreshToken() {
        String refreshToken = "refreshtoken";

        given(refreshTokenRepository.getRefreshTokenByToken(refreshToken)).willReturn(Optional.of(new RefreshToken()));

        refreshTokenServiceImpl.deleteRefreshToken(refreshToken);

        verify(refreshTokenRepository).deleteRefreshToken(refreshToken);
    }

    @Test
    void shouldNotDeleteRefreshTokenWhenTokenIsNull() {
        String refreshToken = "refreshtoken";

        given(refreshTokenRepository.getRefreshTokenByToken(refreshToken)).willReturn(Optional.empty());

        assertThatThrownBy(() -> refreshTokenServiceImpl.deleteRefreshToken(refreshToken))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Refresh Token not found");

        verify(refreshTokenRepository, never()).deleteRefreshToken(any());
    }

}