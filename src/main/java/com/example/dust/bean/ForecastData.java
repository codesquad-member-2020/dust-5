package com.example.dust.bean;

import lombok.Getter;
import lombok.Setter;

@Setter
public class ForecastData {
  @Getter
  private String dataTime;
  @Getter
  private String informCause;
  @Getter
  private String informGrade;
  @Getter
  private String informOverall;
  @Getter
  private String informData;
  private String imageUrl1;
  private String imageUrl2;
  private String imageUrl3;
  private String[] imageList;

  public String[] getImageList() {
    return new String[]{ imageUrl1, imageUrl2, imageUrl3 };
  }
}
