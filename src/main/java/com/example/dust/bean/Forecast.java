package com.example.dust.bean;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Forecast {
  @Getter
  @Setter
  private List<ForecastData> list;
  private List<ForecastData> todayForecast = new ArrayList<>();

  public ForecastData getTodayForecast() {
    for (ForecastData forecastData: list) {
      if (forecastData.getInformData().equals(LocalDate.now().toString())) {
        todayForecast.add(forecastData);
      }
    }
    return todayForecast.get(0);
  }
}
