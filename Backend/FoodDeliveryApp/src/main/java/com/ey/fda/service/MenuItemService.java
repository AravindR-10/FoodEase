package com.ey.fda.service;

import java.util.List;

import com.ey.fda.dto.MenuItemDTO;

public interface MenuItemService {
	
	MenuItemDTO addMenuItem(MenuItemDTO menuItemDTO);
	
	MenuItemDTO updateMenuItem(Long id, MenuItemDTO menuItemDTO);
	
	void deleteMenuItem(Long id);
	
	MenuItemDTO getMenuItemById(Long id);
	
	List<MenuItemDTO> getMenuItemsByRestaurant(Long restaurantId);
	
}
