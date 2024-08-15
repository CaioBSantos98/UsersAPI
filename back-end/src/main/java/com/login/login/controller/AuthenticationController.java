package com.login.login.controller;

import com.login.login.domain.user.User;
import com.login.login.domain.user.UserDetailsDTO;
import com.login.login.domain.user.UserRegisterDTO;
import com.login.login.infra.security.JWTokenDTO;
import com.login.login.infra.security.TokenService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("login")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private TokenService tokenService;

    @PostMapping
    public ResponseEntity login(@RequestBody @Valid UserRegisterDTO data, HttpServletResponse response) {
        var token = new UsernamePasswordAuthenticationToken(data.user(), data.password());
        var authentication = manager.authenticate(token);
        var tokenJWT = tokenService.createJWToken((User) authentication.getPrincipal());

        Cookie cookie = new Cookie("JWT", tokenJWT);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(24 * 60 * 60);
        response.addCookie(cookie);

        return ResponseEntity.ok(new UserDetailsDTO(((User) authentication.getPrincipal()).getId(), ((User) authentication.getPrincipal()).getUsername()));
    }
}
