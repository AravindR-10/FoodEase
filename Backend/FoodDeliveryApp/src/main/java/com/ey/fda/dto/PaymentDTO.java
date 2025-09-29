package com.ey.fda.dto;

import java.time.LocalDateTime;

public class PaymentDTO {
	
	private Long id;
	private Long orderId;
	private Double amount;
	private String status;
	private LocalDateTime timestamp;
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public Long getOrderId() {
		return orderId;
	}
	
	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}
	
	public Double getAmount() {
		return amount;
	}
	
	public void setAmount(Double amount) {
		this.amount = amount;
	}
	
	public String getStatus() {
		return status;
	}
	
	public void setStatus(String status) {
		this.status = status;
	}
	
	public LocalDateTime getTimestamp() {
		return timestamp;
	}
	
	public void setTimestamp(LocalDateTime timestamp) {
		this.timestamp = timestamp;
	}
	
	public PaymentDTO() {
		super();
	}
	
	public PaymentDTO(Long id, Long orderId, Double amount, String status, LocalDateTime timestamp) {
		super();
		this.id = id;
		this.orderId = orderId;
		this.amount = amount;
		this.status = status;
		this.timestamp = timestamp;
	}

}
