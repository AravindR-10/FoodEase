package com.ey.fda.messaging;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.ey.fda.entity.Delivery;
import com.ey.fda.enums.DeliveryStatus;
import com.ey.fda.repository.DeliveryRepository;

@Component
public class DeliveryStatusScheduler {

    @Autowired
    private DeliveryRepository deliveryRepository;

    @Autowired
    private DeliveryStatusPublisher deliveryStatusPublisher;

    @Scheduled(fixedRate = 60000) // every 1 minute
    public void updateDeliveryStatuses() {
        List<Delivery> deliveries = deliveryRepository.findByStatusNot(DeliveryStatus.DELIVERED);

        for (Delivery delivery : deliveries) {
            DeliveryStatus current = delivery.getStatus();
            DeliveryStatus next = getNextStatus(current);

            if (next != null) {
                delivery.setStatus(next);
                delivery.setLastUpdate(LocalDateTime.now());
                deliveryRepository.save(delivery);

                DeliveryStatusMessage message = new DeliveryStatusMessage(
                        delivery.getId(),
                        next.name(),
                        delivery.getLastUpdate()
                );
                deliveryStatusPublisher.publishStatusUpdate(message);
            }
        }
    }

    private DeliveryStatus getNextStatus(DeliveryStatus current) {
        switch (current) {
            case ASSIGNED: return DeliveryStatus.EN_ROUTE;
            case EN_ROUTE: return DeliveryStatus.DELIVERED;
            default: return null;
        }
    }
}