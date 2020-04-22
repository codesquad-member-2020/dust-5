package com.example.dust;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.ApplicationPidFileWriter;

import javax.annotation.PostConstruct;
import java.time.LocalDate;
import java.util.TimeZone;

@SpringBootApplication
public class DustApplication {

  @PostConstruct
  public void started() {
    TimeZone.setDefault(TimeZone.getTimeZone("Seoul/Asia"));
  }

  public static void main(String[] args) {
    SpringApplicationBuilder app = new SpringApplicationBuilder(DustApplication.class);
    app.build().addListeners(new ApplicationPidFileWriter("./bin/shutdown.pid"));
    app.run();
  }
}
