package com.example.dust.metadata;

import java.time.LocalDate;

public class ApiParams {
  public static final String FORECAST_SERVICE_KEY = "ServiceKey=" + ApiKey.FORECAST_KEY;
  public static final String RETURN_TYPE = "_returnType=json";

  //대기예보
  public static final String SEARCH_DATE = "searchDate=" + LocalDate.now().toString();
  public static final String INFORM_CODE = "InformCode=PM10";

  //미세먼지
  public static final String STATION_NAME = "stationName=종로구";
  public static final String DATA_TERM = "dataTerm=DAILY";
  public static final String VERSION = "ver=1.3";
}
