# Docker Swarm 
2개 이상의 인스턴스(컴퓨터)의 컨테이너를 관리하는 기술
- Docker swarm
- Kubernates(사실상 표준)

--- 
AWS EC2에서 인스턴스 2개를 생성해 이름을 각각 manager node와 worker node로 지정해준다.

## Manager node
업데이트
> sudo yum install -y update  
> sudo reboot

재접속 후 Docker 설치
> sudo yum install -y docker

Docker 시작
> sudo systemctl start docker  
> (sudo service docker start  
   sudo /etc/init.d/docker start는 이전 명령어)	

> sudo systemctl enable docker.service  
> (reboot하고 재접속했을 경우, 부팅시퀀스에 등록해서 service를 자동으로 시작하게 하는 명령

현재 유저 docker그룹에 추가하여 권한 부여
> sudo usermod -aG docker $USER

exit 후 재접속하여 container 목록확인
> docker ps
￼

swarm 초기화
> docker swarm init  
(이 메세지를 모르고 없앴을 때는
docker swarm leave --force 한 후, 다시 docker swarm init)
위의 명령을 worker node에서 실행

실행중인 서비스 목록 확인 (docker ps 대신)
> docker service ls

이미지로부터 service 생성
> docker service create --name hello-server -p 3000:3000 jhn9592/hello-server  
> docker service ls

서비스 상세 정보 확인
> docker service inspect hello-server

서버가 잘 돌아가는지 터미널에서 확인
> curl 127.0.0.1:3000

container를 4개로 늘리기  
> docker service scale hello-server=4
￼

## Worker node
> sudo yum update -y  
> sudo yum install -y docker  
> sudo usermod -aG docker $USER  
> sudo systemctl enable docker.service  
> sudo reboot  
> docker ps  
> docker swarm join --token {토큰} (manager node에서 swarm init해서 나온 명령 중 위에 것)
￼

## EC2
로드밸런서를 생성한다. (Application Load Balancer 생성 - 맨 처음거)  
1. 이름(hello-elb) 설정 후, 리스너에 HTTPS를 추가하고, 가용영역은 전체선택한다.
2. ACM에서 인증서 선택, 보안정책은 ELBSecurityPolicy-TLS-1-2-Ext-2018-06 선택
3. 보안 그룹 이름(hello-elb-sg) 설정 후 다음
4. 이름(hello-tg)과 포트(3000) 설정 후 다음
5. 대상 등록에 worker node와 manager node 둘 다 선택
	(위 과정에서 대상 등록이 제대로 안되면 hello.hannahi.xyz 접속했을 때 503에러 나므로 대상등록 추가!)
6. 생성


## Route53
Created Record Set해서
hello.hannahi.xyz - A 로 Alias-yes로 위에서 만들었던 hello-elb로 설정한다.  
터미널에서 nslookup hello.hannahi.xyz으로 페이지 확인


# 이미지 업데이트하기

## Mac terminal
서버 코드 있는 디렉토리에서 
버전을 바꾼 후 재빌드해서 tag설정해서 기존 docker hub 리포지토리에 있는 이미지를  업데이트한다.
> docker build -t jhn9592/hello-server .  
> docker tag jhn9592/hello-server jhn9592/hello-server:1.0.4  
> docker login  (push가 denied되면)  
> docker push jhn9592/hello-server:1.0.4  


## Manager node
업데이트한 이미지 다운받기
> docker pull jhn9592/hello-server:1.0.4  
> docker service update --image jhn9592/hello-server:1.0.4   hello-server  

```curl 127.0.0.1:3000```로 확인 또는 hello.hannahi.xyz에서 버전이 바뀌었는지 확인