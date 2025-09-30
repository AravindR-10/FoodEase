package com.ey.fda.service;

import java.util.List;

import com.ey.fda.dto.UserDTO;
import com.ey.fda.enums.Role;

public interface UserService {
	
	List<UserDTO> getAllUsers();

	UserDTO getUserById(Long id);

	List<UserDTO> getUsersByRole(Role role);
}