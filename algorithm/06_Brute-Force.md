# Brute Force :무식하게 풀기

가능한 경우의 수를 일일이 나열하면서 답을 찾는 방법 => **완전 탐색(exhaustive search)**  
입력의 크기가 작은 경우에는 속도가 빠르면서 구현하기 쉬운 방법이다.  

### 재귀 호출과 완전 탐색
수행하는 작업들을 작은 조각들로 나눌 수 있는데 각 조각들의 형태가 유사해지는 것(반복문)을 많이 볼 수 있다. 이런 작업을 구현할 때 유용하게 사용되는 개념이 재귀 함수(recursive function), 혹은 재귀 호출(recursion)이다.  
즉, 재귀 함수는 자신이 수행할 작업을 유사한 형태의 여러 조각으로 쪼갠 뒤 그 중 한조각을 수행하고, 나머지를 자기 자신을 호출해 실행하는 함수를 가리킨다.  
모든 재귀 함수는 '더이상 쪼개지지 않는' 최소한의 작업에 도달했을 때 답을 곧장 반환하는 조건문을 포함해야 한다. 이때 쪼개지지 않는 가장 작은 작업들을 **기저 사례(base-case)** 라고 한다. 기저 사례를 선택할 때는 존재하는 모든 입력이 항상 기저 사례의 답을 이용하도록 한다.
```java
<n개의 원소 중 m개를 고르는 모든 조합을 찾는 알고리즘>
// n: 전체 원소의 수
// picked: 지금까지 고른 원소들의 번호
// toPick: 더 고를 원소의 수
// 일 때, 앞으로 toPick개를 고르는 모든 조합을 찾는 알고리즘
private static void pick(int n, ArrayList<Integer> picked, int toPick) {
    // 기저 사례 더 고를 원소가 없을 때 고를 원소들을 출력한다.
    if (toPick == 0) {
        System.out.println(picked);
        return;
    }
    // 고를 수 있는 가장 작은 번호를 계산한다.
    int smallest = picked.isEmpty() ? 0 : picked.get(picked.size() - 1) + 1;
    // 이 단계에서 원소 하나를 고른다.
    for (int next = smallest; next < n; next++) {
        picked.add(next);  // 하나의 원소를 추가
        pick(n, picked, toPick - 1);  // 재귀 함수 호출
        picked.remove(picked.size() - 1);  // 다시 이전으로 돌아가 다른 원소 추가하도록
    }
}
```
> 위 함수를 재귀함수가 아닌 반복문을 사용한다면 m개의 for문을 중첩해서 사용해야 하기 때문에 골라야 할 원소의 수가 늘어날수록 코드가 길고 복잡해지고 골라야 할 원소의 수가 입력에 따라 달라질 경우에는 사용할 수 없다.

## 예제
### Sorting Problem
```java
// selection sort
private static void selectionSort(int[] arr) {
    int min, temp;
    for (int i = 0; i < arr.length - 1; i++) {
        min = i;
        for (int j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[min]) {
            min = j;
            }
        }
        temp = arr[min];
        arr[min] = arr[i];
        arr[i] = temp;
    }
}
```
> comparison : O(N<sup>2</sup>) 이중for문  
> swap : O(N) 바깥 for문

```java
// bubble sort
private static void bubbleSort(int[] list) {
    for (int i = 0; i < list.length - 1; i++) {
        for (int j = 0; j < list.length - 1 - i; j++) {
            if (list[j] > list[j + 1]) {
                int temp = list[j];
                list[j] = list[j + 1];
                list[j + 1] = temp;
            }
        }
    }
}
```
> comparison : O(N<sup>2</sup>) 이중for문    
> swap : worst-case가 O(N<sup>2</sup>) 거꾸로 정렬되어 있을 때 comparison수와 같음

### String Matching
text 처음부터 pattern의 글자 하나하나 비교해보면서 맞지 않을 경우 오른쪽으로 한 글자씩 이동하면서 찾는다.
```java
private static int bfStringMatching(String text, String pattern) {
    int tLen = text.length();
    int pLen = pattern.length();

    for (int i = 0; i < tLen - pLen; i++) {
        int j = 0;
        while (j < pLen && pattern.charAt(j) == text.charAt(i + j)) {
            j++;
        }
        if (j == pLen) return i;
    }
    return -1;
}
```
> worst-case가 while문 안에서 pattern글자 끝까지 가서 틀렸을 경우로 text의 길이를 N, pattern의 길이를 M이라고 했을 때, (N-M+1)*M이므로 O(NM)이다.

