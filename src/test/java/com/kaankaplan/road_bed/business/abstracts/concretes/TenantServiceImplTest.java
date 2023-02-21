package com.kaankaplan.road_bed.business.abstracts.concretes;

import com.kaankaplan.road_bed.business.abstracts.RoleService;
import com.kaankaplan.road_bed.business.abstracts.UserService;
import com.kaankaplan.road_bed.config.cloudinary.ImageUploadService;
import com.kaankaplan.road_bed.dtos.ReserveHouseRequest;
import com.kaankaplan.road_bed.dtos.TenantRegisterRequest;
import com.kaankaplan.road_bed.entities.*;
import com.kaankaplan.road_bed.repositories.TenantRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class TenantServiceImplTest {

    @Mock
    private TenantRepository tenantRepository;
    @Mock
    private UserService userService;
    @Mock
    private RoleService roleService;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private ImageUploadService imageUploadService;

    @InjectMocks
    private TenantServiceImpl tenantServiceImpl;

    @Test
    void canGetTenantByEmail() {
        String email = "kaankaplan@gmail.com";

        tenantServiceImpl.getTenantByEmail(email);

        verify(tenantRepository).findTenantByEmail(email);
    }


    @Test
    void shouldSaveTenant() {
        // given
        TenantRegisterRequest registerRequest = new TenantRegisterRequest("kaankaplan@gmail.com",
                "Kaan Kaplan", "1234");
        Role role = new Role("TENANT");

        given(roleService.findByRoleName("TENANT")).willReturn(role);

        tenantServiceImpl.saveTenant(registerRequest);

        verify(userService).addUser(any(User.class));
        verify(tenantRepository).insert(any(Tenant.class));
    }

    @Test
    void shouldAddHouseToTenantsOwnHouse() {
        String email = "kaankaplan@gmail.com";
        Tenant tenant = new Tenant();
        House house = new House();

        given(tenantRepository.findTenantByEmail(email)).willReturn(tenant);
        // when
        tenantServiceImpl.addHouseToTenantsOwnHouse(house, email);

        // then
        verify(tenantRepository).save(tenant);
    }

    @Test
    void shouldRemoveHouseFromTenantsOwnHouse() {
        String email = "kaankaplan@gmail.com";
        Tenant tenant = new Tenant();
        House house = new House();

        given(tenantRepository.findTenantByEmail(email)).willReturn(tenant);

        tenantServiceImpl.removeHouseFromTenantsOwnHouse(house, email);

        verify(tenantRepository).save(tenant);
    }

    @Test
    void shouldUpdateProfilePictureWhenTenantIsExistsAndProfilePicIsNull() {
        // given
        String userId = "userId";
        MultipartFile multipartFile = new MockMultipartFile("name", "name".getBytes());
        Tenant tenant = new Tenant();
        Map<String, String> resultMap = new HashMap<>();
        resultMap.put("public_id", "publicImageId");
        resultMap.put("url", "https://imageUrl.com");

        given(tenantRepository.findById(userId)).willReturn(Optional.of(tenant));
        given(imageUploadService.uploadImage(multipartFile)).willReturn(resultMap);

        tenantServiceImpl.updateProfilePicture(userId, multipartFile);

        verify(tenantRepository).save(tenant);
    }
    @Test
    void shouldUpdateProfilePictureWhenTenantIsExistsAndProfilePicIsNotNull() {
        // given
        String userId = "userId";
        MultipartFile multipartFile = new MockMultipartFile("name", "name".getBytes());
        Tenant tenant = new Tenant();
        tenant.profilePicture = new Image("imageId", "https://image.com");
        Map<String, String> resultMap = new HashMap<>();
        resultMap.put("public_id", "publicImageId");
        resultMap.put("url", "https://imageUrl.com");

        given(tenantRepository.findById(userId)).willReturn(Optional.of(tenant));
        given(imageUploadService.uploadImage(multipartFile)).willReturn(resultMap);

        tenantServiceImpl.updateProfilePicture(userId, multipartFile);

        verify(tenantRepository).save(tenant);
    }

    @Test
    void shouldNotUpdateProfilePictureWhenTenantIsNotExists() {
        String userId = "userId";
        MultipartFile multipartFile = new MockMultipartFile("name", "name".getBytes());

        given(tenantRepository.findById(userId)).willReturn(Optional.empty());

        assertThatThrownBy(() -> tenantServiceImpl.updateProfilePicture(userId, multipartFile))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Tenant is not found");

        verify(imageUploadService, never()).deleteImage(any());
        verify(imageUploadService, never()).uploadImage(any());
        verify(tenantRepository, never()).save(any());
    }

    @Test
    void shouldAddHouseToTenantsVisitedHouses() {
        House house = new House();
        ReserveHouseRequest reserveHouseRequest = new ReserveHouseRequest(
                "houseId",
                List.of(new Date()),
                "kaankaplan@gmail.com",
                1,
                1200
        );
        Tenant tenant = new Tenant();

        given(tenantRepository.findTenantByEmail(reserveHouseRequest.tenantEmail())).willReturn(tenant);

        // when
        tenantServiceImpl.addHouseToTenantsVisitedHouses(house, reserveHouseRequest);

        // then
        verify(tenantRepository).save(tenant);
    }
    @Test
    void shouldNotAddHouseToTenantsVisitedHousesWhenTenantIsNull() {
        House house = new House();
        ReserveHouseRequest reserveHouseRequest = new ReserveHouseRequest(
                "houseId",
                List.of(new Date()),
                "kaankaplan@gmail.com",
                1,
                1200
        );

        given(tenantRepository.findTenantByEmail(reserveHouseRequest.tenantEmail())).willReturn(null);

        assertThatThrownBy(() -> tenantServiceImpl.addHouseToTenantsVisitedHouses(house, reserveHouseRequest))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Tenant is not found");

        verify(tenantRepository, never()).save(any());
    }
}