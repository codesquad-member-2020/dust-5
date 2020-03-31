package com.example.dust.controller;

import com.example.dust.bean.ApiResponse;
import com.example.dust.bean.Forecast;
import com.example.dust.bean.ForecastData;
import com.example.dust.message.SuccessMessages;
import com.example.dust.metadata.ApiParams;
import com.example.dust.metadata.ApiUrl;
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
import java.util.List;
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

    URL url = new URL(ApiUrl.FORECAST + "?"
                      + ApiParams.SERVICE_KEY + "&"
                      + ApiParams.SEARCH_DATE + "&"
                      + ApiParams.INFORM_CODE + "&"
                      + ApiParams.RETURN_TYPE
    );

    HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
    urlConnection.setRequestMethod("GET");

    BufferedReader bufferedReader =
        new BufferedReader(new InputStreamReader(urlConnection.getInputStream(), StandardCharsets.UTF_8));

    String line;
    StringBuilder result = new StringBuilder();

    while ((line = bufferedReader.readLine()) != null) {
      result.append(line);
    }

    ObjectMapper objectMapper = new ObjectMapper();
    objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    List<ForecastData> forecast = objectMapper.readValue(result.toString(), Forecast.class).getTodayForecast();
    return new ResponseEntity<>(new ApiResponse(SuccessMessages.SUCCESS, forecast), HttpStatus.OK);
  }
}
