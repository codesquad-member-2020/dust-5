package com.example.dust.controller;

import com.example.dust.bean.ApiResponse;
import com.example.dust.bean.Forecast;
import com.example.dust.bean.ForecastData;
import com.example.dust.message.SuccessMessages;
import com.example.dust.metadata.ApiParams;
import com.example.dust.metadata.ApiUrl;
import com.example.dust.util.ConnectionUtil;
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
import java.util.List;

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

    URL url = new URL(ApiUrl.DUST_STATUS + "?"
        + ApiParams.FORECAST_SERVICE_KEY + "&"
        + ApiParams.STATION_NAME + "&"
        + ApiParams.DATA_TERM + "&"
        + ApiParams.VERSION + "&"
        + ApiParams.RETURN_TYPE
    );
    log.info("### URL: {}", url);

    String responseFromOpenApi = ConnectionUtil.getResponseFromOpenAPi(url);

    ObjectMapper objectMapper = new ObjectMapper();
    objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    Forecast forecast = objectMapper.readValue(responseFromOpenApi, Forecast.class);
    return new ResponseEntity<>(new ApiResponse(SuccessMessages.SUCCESS, forecast.getList()), HttpStatus.OK);
  }

  @GetMapping
  public ResponseEntity<ApiResponse> forecast() throws IOException {

    URL url = new URL(ApiUrl.FORECAST + "?"
                      + ApiParams.FORECAST_SERVICE_KEY + "&"
                      + ApiParams.SEARCH_DATE + "&"
                      + ApiParams.INFORM_CODE + "&"
                      + ApiParams.RETURN_TYPE
    );

    String responseFormOpenApi = ConnectionUtil.getResponseFromOpenAPi(url);

    ObjectMapper objectMapper = new ObjectMapper();
    objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    List<ForecastData> forecast = objectMapper.readValue(responseFormOpenApi, Forecast.class).getTodayForecast();
    return new ResponseEntity<>(new ApiResponse(SuccessMessages.SUCCESS, forecast), HttpStatus.OK);
  }
}
