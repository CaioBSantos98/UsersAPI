package com.login.login.infra.exceptions;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity alreadyRegisteredUser(DataIntegrityViolationException ex) {
        return ResponseEntity.badRequest().body(new ValidationErrorData(null, "Usuário já cadastrado!"));
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity invalidOrExpiredToken(RuntimeException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity invalidArgument(MethodArgumentNotValidException ex) {
        return ResponseEntity.badRequest().body(new ValidationErrorData(null, ex.getMessage()));
    }

    @ExceptionHandler(InternalAuthenticationServiceException.class)
    public ResponseEntity invalidUser(InternalAuthenticationServiceException ex) {
        return ResponseEntity.badRequest().body(new ValidationErrorData("user", "Usuário foi excluído do sistema... " + ex.getMessage()));
    }

    private record ValidationErrorData(String field, String message) {
        public ValidationErrorData(FieldError error) {
            this(error.getField(), error.getDefaultMessage());
        }
    }
}
