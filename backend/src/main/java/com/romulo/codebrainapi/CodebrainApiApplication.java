package com.romulo.codebrainapi;

import com.romulo.codebrainapi.repos.OperatorRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class CodebrainApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(CodebrainApiApplication.class, args);
	}

	@Bean
	CommandLineRunner runner(OperatorRepository operatorRepository) {
		return args -> {


		};
	}
}
