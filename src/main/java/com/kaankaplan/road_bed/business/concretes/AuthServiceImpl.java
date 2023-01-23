package com.kaankaplan.road_bed.business.concretes;

import com.kaankaplan.road_bed.business.abstracts.AuthService;
import com.kaankaplan.road_bed.config.jwt.JwtProviderService;
import com.kaankaplan.road_bed.dtos.LoginRequest;
import com.kaankaplan.road_bed.dtos.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;

    private final JwtProviderService jwtProviderService;

    @Autowired
    public AuthServiceImpl(AuthenticationManager authenticationManager, JwtProviderService jwtProviderService) {
        this.authenticationManager = authenticationManager;
        this.jwtProviderService = jwtProviderService;
    }

    @Override
    public LoginResponse login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.email(), loginRequest.password())
        );

        User principal = (User) authentication.getPrincipal();

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtProviderService.generateToken(principal);

        return new LoginResponse(
                principal.getUsername(),
                token,
                "refresh"
        );
    }
}
