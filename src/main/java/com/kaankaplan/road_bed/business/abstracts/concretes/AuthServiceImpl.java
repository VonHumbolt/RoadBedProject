package com.kaankaplan.road_bed.business.abstracts.concretes;

import com.kaankaplan.road_bed.business.abstracts.AuthService;
import com.kaankaplan.road_bed.business.abstracts.RefreshTokenService;
import com.kaankaplan.road_bed.business.abstracts.UserService;
import com.kaankaplan.road_bed.config.jwt.JwtProviderService;
import com.kaankaplan.road_bed.dtos.LoginRequest;
import com.kaankaplan.road_bed.dtos.LoginResponse;
import com.kaankaplan.road_bed.dtos.RefreshRequest;
import com.kaankaplan.road_bed.entities.RefreshToken;
import com.kaankaplan.road_bed.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;

    private final JwtProviderService jwtProviderService;
    private final UserService userService;
    private final RefreshTokenService refreshTokenService;

    @Autowired
    public AuthServiceImpl(AuthenticationManager authenticationManager, JwtProviderService jwtProviderService,
                           UserService userService, RefreshTokenService refreshTokenService) {
        this.authenticationManager = authenticationManager;
        this.jwtProviderService = jwtProviderService;
        this.userService = userService;
        this.refreshTokenService = refreshTokenService;
    }

    @Transactional
    @Override
    public LoginResponse login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.email(), loginRequest.password())
        );

        org.springframework.security.core.userdetails.User principal =
                (org.springframework.security.core.userdetails.User) authentication.getPrincipal();

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtProviderService.generateToken(principal);
        RefreshToken refreshToken = refreshTokenService.generateRefreshToken(loginRequest.email());
        String userId = userService.findUserByEmail(loginRequest.email()).getUserId();

        return new LoginResponse(
                userId,
                principal.getUsername(),
                token,
                refreshToken.refreshToken
        );
    }

    @Transactional
    @Override
    public void logout(RefreshRequest refreshRequest) {

        RefreshToken refreshTokenFromRedis = refreshTokenService.getRefreshTokenByToken(refreshRequest.refreshToken());

        if (refreshTokenFromRedis == null)
            throw new RuntimeException("Refresh Token is not found");

        refreshTokenService.deleteRefreshToken(refreshRequest.refreshToken());
    }

    @Transactional
    @Override
    public LoginResponse refreshToken(RefreshRequest refreshRequest) {
        RefreshToken refreshTokenFromRedis = refreshTokenService.getRefreshTokenByToken(refreshRequest.refreshToken());

        if (refreshTokenFromRedis == null)
            throw new RuntimeException("Refresh Token is not found");

        User user = userService.findUserByEmail(refreshRequest.email());
        List<GrantedAuthority> grantedAuthorities = List.of(new SimpleGrantedAuthority(user.role.roleName));

        String newToken = jwtProviderService.generateTokenWithEmail(refreshRequest.email(), grantedAuthorities);

        return new LoginResponse(user.getUserId(), refreshRequest.email(), newToken, refreshRequest.refreshToken());
    }
}
