package com.ey.fda.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ey.fda.dto.LoginRequestDTO;
import com.ey.fda.dto.LoginResponseDTO;
import com.ey.fda.dto.RegisterRequestDTO;
import com.ey.fda.dto.RegisterResponseDTO;
import com.ey.fda.jwt.JwtService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private JwtService jwtService;

    @PostMapping("/login")
    public LoginResponseDTO login(@RequestBody LoginRequestDTO request) {
        return jwtService.login(request);
    }

    @PostMapping("/register")
    public RegisterResponseDTO register(@RequestBody RegisterRequestDTO request) {
        return jwtService.register(request);
    }
}