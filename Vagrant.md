# Vagrant

### 1. 가상머신

- **가상의 데스크탑**
- VirtualBox**, **VMware



##### 1) VirtualBox 설치

- https://www.virtualbox.org/wiki/Downloads

---

### 2. Vagrant

- 가상머신을 편리하게 사용할 수 있도록 도와주는 프로그램
- 누군가가 **Vagrant**로 설정해 놓은 **가상머신 Box**를 간단한 명령어로 쉽게 설치 가능
- **가상 머신**과 **호스트 머신**과의 환경설정도 쉽게 할 수 있습니다.



##### 1) Vagrant 설치

- https://www.vagrantup.com/downloads.html



##### 2) 가상머신 추가

- 미리 설정해 놓은 **Vagrant Box** :  [Vagrant Cloud 웹사이트](https://app.vagrantup.com/boxes/search)에서 검색



###### **Vagrant**를 이용하여 가상머신을 추가

```bash
vagrant init ubuntu xenial
```

- `Vagrantfile`를 생성 : 가장 기본적인 vagrant의 설정파일



###### 웹 서버를 사용하기 위한 설정

- 먼저 호스트머신으로 접속한 port(8080)를 가상머신의 port(80)로 전달

  ```
    config.vm.network "forwarded_port", guest: 80, host: 8080
  ```

  ​

- 가상머신의 아이피주소를 설정

  ```
    config.vm.network "private_network", ip: "192.168.33.10"
  ```

  ​

##### 3) 가상머신 실행

```bash
 vagrant up --provider virtualbox
```



##### 4) 가상머신 접속(로그인)

```bash
 vagrant ssh
```

