package com.ey.fda.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ey.fda.dto.RestaurantDTO;
import com.ey.fda.entity.Restaurant;
import com.ey.fda.entity.User;
import com.ey.fda.exception.ResourceNotFoundException;
import com.ey.fda.exception.UnauthorizedAccessException;
import com.ey.fda.repository.RestaurantRepository;
import com.ey.fda.repository.UserRepository;

@Service
public class RestaurantServiceImpl implements RestaurantService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RestaurantRepository restaurantRepository;

	@Override
	public RestaurantDTO createRestaurant(RestaurantDTO restaurantDTO) {

		User owner = userRepository.findById(restaurantDTO.getOwnerId())
				.orElseThrow(() -> new ResourceNotFoundException("Owner not found"));

		Restaurant restaurant = new Restaurant();
		restaurant.setName(restaurantDTO.getName());
		restaurant.setAddress(restaurantDTO.getAddress());
		restaurant.setRating(restaurantDTO.getRating());
		restaurant.setOwner(owner);

		Restaurant saved = restaurantRepository.save(restaurant);

		RestaurantDTO response = new RestaurantDTO();
		response.setId(saved.getId());
		response.setName(saved.getName());
		response.setAddress(saved.getAddress());
		response.setRating(saved.getRating());
		response.setOwnerId(saved.getOwner().getId());

		return response;
	}

	@Override
	public RestaurantDTO updateRestaurant(Long id, RestaurantDTO restaurantDTO) {

		Restaurant restaurant = restaurantRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Restaurant not found"));

		if (!restaurant.getOwner().getId().equals(restaurantDTO.getOwnerId())) {
			throw new UnauthorizedAccessException("You are not authorized to update this restaurant");
		}

		restaurant.setName(restaurantDTO.getName());
		restaurant.setAddress(restaurantDTO.getAddress());
		restaurant.setRating(restaurantDTO.getRating());

		Restaurant updated = restaurantRepository.save(restaurant);

		RestaurantDTO response = new RestaurantDTO();
		response.setId(updated.getId());
		response.setName(updated.getName());
		response.setAddress(updated.getAddress());
		response.setRating(updated.getRating());
		response.setOwnerId(updated.getOwner().getId());

		return response;
	}

	@Override
	public void deleteRestaurant(Long id) {

		Restaurant restaurant = restaurantRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Restaurant not found"));

		restaurantRepository.delete(restaurant);
	}

	@Override
	public RestaurantDTO getRestaurantById(Long id) {

		Restaurant restaurant = restaurantRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Restaurant not found"));
		
		RestaurantDTO restaurantDTO = new RestaurantDTO();
		restaurantDTO.setId(restaurant.getId());
		restaurantDTO.setName(restaurant.getName());
		restaurantDTO.setAddress(restaurant.getAddress());
		restaurantDTO.setRating(restaurant.getRating());
		restaurantDTO.setOwnerId(restaurant.getOwner().getId());
		
		return restaurantDTO;
	}

	@Override
	public List<RestaurantDTO> getRestaurantsByOwner(Long ownerId) {
		
		return restaurantRepository.findByOwnerId(ownerId)
				.stream()
				.map(r -> {
					RestaurantDTO dto = new RestaurantDTO();
					dto.setId(r.getId());
					dto.setName(r.getName());
					dto.setAddress(r.getAddress());
					dto.setRating(r.getRating());
					dto.setOwnerId(r.getOwner().getId());
					return dto;
				}).collect(Collectors.toList());
	}

	@Override
	public List<RestaurantDTO> getAllRestaurants() {
		
		return restaurantRepository.findAll()
				.stream()
				.map(r -> {
					RestaurantDTO dto = new RestaurantDTO();
					dto.setId(r.getId());
					dto.setName(r.getName());
					dto.setAddress(r.getAddress());
					dto.setRating(r.getRating());
					dto.setOwnerId(r.getOwner().getId());
					return dto;
				}).collect(Collectors.toList());
	}

}
