package com.example.dust.util;

import com.example.dust.metadata.ApiKey;
import com.example.dust.metadata.ApiUrl;

import java.util.Map;

public class UrlBuilder {

  public static String dustStatus(Map<String, String> apiParameters) {
    StringBuilder urlBuilder = new StringBuilder(ApiUrl.dustStatus);
    urlBuilder.append("?ServiceKey=").append(ApiKey.forecastKey);

    for (String key : apiParameters.keySet()) {
      urlBuilder.append("&").append(key).append("=").append(apiParameters.get(key));
    }

    return urlBuilder.toString();
  }
}
