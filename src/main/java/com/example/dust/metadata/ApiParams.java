package com.example.dust.metadata;

import java.time.LocalDate;

public class ApiParams {
  //대기예보
  public static final String SERVICE_KEY = "ServiceKey=" + ApiKey.FORECAST_KEY;
  public static final String RETURN_TYPE = "_returnType=json";
  public static final String SEARCH_DATE = "searchDate=" + LocalDate.now().toString();
  public static final String INFORM_CODE = "InformCode=PM10";
}
