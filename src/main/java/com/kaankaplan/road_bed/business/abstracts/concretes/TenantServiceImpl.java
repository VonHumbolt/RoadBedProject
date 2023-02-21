package com.kaankaplan.road_bed.business.abstracts.concretes;

import com.kaankaplan.road_bed.business.abstracts.RoleService;
import com.kaankaplan.road_bed.business.abstracts.TenantService;
import com.kaankaplan.road_bed.business.abstracts.UserService;
import com.kaankaplan.road_bed.config.cloudinary.ImageUploadService;
import com.kaankaplan.road_bed.config.concerns.loging.ToLog;
import com.kaankaplan.road_bed.dtos.ReserveHouseRequest;
import com.kaankaplan.road_bed.dtos.TenantRegisterRequest;
import com.kaankaplan.road_bed.entities.*;
import com.kaankaplan.road_bed.repositories.TenantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Service
public class TenantServiceImpl implements TenantService {

    private final TenantRepository tenantRepository;
    private final UserService userService;
    private final RoleService roleService;
    private final PasswordEncoder passwordEncoder;
    private final ImageUploadService imageUploadService;

    @Autowired
    public TenantServiceImpl(TenantRepository tenantRepository, UserService userService,
                             RoleService roleService, PasswordEncoder passwordEncoder, ImageUploadService imageUploadService) {
        this.tenantRepository = tenantRepository;
        this.userService = userService;
        this.roleService = roleService;
        this.passwordEncoder = passwordEncoder;
        this.imageUploadService = imageUploadService;
    }

    @Override
    public Tenant getTenantByEmail(String email) {
        return tenantRepository.findTenantByEmail(email);
    }

    @ToLog
    @Transactional
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

    @Transactional
    @Override
    public void addHouseToTenantsOwnHouse(House house, String email) {
        Tenant tenant = tenantRepository.findTenantByEmail(email);

        tenant.ownHouses.add(house);

        tenantRepository.save(tenant);
    }

    @Transactional
    @Override
    public void removeHouseFromTenantsOwnHouse(House house, String email) {
        Tenant tenant = tenantRepository.findTenantByEmail(email);

        tenant.ownHouses.removeIf(h -> h.getHouseId().equals(house.getHouseId()));

        tenantRepository.save(tenant);
    }

    @Transactional
    @Override
    public Tenant updateProfilePicture(String userId, MultipartFile multipartFile) {

        Tenant tenant = tenantRepository.findById(userId).orElseThrow(() -> new RuntimeException("Tenant is not found"));

        if (tenant.profilePicture != null)
            imageUploadService.deleteImage(tenant.profilePicture.getImageId());

        Map resultMap = imageUploadService.uploadImage(multipartFile);
        String imageId = (String) resultMap.get("public_id");
        String imageUrl = (String) resultMap.get("url");

        tenant.profilePicture = new Image(imageId, imageUrl);

        return tenantRepository.save(tenant);
                
    }


    @Transactional
    @Override
    public void addHouseToTenantsVisitedHouses(House house, ReserveHouseRequest reserveHouseRequest) {
        Tenant tenant = tenantRepository.findTenantByEmail(reserveHouseRequest.tenantEmail());
        if (tenant == null)
            throw new RuntimeException("Tenant is not found");

        Visit visit = new Visit(
                house,
                reserveHouseRequest.datesForReserve(),
                reserveHouseRequest.day(),
                reserveHouseRequest.totalPrice()
            );
        tenant.visitedHouses.add(visit);

        tenantRepository.save(tenant);
    }
}

