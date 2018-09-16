# 숙제 - dockerhub에 docker 이미지를 업로드해서 인스턴스에서 실행할 수 있도록.

# 현재 이미지를 확인하는 명령
# $ docker images

# 이미지를 만드는 명령
# $ docker build -t  hannah/hello-server .
# 					 <account/project-name> <dockerfile path>

# 이미지로부터 컨테이너를 만들어서 실행하는 명령
# $ docker run --name hello-server \
#			-p 3000:3000 -d \
# 			hannah/hello-server

# 만들어진 컨테이너를 확인하는 명령
# $ docker ps -a
# 종료된 컨테이너를 삭제하는 명령
# $ docker rm <container-if or name>

# 종료된 컨테이너를 정지하는 명령
# $ docker stop <container-if or name>

# ------------------------------
# Docker Image 지정한다.

# Dockerhub
FROM node:10.10.0-alpine

# mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app

# cd /usr/src/app
WORKDIR /usr/src/app

# package.json 파일을 이미지에 복사
COPY package.json /usr/src/app

# npm install
RUN npm install
COPY . /usr/src/app

# ------------------------------
# CMD: 인스턴스가 생성된 후 수행할 명령
# npm run publish
EXPOSE 3000
CMD [ "npm", "run", "publish" ]