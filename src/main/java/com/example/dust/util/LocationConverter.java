package com.example.dust.util;

import com.example.dust.bean.Coordinate;
import com.example.dust.bean.CoordinateData;
import com.example.dust.bean.Station;
import com.example.dust.bean.StationData;
import com.example.dust.message.ErrorMessages;
import com.example.dust.metadata.ApiKey;
import com.example.dust.metadata.ApiParams;
import com.example.dust.metadata.ApiUrl;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;

import javax.validation.ConstraintViolationException;
import javax.validation.constraints.NotBlank;
import java.net.URL;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
public class LocationConverter {

  /**
   * Feat : 측정소 정보를 얻어옴
   * Desc : TM 정보를 기반으로 얻어옴
   * Return : 측정소 이름 String
   */
  public static String getStation(String x, String y) throws Exception {
    log.info("### getStation");

    Map<String, String> tmMap = transferCoordinationType(x, y);

    URL url = new URL(ApiUrl.STATION + "?"
                      + ApiParams.STATION_SERVICE_KEY + "&"
                      + ApiParams.TM_X + tmMap.get("tmX") + "&"
                      + ApiParams.TM_Y + tmMap.get("tmY") + "&"
                      + ApiParams.RETURN_TYPE_JSON
    );

    log.info("### URL: {}", url);

    String responseFromOpenApi = ConnectionUtil.getResponseFromOpenAPi(url, ApiKey.TRANSFER_COORDINATE_KEY);
    log.info("### getStation responseFromOpenApi: {}", responseFromOpenApi);

    ObjectMapper objectMapper = new ObjectMapper();
    objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    List<StationData> documents = objectMapper.readValue(responseFromOpenApi, Station.class).getList();

    for (StationData sd : documents) {
      log.info("### sd.getStationName(): {}", sd.getStationName());
    }

    return documents.get(0).getStationName();
  }

  /**
   * Feat : WGS84 좌표를 TM 좌표로 전환
   * Desc : Kakao 좌표변환 API 를 사용합니다.
   * Return : Map<String, String> 로 tmX, tmY 가 파라미터로 있습니다.
   */
  private static Map<String, String> transferCoordinationType(String x, String y) throws Exception {
    log.info("### getTransferGPSToTm");

    URL url = new URL(ApiUrl.TRANSFER_COORDINATE + "?"
                      + ApiParams.X + x + "&"
                      + ApiParams.Y + y + "&"
                      + ApiParams.INPUT_COORDINATION + "&"
                      + ApiParams.OUTPUT_COORDINATION
    );

    log.info("### URL: {}", url);

    String responseFromOpenApi = ConnectionUtil.getResponseFromOpenAPi(url, ApiKey.TRANSFER_COORDINATE_KEY);
    log.info("### responseFromOpenApi: {}", responseFromOpenApi);

    ObjectMapper objectMapper = new ObjectMapper();
    objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    List<CoordinateData> documents = objectMapper.readValue(responseFromOpenApi, Coordinate.class).getDocuments();
    log.info("### documents.get(0): {}", documents.get(0));

    Map<String, String> tmMap = new HashMap<>();
    tmMap.put("tmX", documents.get(0).getX());
    tmMap.put("tmY", documents.get(0).getY());

    if (tmMap.get("tmX").equals("NaN") || tmMap.get("tmY").equals("NaN")) {
      log.info("### ERROR: {}", ErrorMessages.TRANSFER_COORDINATION_TYPE);
      throw new ConstraintViolationException(ErrorMessages.TRANSFER_COORDINATION_TYPE, null);
    }

    return tmMap;
  }
}
