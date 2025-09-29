package com.ey.fda.dto;

import java.time.LocalDateTime;

public class DeliveryDTO {

    private Long id;
    private Long orderId;
    private Long partnerId;
    private String status;
    private LocalDateTime lastUpdate;
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
	public Long getPartnerId() {
		return partnerId;
	}
	public void setPartnerId(Long partnerId) {
		this.partnerId = partnerId;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public LocalDateTime getLastUpdate() {
		return lastUpdate;
	}
	public void setLastUpdate(LocalDateTime lastUpdate) {
		this.lastUpdate = lastUpdate;
	}
	public DeliveryDTO() {
		super();
	}
	public DeliveryDTO(Long id, Long orderId, Long partnerId, String status, LocalDateTime lastUpdate) {
		super();
		this.id = id;
		this.orderId = orderId;
		this.partnerId = partnerId;
		this.status = status;
		this.lastUpdate = lastUpdate;
	}

}