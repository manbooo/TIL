## TDD 실습

- 로또 번호를 선택하여 몇 등인지 확인
- 각 함수마다 Test Case를 만들어 적용



### SetUp

#### 1. Git

- 4주차 디렉토리에 팀원의 각 개인 디렉토리 생성
- 브랜치 따서 개인 작업



#### 2. Jasmin

- https://github.com/jasmine/jasmine/releases
- 다운받은 파일 압축 해제 후 lib 폴더만 프로젝트 디렉토리로 복사
- index.html 열기

```html
<link rel="shortcut icon" type="image/png" href="lib/jasmine-3.1.0/jasmine_favicon.png">
<link rel="stylesheet" href="lib/jasmine-3.1.0/jasmine.css">
<script src="lib/jasmine-3.1.0/jasmine.js"></script>
<script src="lib/jasmine-3.1.0/jasmine-html.js"></script>
<script src="lib/jasmine-3.1.0/boot.js"></script>
```



### 실습 (main.spec.js)

- [Jasmine Documents](https://jasmine.github.io/)



```js
describe("로또 함수의", function() {
    
})
```

- `describe` : 테스트 꾸러미



##### getRandomNum()

```js
describe("getRandomNum() 함수는", function() {
    it("1~45 사이의 랜덤 한 수를 반환한다.", function() {
        let rand_num = getRandomNum()

        expect(parseInt(rand_num)).toBe(rand_num)
        expect(rand_num).toBeGreaterThanOrEqual(1)
        expect(rand_num).toBeLessThanOrEqual(45)
    })
})
```

- `it()` : 함수의 특정 기능을 테스트(기능 단위 테스트)
- `expect()` : 기대값



##### checkDuplicatedNum()

```js
describe("checkDuplicatedNum() 함수는", function() {
    let lotto_nums = [1, 2, 3, 4, 5, 6]

    it("[1, 2, 3, 4, 5, 6], 5에는 중복인자가 있다.", function() {
        expect(checkDuplicatedNum(lotto_nums, 5)).toBeTruthy()
    })

    it("[1, 2, 3, 4, 5, 6], 10에는 중복인자가 없다.", function() {
        expect(checkDuplicatedNum(lotto_nums, 10)).toBeFalsy()
    })
})
```

