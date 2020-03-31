package com.example.dust.bean;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

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
    return new String[]{this.imageUrl1, this.imageUrl2, this.imageUrl3, this.imageUrl4, this.imageUrl5, this.imageUrl6};
  }
}
