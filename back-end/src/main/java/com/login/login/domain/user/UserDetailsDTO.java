package com.login.login.domain.user;

public record UserDetailsDTO(
        Long id,
        String user) {
    public UserDetailsDTO(User user) {
        this(user.getId(), user.getUsuario());
    }
}
