package com.example.dust;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.ApplicationPidFileWriter;

@SpringBootApplication
public class DustApplication {

  public static void main(String[] args) {
    SpringApplicationBuilder app = new SpringApplicationBuilder(DustApplication.class);
    app.build().addListeners(new ApplicationPidFileWriter("./bin/shutdown.pid"));
    app.run();
  }
}
