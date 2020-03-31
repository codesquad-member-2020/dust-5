package com.example.dust.bean;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
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
  private String imageUrl4;
  private String imageUrl5;
  private String imageUrl6;
  private String[] imageList;

  public String[] getImageList() {
    return new String[]{ imageUrl1, imageUrl2, imageUrl3, imageUrl4, imageUrl5, imageUrl6 };
  }
}
