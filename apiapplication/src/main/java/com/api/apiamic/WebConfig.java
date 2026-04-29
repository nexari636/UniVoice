/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.api.apiamic;

import static com.api.apiamic.ApiamicApplication.DEPLOY_PROJECT;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 *
 * @author Jhon (TheBlack)
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        if(DEPLOY_PROJECT)
        {
            System.out.println("Creando enlaces publicos de directorios");
            registry.addResourceHandler("/datatemp/**").addResourceLocations("file:/dataapi/static/datatemp/");
            registry.addResourceHandler("/fotosperfil/**").addResourceLocations("file:/dataapi/static/fotosperfil/");
        }else{
            System.out.println("No se crearan enlaces publicos de directorios porque esta en modo debug");
        }
    }
}
