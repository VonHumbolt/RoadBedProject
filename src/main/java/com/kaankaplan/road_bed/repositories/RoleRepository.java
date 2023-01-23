package com.kaankaplan.road_bed.repositories;

import com.kaankaplan.road_bed.entities.Role;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends MongoRepository<Role, String> {

    Role findByRoleName(String roleName);
}