package com.kaankaplan.road_bed.business.abstracts;

import com.kaankaplan.road_bed.dtos.LoginRequest;
import com.kaankaplan.road_bed.dtos.LoginResponse;
import com.kaankaplan.road_bed.dtos.RefreshRequest;

public interface AuthService {

    LoginResponse login(LoginRequest loginRequest);

    void logout(RefreshRequest refreshRequest);

    LoginResponse refreshToken(RefreshRequest refreshRequest);
}
