----------------------------------------------------------------------------
==========================FRONT_END========================================
-----------------------------------------------------------------------------
Step 1: created a dockerfile for frontend
-------------------------------------------


FROM node:24-bookworm-slim AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

COPY . .
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

-------------------------------------------------------------------

Step 2: created nginx.conf /no_mind_fe/cat nginx.conf file and added it to the path using dockerfile
----------------------------------------------------------

server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;
    location / {
        try_files $uri $uri/ /index.html;
    }
}

----------------------------------------------------------------
Step 3 created .dockerignore to ignore the unwanted files to add in docker image
-----------------------------------------------------------------------------

node_modules
dist
.git
.env
.env.*
!.env.example
npm-debug.log*

---------------------------------------------------------

step 4 : Image creation of FE.

---------------------------------------------------

docker build -t no_mind_fe .

---------------------------------------------------

step 5: run the container using image

-----------------------------------------------------

docker run -d --name no-mind-fe --restart unless-stopped -p 80:80 no_mind_fe

------------------------------------------------------------------------------


==================================================FRONT-END PART ENDS HERE=============================================================


----------------------------------------------------------------------------------------------------------------------------------------
==================================================BACK-END PART BEGINS==================================================================
----------------------------------------------------------------------------------------------------------------------------------------


Step 1:- 1. Locate the backend folder and its configuration
cd ~/NO-MIND-Project
find . -maxdepth 5 -type f \( -name pom.xml -o -name application.properties -o -name application.yml -o -name application.yaml \) -print


----------------------------------------------------------------------------------------------------------------------------------------

Step 2:- Dockerfile for backend

---------------------------------------------------------------------------------------------------------------------------------------

FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn -B package -DskipTests

FROM eclipse-temurin:21-jre-jammy
WORKDIR /app

COPY --from=build --chown=10001:10001 /app/target/*.jar /app/app.jar
RUN mkdir -p /app/uploads && chown 10001:10001 /app/uploads
USER 10001:10001
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]


----------------------------------------------------------------------------------------------------------------------------------------

Step 3:- Added .dockerignore

----------------------------------------------------------------------------------------------------------------------------------------

target/
.git/
.env
.env.*

----------------------------------------------------------------------------------------------------------------------------------------

Step 4: Shows the Credential present in .properties file for backend configuration

----------------------------------------------------------------------------------------------------------------------------------------

cd ~/NO-MIND-Project/NoMind_BE-main

sed -E 's/^([^=]*(password|secret|token|key)[^=]*=).*/\1<REDACTED>/I' \
  src/main/resources/application.properties

----------------------------------------------------------------------------------------------------------------------------------------

Step 5: giving the user 10001 permission to  render the upload file to specific path

----------------------------------------------------------------------------------------------------------------------------------------

RUN mkdir -p /app/uploads && chown 10001:10001 /app/uploads

----------------------------------------------------------------------------------------------------------------------------------------

Step 6:Create .env in NoMind_BE-main create this using AI as this file was not present in backend directory

----------------------------------------------------------------------------------------------------------------------------------------

MYSQL_DATABASE=nomind_db
MYSQL_USER=nomind_app
MYSQL_PASSWORD=$(openssl rand -hex 32)
MYSQL_ROOT_PASSWORD=$(openssl rand -hex 32)
JWT_SECRET=$(openssl rand -hex 32)
ALLOWED_ORIGINS=http://52.66.206.190
SPRING_PROFILE=dev

----------------------------------------------------------------------------------------------------------------------------------------

Step 7 :- created docker compose file for backend

----------------------------------------------------------------------------------------------------------------------------------------

services:
  db:
    image: mysql:8.4
    restart: unless-stopped
    environment:
      MYSQL_DATABASE: ${MYSQL_DATABASE}
      MYSQL_USER: ${MYSQL_USER}
      MYSQL_PASSWORD: ${MYSQL_PASSWORD}
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
    volumes:
      - mysql_data:/var/lib/mysql
    healthcheck:
      test:
        [
          "CMD-SHELL",
          "mysqladmin ping -h 127.0.0.1 -uroot -p\"$${MYSQL_ROOT_PASSWORD}\" --silent"
        ]
      interval: 10s
      timeout: 5s
      retries: 12
      start_period: 30s

  backend:
    build: .
    image: no_mind_be:latest
    restart: unless-stopped
    depends_on:
      db:
        condition: service_healthy
    ports:
      - "8081:8080"
    environment:
      SERVER_PORT: "8080"
      SPRING_PROFILE: ${SPRING_PROFILE}
      SPRING_DATASOURCE_URL: jdbc:mysql://db:3306/${MYSQL_DATABASE}
      SPRING_DATASOURCE_USERNAME: ${MYSQL_USER}
      SPRING_DATASOURCE_PASSWORD: ${MYSQL_PASSWORD}
      SPRING_JPA_HIBERNATE_DDL_AUTO: update
      JWT_SECRET: ${JWT_SECRET}
      ALLOWED_ORIGINS: ${ALLOWED_ORIGINS}
      FILE_UPLOAD_DIR: /app/uploads
      DEBUG: "false"
    volumes:
      - backend_uploads:/app/uploads

volumes:
  mysql_data:
  backend_uploads:

----------------------------------------------------------------------------------------------------------------------------------------

Step 8 :- Build image and run it using docker compose 

----------------------------------------------------------------------------------------------------------------------------------------

docker compose up --build -d
docker compose ps
docker compose logs --tail=100 backend

----------------------------------------------------------------------------------------------------------------------------------------

Step 9:- Added This command before npm run build in Frontend dockerfile to connect frontend with backend 

----------------------------------------------------------------------------------------------------------------------------------------

ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

----------------------------------------------------------------------------------------------------------------------------------------

Step 10 : Rebuild the frontend image

----------------------------------------------------------------------------------------------------------------------------------------

cd ~/NO-MIND-Project/NoMind_FE-main
docker build --build-arg VITE_API_BASE_URL=http://52.66.206.190:8081/api/v1 -t no_mind_fe .

----------------------------------------------------------------------------------------------------------------------------------------

Step 11 : Running the frontend container again to render with new updated image

----------------------------------------------------------------------------------------------------------------------------------------

docker stop no-mind-fe
docker rm no-mind-fe
docker run -d --name no-mind-fe --restart unless-stopped -p 80:80 no_mind_fe

----------------------------------------------------------------------------------------------------------------------------------------
