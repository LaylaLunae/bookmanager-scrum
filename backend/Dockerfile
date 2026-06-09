# Étape 1 : Build de l'application avec Gradle
FROM gradle:8-jdk17 AS build
WORKDIR /app
COPY --chown=gradle:gradle . .
RUN gradle bootJar --no-daemon

# Étape 2 : Exécution de l'application
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar

# Port par défaut de Spring Boot
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]