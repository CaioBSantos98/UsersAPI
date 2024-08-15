package com.login.login.domain.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UserRegisterDTO(
        @NotBlank @Email
        String user,
        @NotBlank
        String password
) {
}
