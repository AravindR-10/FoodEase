package com.ey.fda.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ey.fda.dto.PaymentDTO;
import com.ey.fda.entity.Order;
import com.ey.fda.entity.Payment;
import com.ey.fda.enums.PaymentStatus;
import com.ey.fda.exception.ResourceNotFoundException;
import com.ey.fda.repository.OrderRepository;
import com.ey.fda.repository.PaymentRepository;

@Service
public class PaymentServiceImpl implements PaymentService {

	@Autowired
	private PaymentRepository paymentRepository;

	@Autowired
	private OrderRepository orderRepository;

	@Override
	public PaymentDTO makePayment(PaymentDTO paymentDTO) {

		Order order = orderRepository.findById(paymentDTO.getOrderId())
				.orElseThrow(() -> new ResourceNotFoundException("Order not found"));

		Payment payment = new Payment();
		payment.setOrder(order);
		payment.setAmount(paymentDTO.getAmount());
		payment.setPaymentStatus(PaymentStatus.SUCCESS);
		payment.setTimestamp(LocalDateTime.now());

		Payment saved = paymentRepository.save(payment);

		return new PaymentDTO(saved.getId(), saved.getOrder().getId(), saved.getAmount(),
				saved.getPaymentStatus().name(), saved.getTimestamp());
	}

	@Override
	public PaymentDTO getPaymentByOrderId(Long orderId) {
		Payment payment = paymentRepository.findByOrderId(orderId);
		if (payment == null) {
			throw new ResourceNotFoundException("Payment not found for order ID: " + orderId);
		}

		return new PaymentDTO(payment.getId(), payment.getOrder().getId(), payment.getAmount(),
				payment.getPaymentStatus().name(), payment.getTimestamp());
	}

}
