package com.ey.fda.service;

import java.util.List;

import com.ey.fda.dto.OrderItemDTO;

public interface OrderItemService {
	
	List<OrderItemDTO> getOrderItemsByOrderId(Long orderId);

}
