package com.ey.fda.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ey.fda.dto.DeliveryDTO;
import com.ey.fda.service.DeliveryService;

@RestController
@RequestMapping("/delivery")
public class DeliveryController {

	@Autowired
	private DeliveryService deliveryService;

	@PutMapping("/{id}/status")
	public ResponseEntity<DeliveryDTO> updateStatus(@PathVariable Long id, @RequestParam String status) {
		DeliveryDTO updated = deliveryService.updateDeliveryStatus(id, status);
		return ResponseEntity.ok(updated);
	}

	@GetMapping("/partner/{partnerId}")
	public ResponseEntity<List<DeliveryDTO>> getDeliveriesByPartner(@PathVariable Long partnerId) {
		List<DeliveryDTO> deliveries = deliveryService.getDeliveriesByPartnerId(partnerId);
		return ResponseEntity.ok(deliveries);
	}
}