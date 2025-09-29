package com.ey.fda.entity;

import java.time.LocalDateTime;

import com.ey.fda.enums.DeliveryStatus;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "delivery")
public class Delivery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne
    @JoinColumn(name = "partner_id")
    private User partner;

    @Enumerated(EnumType.STRING)
    private DeliveryStatus status;

    private LocalDateTime lastUpdate;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Order getOrder() {
		return order;
	}

	public void setOrder(Order order) {
		this.order = order;
	}

	public User getPartner() {
		return partner;
	}

	public void setPartner(User partner) {
		this.partner = partner;
	}

	public DeliveryStatus getStatus() {
		return status;
	}

	public void setStatus(DeliveryStatus status) {
		this.status = status;
	}

	public LocalDateTime getLastUpdate() {
		return lastUpdate;
	}

	public void setLastUpdate(LocalDateTime lastUpdate) {
		this.lastUpdate = lastUpdate;
	}

	public Delivery() {
		super();
	}

	public Delivery(Long id, Order order, User partner, DeliveryStatus status, LocalDateTime lastUpdate) {
		super();
		this.id = id;
		this.order = order;
		this.partner = partner;
		this.status = status;
		this.lastUpdate = lastUpdate;
	}

}