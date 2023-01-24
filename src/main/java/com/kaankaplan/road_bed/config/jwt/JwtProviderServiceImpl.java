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
    public String generateTokenWithEmail(String email, Collection<GrantedAuthority> authorities) {
        return Jwts.builder()
                .setIssuer(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + tokenExpirationTime))
                .claim("authority", authorities)
                .signWith(Keys.hmacShaKeyFor(key.getBytes()))
                .compact();
    }

    @Override
    public String generateRefreshToken(String email) {
        return Jwts.builder()
                .setIssuer(email)
                .setIssuedAt(new Date())
                .signWith(Keys.hmacShaKeyFor(key.getBytes()))
                .compact();
    }
}
