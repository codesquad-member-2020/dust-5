package com.example.dust.bean;

import lombok.Getter;

@Getter
public class ApiResponse {
  private String status;
  private String stationName;
  private Object contents;

  public ApiResponse() {
  }

  public ApiResponse(String status, String contents) {
    this.status = status;
    this.contents = contents;
  }

  public ApiResponse(String status, Object contents) {
    this.status = status;
    this.contents = contents;
  }

  public ApiResponse(String status, String stationName, Object contents) {
    this.status = status;
    this.stationName = stationName;
    this.contents = contents;
  }
}
