#etapa inicial
FROM rabbitmq:4.0-rc-management
RUN mkdir -p /home/app
WORKDIR /home/app

#nueva etapa
FROM openjdk:19-jdk-alpine
COPY jar/apiamic.jar apiamic.jar
ENTRYPOINT ["java","-jar","apiamic.jar"]