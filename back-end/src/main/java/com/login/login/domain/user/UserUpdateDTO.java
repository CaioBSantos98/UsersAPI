package com.login.login.domain.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UserUpdateDTO(
        @NotNull
        Long id,
        @NotBlank
        String currentPassword,
        @NotBlank
        String newPassword
) {
}
