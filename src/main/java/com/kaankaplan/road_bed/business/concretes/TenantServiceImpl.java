package com.kaankaplan.road_bed.business.concretes;

import com.kaankaplan.road_bed.business.abstracts.RoleService;
import com.kaankaplan.road_bed.business.abstracts.TenantService;
import com.kaankaplan.road_bed.business.abstracts.UserService;
import com.kaankaplan.road_bed.dtos.TenantRegisterRequest;
import com.kaankaplan.road_bed.entities.Role;
import com.kaankaplan.road_bed.entities.Tenant;
import com.kaankaplan.road_bed.entities.User;
import com.kaankaplan.road_bed.repositories.TenantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class TenantServiceImpl implements TenantService {

    private final TenantRepository tenantRepository;
    private final UserService userService;
    private final RoleService roleService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public TenantServiceImpl(TenantRepository tenantRepository, UserService userService,
                             RoleService roleService, PasswordEncoder passwordEncoder) {
        this.tenantRepository = tenantRepository;
        this.userService = userService;
        this.roleService = roleService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Tenant saveTenant(TenantRegisterRequest tenantRegisterRequest) {

        Role role = roleService.findByRoleName("TENANT");

        String fullName = tenantRegisterRequest.fullName();
        String email = tenantRegisterRequest.email();
        String password = passwordEncoder.encode(tenantRegisterRequest.password());

        User user = new User(email, fullName, password, role);
        userService.addUser(user);

        Tenant tenant = new Tenant();
        tenant.fullName = fullName;
        tenant.email= email;
        tenant.password = password;
        tenant.role = role;

        return tenantRepository.insert(tenant);
    }
}
