package com.example.dust.util;

import java.time.LocalDate;
import java.time.LocalTime;

public class ForecastDateUtil {
  public static LocalDate setForecastDate() {
    final int TIME_DIFFERENCE = 9;
    final int FORECAST_START_TIME = 5;
    LocalTime now = LocalTime.now().plusHours(TIME_DIFFERENCE);
    if (now.isAfter(LocalTime.MIDNIGHT) && now.isBefore(LocalTime.of(FORECAST_START_TIME,0))) {
      return LocalDate.now().minusDays(1);
    }
    return LocalDate.now();
  }
}
