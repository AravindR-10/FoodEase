package com.ey.fda.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ey.fda.entity.Delivery;

@Repository
public interface DeliveryRepository extends JpaRepository<Delivery, Long>{
	
	List<Delivery> findByPartnerId(Long partnerId);
	
}
