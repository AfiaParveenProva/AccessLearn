package com.example.profile.dto;

import jakarta.validation.constraints.*;

public record RegistrationDTO(
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    String email,
    
    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters")
    String password,
    
    @NotBlank(message = "Please confirm your password")
    String confirmPassword
) {}