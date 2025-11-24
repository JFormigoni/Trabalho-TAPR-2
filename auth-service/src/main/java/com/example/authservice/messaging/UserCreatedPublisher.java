package com.example.authservice.messaging;

import com.example.authservice.messaging.events.UserCreatedEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class UserCreatedPublisher {

    private final RabbitTemplate rabbitTemplate;

    public void publish(UserCreatedEvent event) {
        try {
            rabbitTemplate.convertAndSend(RabbitConfig.USER_CREATED_QUEUE, event);
            log.info("Published UserCreatedEvent for user: {}", event.getUsername());
        } catch (Exception e) {
            log.error("Error publishing UserCreatedEvent", e);
        }
    }
}
