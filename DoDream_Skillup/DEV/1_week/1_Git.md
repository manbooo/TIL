## Git

- 형상 유지 관리
- 버전 관리
- https://legacy.gitbook.com/book/mylko72/git/details



### Why Github?

- 소스 코드 공유
- 병렬 개발
  - 단계적 개발은 시간 소요가 심하다
  - 동시에 여러 명이 개발해야 한다.
  - 동시 다발적이고 병렬적이여야 한다
- 변동 과정을 체계적으로 관리
  - 차이를 구별하기 어렵다
- 특정 시점 (Roll Back)
- 오픈 소스
- 범인 검거



### 실습

#### 0. 사전 실행

- [GIt bash 설치](https://git-scm.com/downloads)
- [GitHub 회원 가입](https://github.com/)



#### 1. 사용자 정보 설정

```bash
git config --global user.name "사용자 이름"
git config --global user.email "사용자 이메일"

# 확인
git config --get user.name
git config --get user.email
```



#### 2. 새로운 저장소 생성 

- [사용자 이름].github.io
- 바탕화면에 디렉토리 생성



#### 3. Git과 연동

```bash
git init
git remote add origin [Git 주소]
```



#### 4. Bootstrap Template

- https://startbootstrap.com/template-categories/all/

- 맘에 드는 템플릿을 골라서 만든 디렉토리에 복사 붙여넣기



#### 5. 저장소에 올리기

```bash
git add .
git commit -m "message"
git push origin master
```



#### 6. Git fork하기

- 강사님 저장소 fork
- setting > Collaborators 팀원들 추가
- git clone

```bash
git clone https://github.com/jjuya/DoDreamEdu.git
```



#### 7. [브랜치](https://backlog.com/git-tutorial/kr/stepup/stepup1_1.html)

```bash
# 브랜치 생성
git branch [브랜치 명]
# 브랜치 변경
git checkout [브랜치 명]
# 브랜치 확인
git branch
```

- 조원 이름 추가 : README.md
- 수정된 부분을 `git add, commit, push`



#### 8. Pull Request

- Pull requests 
- Comparing changes : master와 본인의 브랜치를 비교
- 충돌이 날 경우 충돌 제거 후 merge



#### 9. git 동기화 

- 강사님 저장소와 연결

```bash
git remote add origin_t [강사님 저장소]
```

- git fetch

```bash
git fetch origin_t
```

- git merge

```bash
git merge origin_t/master
```

- git pull

```bash
git pull origin master
```