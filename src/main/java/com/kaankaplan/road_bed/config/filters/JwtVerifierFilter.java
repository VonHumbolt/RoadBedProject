package com.kaankaplan.road_bed.config.filters;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.lang.Strings;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
public class JwtVerifierFilter extends OncePerRequestFilter {

    @Value("${jwt.token.secret.key}")
    private String key;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String token = request.getHeader("Authorization");

        if (Strings.hasText(token) && token.startsWith("Bearer ")){
            token = token.replace("Bearer ", "");

            try {
                Claims claims = Jwts.parser()
                        .setSigningKey(Keys.hmacShaKeyFor(key.getBytes()))
                        .parseClaimsJws(token).getBody();

                String issuer = claims.getIssuer();
                List<Map<String, String>> authorities = (List<Map<String, String>>) claims.get("authority");
                List<SimpleGrantedAuthority> grantedAuthorities = authorities.stream().map(authority ->
                        new SimpleGrantedAuthority("AUHTORITY_" + authority.get("authority"))
                ).toList();

                Authentication authentication = new UsernamePasswordAuthenticationToken(issuer, null, grantedAuthorities);

                SecurityContextHolder.getContext().setAuthentication(authentication);
            } catch (JwtException e) {
                throw new IllegalStateException(e);
            }
        }

        filterChain.doFilter(request, response);
    }

}
