package com.example.dust.bean;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class Forecast {
  @Getter
  @Setter
  private List<ForecastData> list;
  private List<ForecastData> todayForecast = new ArrayList<>();

  public List<ForecastData> getTodayForecast() {
    for (ForecastData forecastData: list) {
      if (forecastData.getInformData().equals(LocalDate.now().toString())) {
        todayForecast.add(forecastData);
      }
    }
    return todayForecast;
  }
}
