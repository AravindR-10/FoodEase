package com.ey.fda.service;

import com.ey.fda.dto.PaymentDTO;

public interface PaymentService {
	
	PaymentDTO makePayment(PaymentDTO paymentDTO);
	PaymentDTO getPaymentByOrderId(Long orderId);

}
