# MongoDB in AWS

https://docs.mongodb.com/manual/tutorial/install-mongodb-on-amazon/ 를 참고하여 MongoDB를 EC2내에 설치한다.
> sudo vi /etc/yum.repos.d/mongodb-org-4.0.repo
```
[mongodb-org-4.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/amazon/2/mongodb-org/4.0/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.0.asc
```
> 위 내용을 복사해서 붙여넣는다.  
> sudo yum update  
> sudo yum install -y mongodb-org

프로세스 자원한도를 변경한다.  
> ulimit -a
> sudo vi /etc/security/limits.conf
```
*                soft    fsize           unlimited
*                hard    fsize           unlimited
*                soft    cpu             unlimited
*                hard    cpu             unlimited
*                soft    as              unlimited
*                hard    as              unlimited
*                soft    memlock         unlimited
*                hard    memlock         unlimited
*                soft    nofile          64000
*                hard    nofile          64000
*                soft    nproc           64000
*                hard    nproc           64000
``` 
> 위 내용을 복사해서 붙여넣는다.  
> sudo reboot  
> ulimit -a  (변경된 것을 확인할 수 있다.)

MongoDB Compass 설치 (맥에서)
> brew search mongodb  
> brew cask install mongodb-compass

MongoDB를 EC2내에서 실행한다.
> sudo systemctl start mongod

AWS에서 보안그룹으로 27017 포트로 설정한 후 (소스는 위치무관) 생성하고, 인스턴스의 보안 그룹에 추가한다.  
  
외부에서 바인드되지 않게 설정되어 있으므로 설정파일을 변경한다.
> sudo vi /etc/mongod.conf  
> (#network interfaces 부분의 bindIp를 0.0.0.0으로 수정한다. (ec2에서 접근하기 위해서))

MongoDB를 재구동한다.
> sudo systemctl restart mongod

데이터베이스는 날라가면 안되는 중요한 부분이기 때문에 외부의 접근을 막는 3가지 방법이 있다.  
1. bindIp
2. 포트
3. 유저/비밀번호
  
포트를 바꾸기 위해서는 설정파일과 위에서 생성했던 보안 그룹의 인바운드 규칙에서 포트 번호를 원하는 포트 번호로 변경한다.
> sudo vi /etc/mongod.conf  
> (#network interfaces 부분의 port를 수정한다.)  

Compass에서도 ip와 포트를 입력하고 connect로 확인해볼 수 있다.  
  
MongoDB에 접속해본다.
> mongo --port {포트번호}  
> exit     // 종료

포트를 변경하는 것만으로는 보안이 약하기 때문에 db의 유저/비밀번호를 생성한다.
> sudo vi /etc/mongod.conf  
> (#security 부분을 주석 없애주고 밑에 줄에 스페이스2개 치고 ```authorization: enabled``` 입력)  
> mongo --port {포트번호}  
> use {db이름}  
> db.createUser({ user: "{유저}", pwd: "{비밀번호}", roles: [ "dbOwner" ] })  
> exit  
> sudo systemctl restart mongod  

Compass로 유저/패스워드 입력했을 때 연결이 잘 되나 확인한다.