## TDD

### Test Drivem Development

- 테스트 주도 개발
- 서비스 개발 후 테스트 완료 후 런칭
- 코딩을 할 때도 **테스트**가 중요



### 테스트를 왜 하는가?

- 재설계 및 디버그 시간 절감
  - 테스트 코드 설계 시간이 더 오래 걸리지 않을까?
  - 사용하면서 미쳐 발견하지 못하는 에러들이 발견
  - 처음에 테스트 코드를 이용하여 디버깅
  - 추후 디버깅이나 에러 발견시 재설계를 할 경우를 줄여줌
- 개발 효율 증가
  - 프로그램이 잘 동작하는지 확인하고 다음 프로세스 개발
- 버그 감소



### 테스트 코드 작성 API

- Jasmine
- putest
- JUnit
- nowe
- Jset
- mockito



### TDD 과정

- 아래의 과정을 반복
- **Test**와 **Refactor**는 꼭 지켜야한다.
- [TDD 참고](https://nesoy.github.io/articles/2017-01/TDD)



![TDD](https://nesoy.github.io/assets/posts/20170131/2.gif)

1. RED : Write a test that fails
   - 함수를 구현하지 않고 기능을 정의
   - 테스트 코드를 작성
2. GREEN : Make the code work
   - 테스트 케이스가 잘 작동하는지
   - 테스트 통과하기
3. REFACTOR : Eliminate redundancy
   - 기존의 코드를 개선
     - 효율성
     - 가독성
     - 유지보수



1. Think-Write Test Case
2. Red - Fail
3. Green - Pass (new test case)
4. Green - Pass (all Old TC)
5. Refactor - Clear



### Why Refactoring?

- 디자인 개선
  - 협업에서 다른 팀원들이 이해하기 쉽도록
- 유지 보수 용이
- **개발은 혼자하는 것이 아니다**
  - 코드의 가독성을 높여야 협업에 용이
  - 업무 속도 증가



##### 주석이 많으면 좋은 코드?

- Case by Case
- 친절한 설명이 있다면 좋다.
- 주석이 많으면 코드가 알아보기 힘들다는 의미
- **읽기 좋은 코드가 좋은 코드**

