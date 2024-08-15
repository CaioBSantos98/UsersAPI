package com.login.login.controller;

import com.login.login.domain.user.UserDetailsDTO;
import com.login.login.domain.user.UserRepository;
import com.login.login.infra.security.TokenService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("token")
public class TokenController {

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UserRepository repository;

    @GetMapping("/user")
    public ResponseEntity<UserDetailsDTO> getTokenUsername(HttpServletRequest request) {
        String token = tokenService.recoverTokenFromCookies(request);

        if (token != null && tokenService.isValid(token)) {
            var username = tokenService.getSubject(token);
            var user = repository.findUserByUsuarioAndActiveTrue(username);
            return ResponseEntity.ok(new UserDetailsDTO(user));
        }

        return ResponseEntity.notFound().build();
    }
}
