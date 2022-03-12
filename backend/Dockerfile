FROM openjdk:11
LABEL maintainer="Rômulo Lobo"
ADD target/codebrain-api-0.0.1-SNAPSHOT.jar codebrain-spring-docker.jar
ENTRYPOINT ["java", "-jar", "codebrain-spring-docker.jar"]
