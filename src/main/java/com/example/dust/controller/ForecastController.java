package com.example.dust.controller;

import com.example.dust.bean.*;
import com.example.dust.message.SuccessMessages;
import com.example.dust.metadata.ApiKey;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/forecast")
public class ForecastController {

  public Map<String, String> transferCoord(String x, String y) throws Exception {
    log.info("### getCoord");

    URL url = new URL(ApiUrl.TRANSFER_COORDINATE + "?"
                      + ApiParams.X + x + "&"
                      + ApiParams.Y + y + "&"
                      + ApiParams.INPUT_COORD + "&"
                      + ApiParams.OUTPUT_COORD
    );

    log.info("### URL: {}", url);

    String responseFromOpenApi = ConnectionUtil.getResponseFromOpenAPi(url, ApiKey.TRANSFER_COORDINATE_KEY);
    log.info("### responseFromOpenApi: {}", responseFromOpenApi);

    Map<String, String> tmMap = new HashMap<>();
    tmMap.put("tmX", "244148.546388");
    tmMap.put("tmY", "412423.75772");

    return tmMap;
  }

  public String getStation() throws Exception {
    log.info("### getStation");

    String x = "127.0266961";
    String y = "37.575747";

    Map<String, String> tmMap = transferCoord(x, y);

    URL url = new URL(ApiUrl.STATION + "?"
                      + ApiParams.STATION_SERVICE_KEY + "&"
                      + ApiParams.TM_X + tmMap.get("tmX") + "&"
                      + ApiParams.TM_Y + tmMap.get("tmY") + "&"
                      + ApiParams.VER + "&"
                      + ApiParams.RETURN_TYPE_JSON
    );

    log.info("### URL: {}", url);

    String responseFromOpenApi = ConnectionUtil.getResponseFromOpenAPi(url, ApiKey.TRANSFER_COORDINATE_KEY);
    log.info("### responseFromOpenApi: {}", responseFromOpenApi);

    return "종로구";
  }

  @GetMapping("/dust-status")
  public ResponseEntity<ApiResponse> dustStatus() throws Exception {
    log.info("### info dustStatus");

    URL url = new URL(ApiUrl.DUST_STATUS + "?"
                      + ApiParams.FORECAST_SERVICE_KEY + "&"
                      + ApiParams.NUM_OF_ROWS + "25" + "&"
                      + ApiParams.PAGE_NO + "1" + "&"
                      + ApiParams.STATION_NAME + getStation() + "&"
                      + ApiParams.DATA_TERM + "&"
                      + ApiParams.VERSION + "&"
                      + ApiParams.RETURN_TYPE_JSON
    );
    log.info("### URL: {}", url);

    String responseFromOpenApi = ConnectionUtil.getResponseFromOpenAPi(url);

    ObjectMapper objectMapper = new ObjectMapper();
    objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    List<DustStatusData> dustStatus = objectMapper.readValue(responseFromOpenApi, DustStatus.class).getList();
    return new ResponseEntity<>(new ApiResponse(SuccessMessages.SUCCESS, dustStatus), HttpStatus.OK);
  }

  @GetMapping
  public ResponseEntity<ApiResponse> forecast() throws IOException {

    URL url = new URL(ApiUrl.FORECAST + "?"
                      + ApiParams.FORECAST_SERVICE_KEY + "&"
                      + ApiParams.SEARCH_DATE + "&"
                      + ApiParams.INFORM_CODE + "&"
                      + ApiParams.RETURN_TYPE_JSON
    );

    String responseFormOpenApi = ConnectionUtil.getResponseFromOpenAPi(url);

    ObjectMapper objectMapper = new ObjectMapper();
    objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    List<ForecastData> forecast = objectMapper.readValue(responseFormOpenApi, Forecast.class).getTodayForecast();
    return new ResponseEntity<>(new ApiResponse(SuccessMessages.SUCCESS, forecast), HttpStatus.OK);
  }
}
