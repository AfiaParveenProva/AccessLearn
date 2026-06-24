package com.example.profile.controller;

import com.example.profile.dto.LoginDTO;
import com.example.profile.model.EmailVerificationToken;
import com.example.profile.model.Profile;
import com.example.profile.service.TokenService;
import com.example.profile.service.ProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final ProfileService profileService;
    private final TokenService tokenService;

    public AuthController(ProfileService profileService, TokenService tokenService) {
        this.profileService = profileService;
        this.tokenService = tokenService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Profile newProfile) {
        if (profileService.existsByEmail(newProfile.getEmail())) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        // Save the profile
        Profile savedProfile = profileService.saveProfile(newProfile);

        // Create an email verification token
        EmailVerificationToken token = tokenService.createEmailVerificationToken(savedProfile);

        // Send verification email (implement this method in your service)
        // emailService.sendVerificationEmail(savedProfile.getEmail(), token.getToken());

        return ResponseEntity.ok("Profile registered successfully. Please verify your email.");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
        // Implement login logic
        // For now, let's just return a success response
        return ResponseEntity.ok("User logged in successfully");
    }
}