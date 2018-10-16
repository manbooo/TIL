## 1_ Problems solved by GraphQL

### Over-fetching

- 요청한 영역의 정보보다 많은 정보를 서버에서 받아 옴
- frontend가 Database에 오직 필요한 정보만 요청
  - 개발자가 어떤 정보를 원하는 지에 대해 통제



### Under-fetching

- 어떤 하나를 완성하기 위해 다른 요정들을 해야할 때 발생
- REST에서 하나를 완성하려고 많은 소스를 요청
- GraphQL에서는 한개의 query로 가능
  - GraphQL에는 한개의 endpoint만 존재

