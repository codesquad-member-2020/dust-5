package com.example.dust.util;

import com.example.dust.metadata.ApiKey;
import com.example.dust.metadata.ApiParams;
import com.example.dust.metadata.ApiUrl;
import lombok.extern.slf4j.Slf4j;

import java.net.URL;
import java.util.HashMap;
import java.util.Map;

@Slf4j
public class LocationConverter {

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
    log.info("### responseFromOpenApi: {}", responseFromOpenApi);

    return "종로구";
  }

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

    Map<String, String> tmMap = new HashMap<>();
    tmMap.put("tmX", "244148.546388");
    tmMap.put("tmY", "412423.75772");

    return tmMap;
  }

}
