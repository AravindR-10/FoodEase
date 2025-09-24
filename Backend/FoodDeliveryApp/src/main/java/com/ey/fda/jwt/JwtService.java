package com.ey.fda.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ey.fda.dto.LoginRequestDTO;
import com.ey.fda.dto.LoginResponseDTO;
import com.ey.fda.dto.RegisterRequestDTO;
import com.ey.fda.dto.RegisterResponseDTO;
import com.ey.fda.entity.User;
import com.ey.fda.repository.UserRepository;
import com.ey.fda.security.CustomUserDetails;

@Service
public class JwtService {

	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;

	public LoginResponseDTO login(LoginRequestDTO request) {
		Authentication authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

		CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
		User user = userDetails.getUser();

		String token = jwtUtil.generateToken(user, user.getRole());

		return new LoginResponseDTO(token, user.getUsername(), user.getEmail(), user.getRole());
	}

	public RegisterResponseDTO register(RegisterRequestDTO request) {
		if (userRepository.findByEmail(request.getEmail()).isPresent()) {
			throw new RuntimeException("Email already registered");
		}

		User user = new User();
		user.setUsername(request.getUsername());
		user.setEmail(request.getEmail());
		user.setPassword(passwordEncoder.encode(request.getPassword()));
		user.setRole(request.getRole());

		User savedUser = userRepository.save(user);

		return new RegisterResponseDTO(savedUser.getId(), savedUser.getUsername(), savedUser.getEmail(),
				savedUser.getRole(), "User registered successfully");
	}
}