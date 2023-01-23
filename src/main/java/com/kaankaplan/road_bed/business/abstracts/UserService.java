package com.kaankaplan.road_bed.business.abstracts;

import com.kaankaplan.road_bed.entities.User;

import java.util.List;

public interface UserService {

    List<User> getAllUsers();

    User addUser(User user);

}
