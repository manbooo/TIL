## CSS 기본 문법

#### 1. `<style>` 태그

- 웹 브라우저에게 CSS임을 알려주는 태그

```html
<style>
...
</style>
```



#### 2. 선택자(selector)

- `<style>` 태그 안에 디자인을 누구한테 지정할 것인지를 명시
- 효과를 누구에게 줄 것인가

```css
a {
	...
}
```



- 클래스

```css
.saw {
	color:gray;
}
```



- ID

```css
#active {
	color:red;
}
```



- https://www.w3schools.com/cssref/css_selectors.asp



#### 3. 선언(효과, declaration)

```html
선택자 {
	color:black;
	text-decoration: none;
}
```

- `color` : property 
- `red` : value



#### 4. `style` 속성

- HTML 태그에 속성으로 입력

```html
<a href="2.html" style="color:red;text-decoration:underline">CSS</a></li>
```

