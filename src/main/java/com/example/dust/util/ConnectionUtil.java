package com.example.dust.util;

import lombok.extern.slf4j.Slf4j;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;

@Slf4j
public class ConnectionUtil {

  public static String getResponseFromOpenAPi(URL url) throws IOException {
    HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
    urlConnection.setRequestMethod("GET");

    BufferedReader bufferedReader =
        new BufferedReader(new InputStreamReader(urlConnection.getInputStream(), StandardCharsets.UTF_8));

    String line;
    StringBuilder result = new StringBuilder();

    while ((line = bufferedReader.readLine()) != null) {
      result.append(line);
    }

    bufferedReader.close();
    urlConnection.disconnect();

    return result.toString();
  }

  public static String getResponseFromOpenAPi(URL url, String apikey) throws IOException {
    HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
    urlConnection.setRequestMethod("GET");
    urlConnection.setRequestProperty("Authorization", "KakaoAK " + apikey);

    BufferedReader bufferedReader =
        new BufferedReader(new InputStreamReader(urlConnection.getInputStream(), StandardCharsets.UTF_8));

    String line;
    StringBuilder result = new StringBuilder();

    while ((line = bufferedReader.readLine()) != null) {
      result.append(line);
    }

    bufferedReader.close();
    urlConnection.disconnect();

    return result.toString();
  }
}
