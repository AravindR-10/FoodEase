package com.ey.fda.dto;

public class MenuItemDTO {
	
	private Long id;
	private String name;
	private String description;
	private Double price;
	private Boolean available;
	private Long restaurantId;
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String getDescription() {
		return description;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}
	
	public Double getPrice() {
		return price;
	}
	
	public void setPrice(Double price) {
		this.price = price;
	}
	
	public Boolean getAvailable() {
		return available;
	}
	
	public void setAvailable(Boolean available) {
		this.available = available;
	}
	
	public Long getRestaurantId() {
		return restaurantId;
	}
	
	public void setRestaurantId(Long restaurantId) {
		this.restaurantId = restaurantId;
	}

	public MenuItemDTO() {
		super();
	}

	public MenuItemDTO(Long id, String name, String description, Double price, Boolean available, Long restaurantId) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.price = price;
		this.available = available;
		this.restaurantId = restaurantId;
	}
	
}
