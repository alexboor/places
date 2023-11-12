package im.sta.places.config;

import org.springframework.web.filter.CorsFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;


@Configuration
@EnableWebMvc
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost")
                .allowedMethods("GET", "POST")
                .allowCredentials(true).maxAge(3600);
    }
}
//public class CorsConfig {
//
////    @Bean
////    public WebMvcConfigurer corsConfigurer() {
////        return new WebMvcConfigurer() {
////            @Override
////            public void addCorsMappings(CorsRegistry registry) {
////                registry.addMapping("/**").allowedOrigins("*");
////
//////                WebMvcConfigurer.super.addCorsMappings(registry);
////            }
////        };
////    }
//
////    @Bean
////    CorsFilter corsFilter() {
////        CorsConfiguration corsConfiguration = new CorsConfiguration();
////
////        corsConfiguration.setAllowCredentials(true);
////        corsConfiguration.setAllowedOrigins(List.of("http://localhost:3000"));
////
////        corsConfiguration.setAllowedHeaders(
////                List.of(
////                        "Origin",
////                        "Access-Control-Allow-Origin",
////                        "Content-Type",
////                        "Accept",
////                        "Authorization",
////                        "Origin, Accept",
////                        "X-Requested-With",
////                        "Access-Control-Request-Method",
////                        "Access-Control-Request-Headers"
////                )
////        );
////
////        corsConfiguration.setExposedHeaders(
////                List.of(
////                        "Origin",
////                        "Content-Type",
////                        "Accept",
////                        "Authorization",
////                        "Access-Control-Allow-Origin",
////                        "Access-Control-Allow-Credentials"
////                )
////        );
////
////        var urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
////
////        urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
////
////        return new CorsFilter(urlBasedCorsConfigurationSource);
////    }
//
//
//}

