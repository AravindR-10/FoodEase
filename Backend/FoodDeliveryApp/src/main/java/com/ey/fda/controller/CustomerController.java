package com.ey.fda.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/customer")
public class CustomerController {

    @GetMapping("/profile")
    public String getProfile() {
        return "This is the CUSTOMER profile endpoint. Access granted!";
    }
}