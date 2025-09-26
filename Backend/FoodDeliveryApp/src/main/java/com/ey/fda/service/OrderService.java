package com.ey.fda.service;

import java.util.List;

import com.ey.fda.dto.OrderDTO;

public interface OrderService {
	
	OrderDTO placeOrder(OrderDTO orderDTO);
	
	OrderDTO getOrderById(Long orderId);
	
	List<OrderDTO> getOrdersByCustomer(Long customerId);
	
	List<OrderDTO> getOrdersByRestaurant(Long restaurantId);

}
