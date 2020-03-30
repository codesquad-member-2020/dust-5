package com.example.dust.exception;

import com.example.dust.bean.ApiResponse;
import com.example.dust.message.ErrorMessages;

public class BaseException extends RuntimeException {
  private String errorMessage;

  public BaseException(String errorMessage) {
    this.errorMessage = errorMessage;
  }

  public ApiResponse returnErrorMessage() {
    return new ApiResponse(ErrorMessages.ERROR, errorMessage);
  }
}
