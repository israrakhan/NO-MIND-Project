package com.organization.NoMindF;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;


@SpringBootApplication
@EnableScheduling
public class NoMindFApplication {

	private static final Logger logger = LogManager.getLogger(NoMindFApplication.class);

	public static void main(String[] args) {

		logger.info("Application is starting...");
		logger.warn("This is a warning message!");
		logger.error("This is an error message test!");
		SpringApplication.run(NoMindFApplication.class, args);
		logger.info("Application started successfully!");

	}

}
