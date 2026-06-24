package com.example.profile.service;

import com.example.profile.model.EmailVerificationToken;
import com.example.profile.model.Profile;
import com.example.profile.repository.EmailVerificationTokenRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class TokenService {

    private final EmailVerificationTokenRepository tokenRepository;

    public TokenService(EmailVerificationTokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    public EmailVerificationToken createEmailVerificationToken(Profile profile) {
        EmailVerificationToken token = new EmailVerificationToken();
        token.setToken(java.util.UUID.randomUUID().toString());
        token.setProfile(profile);
        token.setExpiresAt(LocalDateTime.now().plusHours(24));
        return tokenRepository.save(token);
    }

    public Optional<EmailVerificationToken> validateEmailVerificationToken(String token) {
        return tokenRepository.findByToken(token)
                .filter(t -> t.getExpiresAt().isAfter(LocalDateTime.now()));
    }
}