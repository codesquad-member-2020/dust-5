package com.example.dust.controller;

import com.example.dust.bean.ApiResponse;
import com.example.dust.bean.Forecast;
import com.example.dust.message.SuccessMessages;
import com.example.dust.util.UrlBuilder;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/forecast")
public class ForecastController {

  public String getStation() {
    log.debug("### getStation");

    return "종로구";
  }

  @GetMapping("/dust-status")
  public ResponseEntity<ApiResponse> dustStatus() throws Exception {
    log.info("### info dustStatus");

    Map<String, String> apiParameters = new HashMap<>();

    apiParameters.put("numOfRows", "10");
    apiParameters.put("pageNo", "1");
    apiParameters.put("stationName", "종로구");
    apiParameters.put("dataTerm", "DAILY");
    apiParameters.put("ver", "1.3");
    apiParameters.put("_returnType", "json");

    URL url = new URL(UrlBuilder.dustStatus(apiParameters));
    log.info("### URL: {}", url);

    HttpURLConnection conn = (HttpURLConnection) url.openConnection();

    conn.setRequestMethod("GET");
    conn.setRequestProperty("Content-type", "application/json");

    log.info("### Response code: {}", conn.getResponseCode());

    BufferedReader rd;
    if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
      rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
    } else {
      rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
    }

    StringBuilder result = new StringBuilder();
    String line;

    while ((line = rd.readLine()) != null) {
      result.append(line);
    }

    rd.close();
    conn.disconnect();

    ObjectMapper objectMapper = new ObjectMapper();
    objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    Forecast forecast = objectMapper.readValue(result.toString(), Forecast.class);
    return new ResponseEntity<>(new ApiResponse(SuccessMessages.SUCCESS, forecast.getList()), HttpStatus.OK);
  }

  @GetMapping
  public ResponseEntity<ApiResponse> forecast() throws IOException {
    String path = "http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getMinuDustFrcstDspth";
    String serviceKey =
        "serviceKey=mcPOMk6d6ZIiWSfWF0W2X%2B49iH6SeYJyMG61uC1PfEVTWQC7rAepSWCYXt%2F3Rlb5MM2YGP92o28i5qupEEC6WA%3D%3D";
    String searchDate = "searchDate=" + LocalDate.now().toString();
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

    bufferedReader =
        new BufferedReader(new InputStreamReader(urlConnection.getInputStream(), StandardCharsets.UTF_8));
    String line;
    while ((line = bufferedReader.readLine()) != null) {
      result.append(line);
    }

    ObjectMapper objectMapper = new ObjectMapper();
    objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    Forecast forecast = objectMapper.readValue(result.toString(), Forecast.class);
    return new ResponseEntity<>(new ApiResponse(SuccessMessages.SUCCESS, forecast.getList()), HttpStatus.OK);
  }
}
