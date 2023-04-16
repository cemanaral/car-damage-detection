package net.damagewiz.damagewizweb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class DamagewizWebApplication {

	public static void main(String[] args) {
		SpringApplication.run(DamagewizWebApplication.class, args);
	}

}

/*@SpringBootApplication
public class DamagewizWebApplication {
	public static void main(String[] args) {
		final ApplicationContext ctx = SpringApplication.run(DamagewizWebApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurerAdapter() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowedOrigins("http://localhost:3000");
			}
		};
	}
}*/
