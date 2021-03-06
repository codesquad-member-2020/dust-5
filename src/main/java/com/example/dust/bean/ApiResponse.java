package com.example.dust.bean;

import lombok.Getter;

import java.util.Map;

@Getter
public class ApiResponse {
  private String status;
  private Object contents;

  private ApiResponse() {}

  public ApiResponse(String status, String contents) {
    this.status = status;
    this.contents = contents;
  }

  public ApiResponse(String status, Object contents) {
    this.status = status;
    this.contents = contents;
  }

  public ApiResponse(String status, Map<String, Object> contents) {
    this.status = status;
    this.contents = contents;
  }
}
