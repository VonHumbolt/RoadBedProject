package com.kaankaplan.road_bed.controllers;

import com.kaankaplan.road_bed.business.abstracts.UserService;
import com.kaankaplan.road_bed.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("users/")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("getByEmail/{email}")
    public User getUserByEmail(@PathVariable("email") String email){
        return userService.findUserByEmail(email);
    }
}
