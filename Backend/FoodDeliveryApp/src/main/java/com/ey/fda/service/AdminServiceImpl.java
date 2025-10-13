package com.ey.fda.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ey.fda.dto.AdminDTO;
import com.ey.fda.enums.Role;
import com.ey.fda.repository.DeliveryRepository;
import com.ey.fda.repository.OrderRepository;
import com.ey.fda.repository.PaymentRepository;
import com.ey.fda.repository.RestaurantRepository;
import com.ey.fda.repository.UserRepository;

@Service
public class AdminServiceImpl implements AdminService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RestaurantRepository restaurantRepository;

	@Autowired
	private OrderRepository orderRepository;

	@Autowired
	private DeliveryRepository deliveryRepository;
	
	@Autowired
	private PaymentRepository paymentRepository;

	@Override
	public AdminDTO getAdminStats() {
		long totalUsers = userRepository.count();
		long totalCustomers = userRepository.countByRole(Role.CUSTOMER);
		long totalRestaurantOwners = userRepository.countByRole(Role.RESTAURANT_OWNER);
		long totalDeliveryPartners = userRepository.countByRole(Role.DELIVERY_PARTNER);

		long totalRestaurants = restaurantRepository.count();
		long totalOrders = orderRepository.count();
		long totalDeliveries = deliveryRepository.count();

		double totalRevenue = paymentRepository.sumTotalAmount();
		double averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

		return new AdminDTO(totalUsers, totalCustomers, totalRestaurantOwners, totalDeliveryPartners, totalRestaurants,
				totalOrders, totalDeliveries, totalRevenue, averageOrderValue);
	}
}
