package com.example.dust.controller;

import com.example.dust.bean.ApiResponse;
import com.example.dust.message.SuccessMessages;
import com.example.dust.testdata.TestData;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/forecase")
public class ForecaseController {

  @GetMapping("/dust-status")
  public ResponseEntity<ApiResponse> dustStatus() {
    log.debug("### dustStatus");

    return new ResponseEntity<>(new ApiResponse(SuccessMessages.SUCCESS, TestData.dustStatus), HttpStatus.OK);
  }
}
