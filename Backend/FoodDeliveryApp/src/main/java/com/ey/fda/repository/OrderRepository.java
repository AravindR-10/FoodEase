package com.ey.fda.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ey.fda.entity.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long>{
	
	List<Order> findByCustomerId(Long customerId);
	List<Order> findByRestaurantId(Long restaurantId);

}
