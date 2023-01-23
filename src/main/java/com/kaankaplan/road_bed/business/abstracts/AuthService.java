package com.kaankaplan.road_bed.business.abstracts;

import com.kaankaplan.road_bed.dtos.LoginRequest;
import com.kaankaplan.road_bed.dtos.LoginResponse;

public interface AuthService {

    LoginResponse login(LoginRequest loginRequest);
}
