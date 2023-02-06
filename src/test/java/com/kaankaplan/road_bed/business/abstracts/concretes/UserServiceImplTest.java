package com.kaankaplan.road_bed.business.abstracts.concretes;

import com.kaankaplan.road_bed.entities.Role;
import com.kaankaplan.road_bed.entities.User;
import com.kaankaplan.road_bed.repositories.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserServiceImpl userServiceImpl;

    @Test
    void canGetAllUsers() {
        userServiceImpl.getAllUsers();

        verify(userRepository).findAll();
    }

    @Test
    void canAddUser() {
        User user = new User("kaankaplan@gmail.com", "Kaan Kaplan", "1234", new Role());

        // when
        userServiceImpl.addUser(user);

        // given
        ArgumentCaptor<User> argumentCaptor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).insert(argumentCaptor.capture());

        User capturedValue = argumentCaptor.getValue();

        assertThat(capturedValue).isEqualTo(user);
    }

    @Test
    void canFindUserByEmail() {
        String email = "kaankaplan@gmail.com";

        User user = new User(email, "Kaan Kaplan", "1234", new Role());

        given(userRepository.findUserByEmail(email)).willReturn(Optional.of(user));

        userServiceImpl.findUserByEmail(email);

        verify(userRepository).findUserByEmail(email);
    }

    @Test
    void canLoadUserByUsername() {
        String email = "kaankaplan@gmail.com";
        User user = new User(email, "Kaan Kaplan", "1234", new Role("TENANT"));

        given(userRepository.findUserByEmail(email)).willReturn(Optional.of(user));

        userServiceImpl.loadUserByUsername(email);

        verify(userRepository).findUserByEmail(email);

    }

    @Test
    void canNotLoadUserByUsernameWhenUserIsNotFound() {
        String email = "kaankaplan@gmail.com";

        given(userRepository.findUserByEmail(email)).willThrow(new RuntimeException("User not found"));

        assertThatThrownBy(() -> userServiceImpl.loadUserByUsername(email))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("User not found");

        verify(userRepository).findUserByEmail(email);

    }
}