package com.kaankaplan.road_bed.config.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Date;

@Service
public class JwtProviderServiceImpl implements JwtProviderService {

    @Value("${jwt.token.expirationTime}")
    private long tokenExpirationTime;

    @Value("${jwt.token.secret.key}")
    private String key;

    @Override
    public String generateToken(User userPrincipal) {

        return Jwts.builder()
                .setIssuer(userPrincipal.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date( new Date().getTime() + tokenExpirationTime ))
                .claim("authority", userPrincipal.getAuthorities())
                .signWith(Keys.hmacShaKeyFor(key.getBytes()))
                .compact();
    }

    @Override
    public String generateAccessTokenWithEmail(String email, Collection<GrantedAuthority> authorities) {
        return null;
    }
}
