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

```java
public void printAllItems(int[] array) {
    for(int item : array) {
        System.out.println(item);
    }
}
```

- Other examples
  - traverse tree
  - traverse linked list
- Tip

$$
nO(n) = O(n) \\
2 * O(n) = 10 * O(n) = O(n)
$$



#### 4. $O(n \log n)$

- Quick Sort, Merge Sort, Heap Sort

![merge sort](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrnxc09dKSuhEJjnspsMTdWLT-i4UFxG2yKmVnupEm190fsbL_)


$$
Denote \, n = 4 \\
\log 8 = 2 * \log 2^2 = 4
$$

> **merge sort** just divide the array in two halves at each stage which gives it $lg(n)$ component and the other $N$ component comes from its comparisons that are made at each stage. So combining it becomes nearly $O(n\log n)$



- Tip

$$
nO(n \log n) = O(n \log n) \\
2 * O(n \log n) = 10 * O(n \log n) = O(n \log n)
$$



#### 5. $O(n ^ 2)$

```java
public void printAllPossibleOrderedPairs(int[] array) {
    for(int firstItem : array) {
        for(int secondItem : array) {
            int[] orderedPair = new int[] (firstItem, secondItem);
            System.out.println(Arrays.toString(orderedPair));
        }
    }
}
```

- Other examples
  - Insertion Sort
  - Bubble Sort
  - Selection Sort
- Tip

$$
nO(n^2) = O(n^2) \\
2 * O(n*2) = 10 * O(n^2) = O(n^2)
$$

