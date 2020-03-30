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
import sun.net.www.protocol.http.HttpURLConnection;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;

@Slf4j
@RestController
@RequestMapping("/forecast")
public class ForecastController {

  @GetMapping("/dust-status")
  public ResponseEntity<ApiResponse> dustStatus() {
    log.debug("### dustStatus");

    return new ResponseEntity<>(new ApiResponse(SuccessMessages.SUCCESS, TestData.dustStatus), HttpStatus.OK);
  }

  @GetMapping
  public ResponseEntity<ApiResponse> forecast() throws IOException {
    String path = "http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getMinuDustFrcstDspth";
    String serviceKey = "serviceKey=mcPOMk6d6ZIiWSfWF0W2X%2B49iH6SeYJyMG61uC1PfEVTWQC7rAepSWCYXt%2F3Rlb5MM2YGP92o28i5qupEEC6WA%3D%3D";
    String searchDate = "searchDate=" +LocalDate.now().toString();
    String informCode = "InformCode=PM10";
    String returnType = "_returnType=json";

    StringBuilder result = new StringBuilder();
    BufferedReader bufferedReader = null;

    URL url = new URL(path + "?"
        + serviceKey + "&"
        + searchDate + "&"
        + informCode + "&"
        + returnType);

    HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
    urlConnection.setRequestMethod("GET");

    bufferedReader = new BufferedReader(new InputStreamReader(urlConnection.getInputStream(), StandardCharsets.UTF_8));
    String line;
    while ((line = bufferedReader.readLine()) != null) {
      result.append(line);
    }
    return new ResponseEntity<>(new ApiResponse(SuccessMessages.SUCCESS, result.toString()), HttpStatus.OK);
  }
}
