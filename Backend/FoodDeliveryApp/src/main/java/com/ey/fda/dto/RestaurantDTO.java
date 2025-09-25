package com.ey.fda.dto;

public class RestaurantDTO {
	
	private Long id;
	private String name;
	private String address;
	private Double rating;
	private Long ownerId;
	
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
	
	public String getAddress() {
		return address;
	}
	
	public void setAddress(String address) {
		this.address = address;
	}
	
	public Double getRating() {
		return rating;
	}
	
	public void setRating(Double rating) {
		this.rating = rating;
	}
	
	public Long getOwnerId() {
		return ownerId;
	}
	
	public void setOwnerId(Long ownerId) {
		this.ownerId = ownerId;
	}
	
	public RestaurantDTO() {
		super();
	}
	
	public RestaurantDTO(Long id, String name, String address, Double rating, Long ownerId) {
		super();
		this.id = id;
		this.name = name;
		this.address = address;
		this.rating = rating;
		this.ownerId = ownerId;
	}
	
}
