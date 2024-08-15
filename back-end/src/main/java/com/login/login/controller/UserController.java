package com.login.login.controller;

import com.login.login.domain.user.*;
import com.login.login.infra.security.TokenService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("users")
public class UserController {

    @Autowired
    private UserRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TokenService tokenService;

    @PostMapping
    @Transactional
    public ResponseEntity<UserDetailsDTO> register(@RequestBody @Valid UserRegisterDTO data, UriComponentsBuilder uriBuilder, HttpServletResponse response) {
        var encodePassword = passwordEncoder.encode(data.password());
        var user = new User(data.user(), encodePassword);
        repository.save(user);

        var uri = uriBuilder.path("/users/{id}").buildAndExpand(user.getId()).toUri();

        Cookie cookie = new Cookie("JWT", tokenService.createJWToken(user));
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(24 * 60 * 60);
        response.addCookie(cookie);

        return ResponseEntity.created(uri).body(new UserDetailsDTO(user));
    }

    @GetMapping
    public ResponseEntity<Page<UserDetailsDTO>> allUsers(@PageableDefault(size = 10, sort = "id") Pageable pageable) {
        var users = repository.findAllByActiveTrue(pageable).map(UserDetailsDTO::new);
        return ResponseEntity.ok(users);
    }

    @GetMapping("{id}")
    public ResponseEntity detailsUser(@PathVariable Long id) {
        var user = repository.getReferenceById(id);
        return ResponseEntity.ok(new UserDetailsDTO(user));
    }

    @PutMapping
    @Transactional
    public ResponseEntity updatePassword(@RequestBody @Valid UserUpdateDTO data, HttpServletRequest request) {
        var user = repository.getReferenceById(data.id());
        var token = tokenService.recoverTokenFromCookies(request);
        var subject = tokenService.getSubject(token);

        if (!user.getUsuario().equals(subject)) {
            return ResponseEntity.badRequest().body("Id enviado não pertence a este e-mail");
        }

        if (data.currentPassword().equals(data.newPassword())) {
            return ResponseEntity.badRequest().body("A nova senha não pode ser igual a senha atual!");
        }

        if (!passwordEncoder.matches(data.currentPassword(), user.getPassword())) {
            return ResponseEntity.badRequest().body("Senha atual está inválida. Ação não permitida.");
        }

        user.changePassword(passwordEncoder.encode(data.newPassword()));
        return ResponseEntity.ok(new UserDetailsDTO(user));
    }

    @DeleteMapping
    @Transactional
    public ResponseEntity delete(HttpServletRequest request, HttpServletResponse response) {
        var token = tokenService.recoverTokenFromCookies(request);
        var subject = tokenService.getSubject(token);
        var user = repository.findUserByUsuarioAndActiveTrue(subject);

        user.delete();

        Cookie cookie = new Cookie("JWT", null);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);

        return ResponseEntity.noContent().build();
    }
}
