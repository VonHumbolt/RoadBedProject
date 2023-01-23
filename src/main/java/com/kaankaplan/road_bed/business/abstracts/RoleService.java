package com.kaankaplan.road_bed.business.abstracts;

import com.kaankaplan.road_bed.entities.Role;

public interface RoleService {

    Role findByRoleName(String roleName);

    Role addRole(Role role);

}
