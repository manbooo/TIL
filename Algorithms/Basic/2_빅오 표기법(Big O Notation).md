## 빅오 표기법(Big O Notation)

### Big O Notation

- 알고리즘의 퍼포먼스의 표현 방법



#### 1.  $O(1)$

```java
public void printFirstItem(int[] array) {
    System.out.println(array[0]);
}
```

- 배열에 많은 내용이 있더라도 하나의 인덱스에 접근
  - 한번에 접근 가능
- Other examples
  - Push, Pop on Stack
  - Access hash table
    - 하나의 키에만 접근
    - 많은 배열이 존재하더라도 한번에 접근
- Tip

$$
nO(1) = O(1) \\
2 * O(1) = 10 * O(1) = O(1)
$$



#### 2. $O(\log n)$

- Binary Search Tree Access, Search, Insertion, Deletion

![Tree](https://www.tutorialspoint.com/data_structures_algorithms/images/binary_search_tree.jpg)
$$
Denote \, n = 8\\
\log 8 = \log 2^3 = 3
$$

- Tip

$$
nO(\log n) = O(\log n)\\
2 * O(\log n) = 10 * O(\log n) = O(\log n)
$$



#### 3. $O(n)$



#### 4. $O(n \log n)$



#### 5. $O(n ^ 2)$



### 시간 복잡도



### 공간 복잡도

