package com.kaankaplan.road_bed.business.abstracts.concretes;

import com.kaankaplan.road_bed.business.abstracts.RoleService;
import com.kaankaplan.road_bed.config.concerns.loging.ToLog;
import com.kaankaplan.road_bed.entities.Role;
import com.kaankaplan.road_bed.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    @Autowired
    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public Role findByRoleName(String roleName) {
        return roleRepository.findByRoleName(roleName);
    }

    @ToLog
    @Transactional
    @Override
    public Role addRole(Role role) {
        return roleRepository.insert(role);
    }
}
