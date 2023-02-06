package com.kaankaplan.road_bed.business.abstracts.concretes;

import com.kaankaplan.road_bed.entities.Role;
import com.kaankaplan.road_bed.repositories.RoleRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class RoleServiceImplTest {

    @Mock
    private RoleRepository roleRepository;

    @InjectMocks
    private RoleServiceImpl roleServiceImpl;

    @Test
    void canFindByRoleName() {
        String roleName = "ADMIN";

        roleServiceImpl.findByRoleName(roleName);

        verify(roleRepository).findByRoleName(roleName);
    }

    @Test
    void canAddRole() {
        Role role = new Role("ADMIN");

        roleServiceImpl.addRole(role);

        ArgumentCaptor<Role> argumentCaptor = ArgumentCaptor.forClass(Role.class);
        verify(roleRepository).insert(argumentCaptor.capture());

        Role capturedValue = argumentCaptor.getValue();

        assertThat(capturedValue).isEqualTo(role);
    }
}