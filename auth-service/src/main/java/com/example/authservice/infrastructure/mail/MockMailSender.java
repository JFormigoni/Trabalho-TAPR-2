package com.example.authservice.infrastructure.mail;

import com.example.authservice.application.ports.MailSender;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.time.Instant;

@Slf4j
@Component
public class MockMailSender implements MailSender {

    @Override
    public void sendMagicLink(String to, String url, Instant expiresAt) {
        log.info("=== MOCK EMAIL ===");
        log.info("To: {}", to);
        log.info("Magic Link URL: {}", url);
        log.info("Expires At: {}", expiresAt);
        log.info("==================");
    }
}
