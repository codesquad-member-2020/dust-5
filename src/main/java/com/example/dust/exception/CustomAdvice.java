package com.example.dust.exception;

import com.example.dust.bean.ApiResponse;
import com.example.dust.message.ErrorMessages;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.validation.ConstraintViolationException;

@Slf4j
@ControllerAdvice
public class CustomAdvice {

  @ExceptionHandler(Exception.class)
  @ResponseStatus(HttpStatus.SERVICE_UNAVAILABLE)
  @ResponseBody
  public ApiResponse handleError(Exception e) {
    log.info("### handleError : {}", e.getMessage());

    return new ApiResponse(ErrorMessages.ERROR, "공공API 문제");
  }

  @ExceptionHandler(ConstraintViolationException.class)
  @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
  @ResponseBody
  public ApiResponse handleViolationError(ConstraintViolationException e) {
    log.info("### handleViolationError : {}", e.getMessage());

    return new ApiResponse(ErrorMessages.ERROR, e.getMessage());
  }
}
