package com.kaankaplan.road_bed.config.jwt;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

public interface JwtProviderService {

    String generateToken(User userPrincipal);

    String generateTokenWithEmail(String email, Collection<GrantedAuthority> authorities);

    String generateRefreshToken(String email);
}
