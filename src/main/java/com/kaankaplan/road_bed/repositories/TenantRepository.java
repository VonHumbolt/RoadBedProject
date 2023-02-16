package com.kaankaplan.road_bed.repositories;

import com.kaankaplan.road_bed.entities.Tenant;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TenantRepository extends MongoRepository<Tenant, String> {

    Tenant findTenantByEmail(String email);

}
