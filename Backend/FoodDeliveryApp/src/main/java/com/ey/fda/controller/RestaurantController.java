package com.ey.fda.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/restaurant")
public class RestaurantController {

    @GetMapping("/profile")
    public String getProfile() {
        return "This is the Restaurant profile endpoint. Access granted!";
    }
}