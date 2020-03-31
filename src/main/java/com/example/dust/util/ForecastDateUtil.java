package com.example.dust.util;

import java.time.LocalDate;
import java.time.LocalTime;

public class ForecastDateUtil {
  public static LocalDate setForecastDate() {
    LocalTime now = LocalTime.now();
    if (now.isAfter(LocalTime.MIDNIGHT) && now.isBefore(LocalTime.of(5,0))) {
      return LocalDate.now().minusDays(1);
    }
    return LocalDate.now();
  }
}
