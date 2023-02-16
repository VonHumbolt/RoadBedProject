package com.kaankaplan.road_bed.business.abstracts;

import com.kaankaplan.road_bed.entities.House;
import com.kaankaplan.road_bed.entities.User;

import java.util.List;

public interface UserService {

    List<User> getAllUsers();

    User addUser(User user);

    User findUserByEmail(String email);

    User findUserById(String userId);

    void addHouseToFavorites(String userId, House house);

    void removeHouseFromFavorites(String userId, House house);
}
