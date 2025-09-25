package com.ey.fda.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ey.fda.dto.MenuItemDTO;
import com.ey.fda.dto.RestaurantDTO;
import com.ey.fda.service.MenuItemService;
import com.ey.fda.service.RestaurantService;

@RestController
@RequestMapping("/restaurant")
public class RestaurantController {

	@Autowired
	private RestaurantService restaurantService;

	@Autowired
	private MenuItemService menuItemService;

	@PostMapping
	@PreAuthorize("hasAuthority('RESTAURANT_OWNER')")
	public ResponseEntity<RestaurantDTO> createRestaurant(@RequestBody RestaurantDTO dto) {
		RestaurantDTO created = restaurantService.createRestaurant(dto);
		return ResponseEntity.ok(created);
	}

	@PutMapping("/{id}")
	@PreAuthorize("hasAuthority('RESTAURANT_OWNER')")
	public ResponseEntity<RestaurantDTO> updateRestaurant(@PathVariable Long id, @RequestBody RestaurantDTO dto) {
		RestaurantDTO updated = restaurantService.updateRestaurant(id, dto);
		return ResponseEntity.ok(updated);
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasAuthority('RESTAURANT_OWNER')")
	public ResponseEntity<String> deleteRestaurant(@PathVariable Long id) {
		restaurantService.deleteRestaurant(id);
		return ResponseEntity.ok("Restaurant deleted successfully");
	}

	@GetMapping("/{id}")
	@PreAuthorize("hasAuthority('RESTAURANT_OWNER')")
	public ResponseEntity<RestaurantDTO> getRestaurantById(@PathVariable Long id) {
		RestaurantDTO dto = restaurantService.getRestaurantById(id);
		return ResponseEntity.ok(dto);
	}

	@GetMapping("/owner/{ownerId}")
	@PreAuthorize("hasAuthority('RESTAURANT_OWNER')")
	public ResponseEntity<List<RestaurantDTO>> getRestaurantsByOwner(@PathVariable Long ownerId) {
		List<RestaurantDTO> list = restaurantService.getRestaurantsByOwner(ownerId);
		return ResponseEntity.ok(list);
	}

	@GetMapping
	@PreAuthorize("hasAuthority('RESTAURANT_OWNER')")
	public ResponseEntity<List<RestaurantDTO>> getAllRestaurants() {
		List<RestaurantDTO> list = restaurantService.getAllRestaurants();
		return ResponseEntity.ok(list);
	}

	@PostMapping("/{restaurantId}/menu")
	@PreAuthorize("hasAuthority('RESTAURANT_OWNER')")
	public ResponseEntity<MenuItemDTO> addMenuItem(@PathVariable Long restaurantId, @RequestBody MenuItemDTO dto) {
		dto.setRestaurantId(restaurantId);
		return ResponseEntity.ok(menuItemService.addMenuItem(dto));
	}

	@PutMapping("/menu/{menuItemId}")
	@PreAuthorize("hasAuthority('RESTAURANT_OWNER')")
	public ResponseEntity<MenuItemDTO> updateMenuItem(@PathVariable Long menuItemId, @RequestBody MenuItemDTO dto) {
		return ResponseEntity.ok(menuItemService.updateMenuItem(menuItemId, dto));
	}

	@DeleteMapping("/menu/{menuItemId}")
	@PreAuthorize("hasAuthority('RESTAURANT_OWNER')")
	public ResponseEntity<String> deleteMenuItem(@PathVariable Long menuItemId) {
		menuItemService.deleteMenuItem(menuItemId);
		return ResponseEntity.ok("Menu item deleted successfully");
	}

	@GetMapping("/{restaurantId}/menu")
	@PreAuthorize("hasAuthority('RESTAURANT_OWNER')")
	public ResponseEntity<List<MenuItemDTO>> getMenuItemsByRestaurant(@PathVariable Long restaurantId) {
		return ResponseEntity.ok(menuItemService.getMenuItemsByRestaurant(restaurantId));
	}

	@GetMapping("/menu/{menuItemId}")
	@PreAuthorize("hasAuthority('RESTAURANT_OWNER')")
	public ResponseEntity<MenuItemDTO> getMenuItemById(@PathVariable Long menuItemId) {
		return ResponseEntity.ok(menuItemService.getMenuItemById(menuItemId));
	}

}