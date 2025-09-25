package com.ey.fda.service;

import com.ey.fda.dto.RestaurantDTO;

import java.util.List;

public interface RestaurantService {
	
    RestaurantDTO createRestaurant(RestaurantDTO restaurantDTO);
    
    RestaurantDTO updateRestaurant(Long id, RestaurantDTO restaurantDTO);
    
    void deleteRestaurant(Long id);
    
    RestaurantDTO getRestaurantById(Long id);
    
    List<RestaurantDTO> getRestaurantsByOwner(Long ownerId);
    
    List<RestaurantDTO> getAllRestaurants();
}