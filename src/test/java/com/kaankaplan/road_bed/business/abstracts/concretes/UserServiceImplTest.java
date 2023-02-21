package com.kaankaplan.road_bed.business.abstracts.concretes;

import com.kaankaplan.road_bed.entities.City;
import com.kaankaplan.road_bed.entities.House;
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

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;

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
    void canFindUserById() {
        String userId = "userId";
        given(userRepository.findById(userId)).willReturn(Optional.of(new User()));

        userServiceImpl.findUserById(userId);

        verify(userRepository).findById(userId);
    }

    @Test
    void canNotFindUserByIdWhenUserIsNotExist() {
        String userId = "userId";
        given(userRepository.findById(userId)).willReturn(Optional.empty());

        assertThatThrownBy(() -> userServiceImpl.findUserById(userId))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("User is not found");

        verify(userRepository).findById(userId);
    }

    @Test
    void shouldAddHouseToFavorite() {
        String userId = "userId";
        User user = new User("kaankaplan@gmail.com", "Kaan Kaplan", "1234", new Role("TENANT"));

        given(userRepository.findById(userId)).willReturn(Optional.of(user));

        userServiceImpl.addHouseToFavorites(userId, new House());

        verify(userRepository).save(user);
    }

    @Test
    void shouldNotAddHouseToFavoriteWhenUserIsNotExist() {
        String userId = "userId";

        given(userRepository.findById(userId)).willReturn(Optional.empty());

        assertThatThrownBy(() -> userServiceImpl.addHouseToFavorites(userId, new House()))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("User not found");

        verify(userRepository, never()).save(any());
    }


    @Test
    void shouldNotRemoveHouseFromFavoritesWhenHouseIsNotExistsInFavorites() {
        String userId = "userId";
        User user = new User("kaankaplan@gmail.com", "Kaan Kaplan", "1234", new Role("TENANT"));
        House house = new House();

        given(userRepository.findById(userId)).willReturn(Optional.of(user));

        assertThatThrownBy(() -> userServiceImpl.removeHouseFromFavorites(userId, house))
                .isInstanceOf(RuntimeException.class)
                        .hasMessageContaining("House is not find in favorites");

        verify(userRepository, never()).save(any());
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