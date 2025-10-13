package com.ey.fda.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ey.fda.entity.Payment;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long>{
	
	Payment findByOrderId(Long orderId);
	
	@Query("SELECT COALESCE(SUM(p.amount), 0) FROM Payment p")
	double sumTotalAmount();

}
