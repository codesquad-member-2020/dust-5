package com.example.dust.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;

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
}
