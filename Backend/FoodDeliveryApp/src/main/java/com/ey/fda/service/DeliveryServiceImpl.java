package com.ey.fda.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ey.fda.dto.DeliveryDTO;
import com.ey.fda.entity.Delivery;
import com.ey.fda.entity.Order;
import com.ey.fda.entity.User;
import com.ey.fda.enums.DeliveryStatus;
import com.ey.fda.exception.ResourceNotFoundException;
import com.ey.fda.messaging.DeliveryStatusMessage;
import com.ey.fda.messaging.DeliveryStatusPublisher;
import com.ey.fda.repository.DeliveryRepository;
import com.ey.fda.repository.OrderRepository;
import com.ey.fda.repository.UserRepository;

@Service
public class DeliveryServiceImpl implements DeliveryService {

	@Autowired
	private DeliveryRepository deliveryRepository;

	@Autowired
	private OrderRepository orderRepository;

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private DeliveryStatusPublisher deliveryStatusPublisher;

	@Override
	public DeliveryDTO createDelivery(DeliveryDTO deliveryDTO) {
		Order order = orderRepository.findById(deliveryDTO.getOrderId()).orElseThrow(
				() -> new ResourceNotFoundException("Order not found with ID: " + deliveryDTO.getOrderId()));

		User partner = userRepository.findById(deliveryDTO.getPartnerId())
				.orElseThrow(() -> new ResourceNotFoundException(
						"Delivery partner not found with ID: " + deliveryDTO.getPartnerId()));

		Delivery delivery = new Delivery();
		delivery.setOrder(order);
		delivery.setPartner(partner);
		delivery.setStatus(DeliveryStatus.ASSIGNED);
		delivery.setLastUpdate(LocalDateTime.now());

		Delivery saved = deliveryRepository.save(delivery);

		return new DeliveryDTO(saved.getId(), saved.getOrder().getId(), saved.getPartner().getId(),
				saved.getStatus().name(), saved.getLastUpdate());
	}

	@Override
	public DeliveryDTO updateDeliveryStatus(Long deliveryId, String status) {
		Delivery delivery = deliveryRepository.findById(deliveryId)
				.orElseThrow(() -> new ResourceNotFoundException("Delivery not found with ID: " + deliveryId));

		delivery.setStatus(DeliveryStatus.valueOf(status.toUpperCase()));
		delivery.setLastUpdate(LocalDateTime.now());

		Delivery updated = deliveryRepository.save(delivery);

		// Publish message to RabbitMQ
		DeliveryStatusMessage message = new DeliveryStatusMessage(updated.getId(), updated.getStatus().name(),
				updated.getLastUpdate());
		deliveryStatusPublisher.publishStatusUpdate(message);

		return new DeliveryDTO(updated.getId(), updated.getOrder().getId(), updated.getPartner().getId(),
				updated.getStatus().name(), updated.getLastUpdate());
	}

	@Override
	public DeliveryDTO getDeliveryByOrderId(Long orderId) {
		Delivery delivery = deliveryRepository.findByOrderId(orderId)
				.orElseThrow(() -> new ResourceNotFoundException("Delivery not found with Order ID: " + orderId));

		DeliveryDTO dto = new DeliveryDTO(delivery.getId(), delivery.getOrder().getId(), delivery.getPartner().getId(),
				delivery.getStatus().name(), delivery.getLastUpdate());
		dto.setPartnerName(delivery.getPartner().getUsername());
		return dto;
	}

	@Override
	public List<DeliveryDTO> getDeliveriesByPartnerId(Long partnerId) {
		List<Delivery> deliveries = deliveryRepository.findByPartnerId(partnerId);

		return deliveries.stream().map(delivery -> {
			DeliveryDTO dto = new DeliveryDTO();
			dto.setId(delivery.getId());
			dto.setOrderId(delivery.getOrder().getId());
			dto.setRestaurantName(delivery.getOrder().getRestaurant().getName());
			dto.setCustomerName(delivery.getOrder().getCustomer().getUsername());
			dto.setStatus(delivery.getStatus().name());
			dto.setLastUpdate(delivery.getLastUpdate());
			return dto;
		}).collect(Collectors.toList());
	}

	@Override
	public List<DeliveryDTO> getAllDeliveries() {
		List<Delivery> deliveries = deliveryRepository.findAll();

		return deliveries.stream().map(delivery -> {
			DeliveryDTO dto = new DeliveryDTO();
			dto.setId(delivery.getId());
			dto.setOrderId(delivery.getOrder().getId());
			dto.setPartnerId(delivery.getPartner().getId());
			dto.setPartnerName(delivery.getPartner().getUsername());
			dto.setStatus(delivery.getStatus().name());
			dto.setLastUpdate(delivery.getLastUpdate());
			return dto;
		}).collect(Collectors.toList());
	}

}