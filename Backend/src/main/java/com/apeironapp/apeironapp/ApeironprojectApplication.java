package com.apeironapp.apeironapp;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class ApeironprojectApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApeironprojectApplication.class, args);
	}
}