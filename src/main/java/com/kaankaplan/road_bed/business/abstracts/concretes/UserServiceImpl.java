package com.kaankaplan.road_bed.business.abstracts.concretes;

import com.kaankaplan.road_bed.business.abstracts.UserService;
import com.kaankaplan.road_bed.entities.House;
import com.kaankaplan.road_bed.entities.User;
import com.kaankaplan.road_bed.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Cacheable(value = "users")
    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @CacheEvict(value = "users", allEntries = true)
    @Transactional
    @Override
    public User addUser(User user) {
        return userRepository.insert(user);
    }


    @Override
    public User findUserByEmail(String email) {
        return userRepository.findUserByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    @Override
    public User findUserById(String userId) {
        return userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User is not found"));
    }

    @Override
    public void addHouseToFavorites(String userId, House house) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        user.favoriteHouses.add(house);
        userRepository.save(user);
    }

    @Override
    public void removeHouseFromFavorites(String userId, House house) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        boolean isHouseInFavorites = user.favoriteHouses.stream().anyMatch(h -> h.getHouseId().equals(house.getHouseId()));

        if (!isHouseInFavorites) {
            throw new RuntimeException("House is not find in favorites");
        }

        user.favoriteHouses = user.favoriteHouses.stream().filter(h -> !h.getHouseId().equals(house.getHouseId())).toList();
        userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findUserByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new org.springframework.security.core.userdetails.User(
                email,
                user.password,
                List.of( new SimpleGrantedAuthority(user.role.roleName) )
        );
    }
}
