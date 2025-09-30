package com.ey.fda.messaging;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class DeliveryStatusPublisher {

    @Value("${delivery.status.exchange}")
    private String exchange;

    @Value("${delivery.status.routing-key}")
    private String routingKey;

    private final RabbitTemplate rabbitTemplate;

    public DeliveryStatusPublisher(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void publishStatusUpdate(DeliveryStatusMessage message) {
        rabbitTemplate.convertAndSend(exchange, routingKey, message);
    }
}