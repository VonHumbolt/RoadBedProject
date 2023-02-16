package com.kaankaplan.road_bed.config;

import com.kaankaplan.road_bed.config.filters.JwtVerifierFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.authentication.configuration.EnableGlobalAuthentication;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
@EnableGlobalAuthentication
public class SecurityConfig {

    private final UserDetailsService userDetailsService;

    private final JwtVerifierFilter jwtVerifierFilter;

    @Autowired
    public SecurityConfig(UserDetailsService userDetailsService, JwtVerifierFilter jwtVerifierFilter) {
        this.userDetailsService = userDetailsService;
        this.jwtVerifierFilter = jwtVerifierFilter;
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService);
        authenticationProvider.setPasswordEncoder(passwordEncoder());

        return authenticationProvider;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable()
                .authorizeHttpRequests()
                .requestMatchers(HttpMethod.POST, "/auth/**").permitAll()
                .requestMatchers(HttpMethod.GET,  "/cities/**").permitAll()
                .requestMatchers(HttpMethod.GET,  "/categories/**").permitAll()
                .requestMatchers(HttpMethod.POST,  "/categories/**").permitAll()
                .requestMatchers(HttpMethod.GET,  "/houses/**").permitAll()
                .requestMatchers(HttpMethod.GET,  "/tenants/**").permitAll()
                .requestMatchers(HttpMethod.GET,  "/users/**").permitAll()
                .requestMatchers(HttpMethod.POST,  "/cities/**").permitAll()
                .requestMatchers(HttpMethod.POST,  "/roles/**").permitAll()
                .anyRequest().authenticated();

        http.authenticationProvider(authenticationProvider());

        http.addFilterBefore(jwtVerifierFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public WebMvcConfigurer corsConfigurer(){
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry corsRegistry) {
                corsRegistry.addMapping("/**").allowedOrigins("http://localhost:3000");
            }
        };
    }
}
