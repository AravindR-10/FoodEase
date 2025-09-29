package com.ey.fda.service;

import java.util.List;

import com.ey.fda.dto.DeliveryDTO;

public interface DeliveryService {

	DeliveryDTO createDelivery(DeliveryDTO deliveryDTO);

	DeliveryDTO updateDeliveryStatus(Long deliveryId, String status);

	DeliveryDTO getDeliveryByOrderId(Long orderId);

	List<DeliveryDTO> getDeliveriesByPartnerId(Long partnerId);

}
