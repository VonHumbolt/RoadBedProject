package com.kaankaplan.road_bed.business.abstracts.concretes;

import com.kaankaplan.road_bed.business.abstracts.RefreshTokenService;
import com.kaankaplan.road_bed.business.abstracts.UserService;
import com.kaankaplan.road_bed.config.jwt.JwtProviderService;
import com.kaankaplan.road_bed.dtos.RefreshRequest;
import com.kaankaplan.road_bed.entities.RefreshToken;
import com.kaankaplan.road_bed.entities.Role;
import com.kaankaplan.road_bed.entities.User;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;


import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class AuthServiceImplTest {

    @Mock
    private AuthenticationManager authenticationManager;
    @Mock
    private JwtProviderService jwtProviderService;
    @Mock
    private UserService userService;
    @Mock
    private RefreshTokenService refreshTokenService;
    @InjectMocks
    private AuthServiceImpl authServiceImpl;


    @Test
    void shouldLogout() {
        RefreshRequest refreshRequest = new RefreshRequest("refreshToken", "kaankaplan@gmail.com");
        given(refreshTokenService.getRefreshTokenByToken(refreshRequest.refreshToken())).willReturn(new RefreshToken());

        authServiceImpl.logout(refreshRequest);

        verify(refreshTokenService).deleteRefreshToken(refreshRequest.refreshToken());
    }

    @Test
    void shouldNotLogoutWhenRefreshTokenIsNull() {

        RefreshRequest refreshRequest = new RefreshRequest("refreshToken", "kaankaplan@gmail.com");
        given(refreshTokenService.getRefreshTokenByToken(refreshRequest.refreshToken())).willReturn(null);

        assertThatThrownBy(() -> authServiceImpl.logout(refreshRequest))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Refresh Token is not found");

        verify(refreshTokenService, never()).deleteRefreshToken(any());
    }

    @Test
    void shouldRefreshToken() {
        RefreshRequest refreshRequest = new RefreshRequest("refreshToken", "kaankaplan@gmail.com");
        User user = new User(refreshRequest.email(), "Kaan Kaplan", "1234", new Role("TENANT"));

        given(refreshTokenService.getRefreshTokenByToken(refreshRequest.refreshToken())).willReturn(new RefreshToken());
        given(userService.findUserByEmail(refreshRequest.email())).willReturn(user);

        authServiceImpl.refreshToken(refreshRequest);
    }

    @Test
    void shouldNotRefreshTokenWhenTokenIsNull() {
        RefreshRequest refreshRequest = new RefreshRequest("refreshToken", "kaankaplan@gmail.com");

        given(refreshTokenService.getRefreshTokenByToken(refreshRequest.refreshToken())).willReturn(null);

        assertThatThrownBy(() -> authServiceImpl.refreshToken(refreshRequest))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Refresh Token is not found");

        verify(userService, never()).findUserByEmail(any());
        verify(jwtProviderService, never()).generateTokenWithEmail(any(), any());
    }
}