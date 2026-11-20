package com.organization.NoMindF.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Serve uploaded files (programs, gallery, etc.) from the local uploads/ directory
        registry.addResourceHandler("/api/v1/uploads/**")
                .addResourceLocations("file:uploads/");
    }
}
