package com.example.dust.controller;

import com.example.dust.bean.*;
import com.example.dust.message.SuccessMessages;
import com.example.dust.metadata.ApiKey;
import com.example.dust.metadata.ApiParams;
import com.example.dust.metadata.ApiUrl;
import com.example.dust.util.ConnectionUtil;
import com.example.dust.util.ForecastDateUtil;
import com.example.dust.util.LocationConverter;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.net.URL;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/forecast")
public class ForecastController {

  @GetMapping
  public ResponseEntity<ApiResponse> forecast() throws IOException {

    URL url = new URL(ApiUrl.FORECAST + "?"
        + ApiParams.FORECAST_SERVICE_KEY + "&"
        + ApiParams.SEARCH_DATE + ForecastDateUtil.setForecastDate() + "&"
        + ApiParams.INFORM_CODE + "&"
        + ApiParams.RETURN_TYPE_JSON
    );

    ObjectMapper objectMapper = new ObjectMapper();
    objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

    String responseFormOpenApi = ConnectionUtil.getResponseFromOpenAPi(url);
    List<ForecastData> forecast = objectMapper.readValue(responseFormOpenApi, Forecast.class).getTodayForecast();
    return new ResponseEntity<>(new ApiResponse(SuccessMessages.SUCCESS, forecast), HttpStatus.OK);
  }

  @GetMapping("/dust-status")
  public ResponseEntity<ApiResponse> dustStatus() throws Exception {
    log.info("### info dustStatus");

    URL url = new URL(ApiUrl.DUST_STATUS + "?"
                      + ApiParams.FORECAST_SERVICE_KEY + "&"
                      + ApiParams.NUM_OF_ROWS + "&"
                      + ApiParams.PAGE_NO + "&"
                      + ApiParams.STATION_NAME + LocationConverter.getStation() + "&"
                      + ApiParams.DATA_TERM + "&"
                      + ApiParams.VERSION + "&"
                      + ApiParams.RETURN_TYPE_JSON
    );
    log.info("### URL: {}", url);

    ObjectMapper objectMapper = new ObjectMapper();
    objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

    String responseFromOpenApi = ConnectionUtil.getResponseFromOpenAPi(url);
    List<DustStatusData> dustStatus = objectMapper.readValue(responseFromOpenApi, DustStatus.class).getList();
    return new ResponseEntity<>(new ApiResponse(SuccessMessages.SUCCESS, dustStatus), HttpStatus.OK);
  }
}
