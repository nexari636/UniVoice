 /*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.api.apiamic.websocketconfig;

import static com.api.apiamic.ApiamicApplication.DEPLOY_PROJECT;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketTransportRegistration;
import org.springframework.web.socket.server.standard.ServerEndpointExporter;
import org.springframework.web.socket.server.standard.ServletServerContainerFactoryBean;

/**
 *
 * @author Jhon (TheBlack)
 */
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer
{    
    @Bean
    public ServletServerContainerFactoryBean createWebSocketContainer() {
        ServletServerContainerFactoryBean container = new ServletServerContainerFactoryBean();
        container.setMaxTextMessageBufferSize(10 * 1024 * 1024);
        container.setMaxBinaryMessageBufferSize(10 * 1024 * 1024);
        return container;
    }
    
    private TaskScheduler messageBrokerTaskScheduler;
    
    @Autowired
    public void setMessageBrokerTaskScheduler(@Lazy TaskScheduler taskScheduler) {
            this.messageBrokerTaskScheduler = taskScheduler;
    }
    
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {

        registry.enableStompBrokerRelay("/topic","/queue")
                .setRelayHost("localhost") //local: localhost || server: rabbitamic
                .setRelayPort(15678) //local: 15678 || server: 61613
                .setClientLogin("jhon")
                .setClientPasscode("123")
                .setSystemLogin("jhon")
                .setSystemPasscode("123");
                
        registry.setApplicationDestinationPrefixes("/app"); //ruta principal de controladores
        registry.setUserDestinationPrefix("/user"); //implicita para convertAndSendToUser
                
        WebSocketMessageBrokerConfigurer.super.configureMessageBroker(registry);
    }

    @Override
    public void configureWebSocketTransport(WebSocketTransportRegistration registration) {
        registration.setMessageSizeLimit(500 * 1024 * 1024); 
        registration.setSendBufferSizeLimit(500 * 1024 * 1024); 
        registration.setSendTimeLimit(128 * 1024);
    }
    
    
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/api-socket")
                .setAllowedOrigins("https://typically-rested-antelope.ngrok-free.app");
        WebSocketMessageBrokerConfigurer.super.registerStompEndpoints(registry); 
    }    
}
