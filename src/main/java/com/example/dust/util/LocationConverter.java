package com.example.dust.util;

import com.example.dust.bean.Coordinate;
import com.example.dust.bean.CoordinateData;
import com.example.dust.bean.Station;
import com.example.dust.bean.StationData;
import com.example.dust.metadata.ApiKey;
import com.example.dust.metadata.ApiParams;
import com.example.dust.metadata.ApiUrl;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;

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
  public static String getStation() throws Exception {
    log.info("### getStation");

    String x = "127.0266961";
    String y = "37.575747";

    Map<String, String> tmMap = transferCoordinationType(x, y);

    URL url = new URL(ApiUrl.STATION + "?"
                      + ApiParams.STATION_SERVICE_KEY + "&"
                      + ApiParams.TM_X + tmMap.get("tmX") + "&"
                      + ApiParams.TM_Y + tmMap.get("tmY") + "&"
                      + ApiParams.VER + "&"
                      + ApiParams.RETURN_TYPE_JSON
    );

    log.info("### URL: {}", url);

    String responseFromOpenApi = ConnectionUtil.getResponseFromOpenAPi(url, ApiKey.TRANSFER_COORDINATE_KEY);
    log.info("### getStation responseFromOpenApi: {}", responseFromOpenApi);

    ObjectMapper objectMapper = new ObjectMapper();
    objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    List<StationData> documents = objectMapper.readValue(responseFromOpenApi, Station.class).getList();
    log.info("### documents.get(0).getStationName(): {}", documents.get(0).getStationName());

    return documents.get(0).getStationName();
  }

  /**
   * Feat : WGS84 좌표를 TM 좌표로 전환
   * Desc :
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
    //    tmMap.put("tmX", "244148.546388");
    //    tmMap.put("tmY", "412423.75772");
    tmMap.put("tmX", documents.get(0).getX());
    tmMap.put("tmY", documents.get(0).getY());

    return tmMap;
  }
}
