package com.ey.fda.dto;

public class AdminDTO {
	
	private long totalUsers;
    private long totalCustomers;
    private long totalRestaurantOwners;
    private long totalDeliveryPartners;

    private long totalRestaurants;

    private long totalOrders;
    private long totalDeliveries;

    private double totalRevenue;
    private double averageOrderValue;
	public long getTotalUsers() {
		return totalUsers;
	}
	public void setTotalUsers(long totalUsers) {
		this.totalUsers = totalUsers;
	}
	public long getTotalCustomers() {
		return totalCustomers;
	}
	public void setTotalCustomers(long totalCustomers) {
		this.totalCustomers = totalCustomers;
	}
	public long getTotalRestaurantOwners() {
		return totalRestaurantOwners;
	}
	public void setTotalRestaurantOwners(long totalRestaurantOwners) {
		this.totalRestaurantOwners = totalRestaurantOwners;
	}
	public long getTotalDeliveryPartners() {
		return totalDeliveryPartners;
	}
	public void setTotalDeliveryPartners(long totalDeliveryPartners) {
		this.totalDeliveryPartners = totalDeliveryPartners;
	}
	public long getTotalRestaurants() {
		return totalRestaurants;
	}
	public void setTotalRestaurants(long totalRestaurants) {
		this.totalRestaurants = totalRestaurants;
	}
	public long getTotalOrders() {
		return totalOrders;
	}
	public void setTotalOrders(long totalOrders) {
		this.totalOrders = totalOrders;
	}
	public long getTotalDeliveries() {
		return totalDeliveries;
	}
	public void setTotalDeliveries(long totalDeliveries) {
		this.totalDeliveries = totalDeliveries;
	}
	public double getTotalRevenue() {
		return totalRevenue;
	}
	public void setTotalRevenue(double totalRevenue) {
		this.totalRevenue = totalRevenue;
	}
	public double getAverageOrderValue() {
		return averageOrderValue;
	}
	public void setAverageOrderValue(double averageOrderValue) {
		this.averageOrderValue = averageOrderValue;
	}
	public AdminDTO() {
		super();
	}
	public AdminDTO(long totalUsers, long totalCustomers, long totalRestaurantOwners, long totalDeliveryPartners,
			long totalRestaurants, long totalOrders, long totalDeliveries, double totalRevenue,
			double averageOrderValue) {
		super();
		this.totalUsers = totalUsers;
		this.totalCustomers = totalCustomers;
		this.totalRestaurantOwners = totalRestaurantOwners;
		this.totalDeliveryPartners = totalDeliveryPartners;
		this.totalRestaurants = totalRestaurants;
		this.totalOrders = totalOrders;
		this.totalDeliveries = totalDeliveries;
		this.totalRevenue = totalRevenue;
		this.averageOrderValue = averageOrderValue;
	}

}
