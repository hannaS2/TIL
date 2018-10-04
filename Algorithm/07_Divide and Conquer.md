# Divide and Conquer :분할 정복
주어진 문제를 둘 이상의 부분 문제로 나눈 뒤 각 문제에 대한 답을 재귀 호출을 이용해 계산하고, 각 부분 문제의 답으로부터 전체 문제의 답을 계산하는 방법  
분할 정복이 재귀 호출과 다른 점은 문제를 한 조각과 나머지 전체로 나누는(재귀 호출) 대신 거의 같은 크기의 부분 문제로 나누는 것(분할 정복)
- divide: 문제를 더 작은 문제로 분할하는 과정
- merge: 각 문제에 대해 구한 답을 원래 문제에 대한 답으로 병합하는 과정
- base case: 더 이상 답을 분할하지 않고 곧장 풀 수 있는 매우 작은 문제

## Decrease and Conquer
single-subproblem인 경우 (Divide and Conquer의 종류 중 하나)  
- Decrease by a constant (일정한 상수만큼 줄임)
- Decrease by a constant factor (일정한 상수만큼 나눔)
- Variable size (일정하지 않은 크기로 분할)

### Sorting

#### Insertion Sort
```java
private static void insertionSort(int[] arr) {
    for (int i = 1; i < arr.length; i++) {
        int temp = arr[i];
        int j = i;
        while (j > 0 && arr[j - 1] > temp) {
            arr[j] = arr[j - 1];
            j--;
        }
        arr[j] = temp;
    }
}
```
> *Decrease by a constant*  
> 이전 배열에 삽입해야 할 원소 위치 찾아 삽입  
> worst-case는 역순으로 정렬되어 있을 때 각 원소가 부분배열의 원소 전부와 swap하므로 O(N<sup>2</sup>)

#### Topological Sort
DAG(Directed Acyclic Graph; cycle이 없는 유향그래프)에서 각 정점들의 선행 순서를 위배하지 않으면서 모든 정점을 나열하는 방법  
1) source removal  
정점으로 들어오는 edge가 없는 경우 제거하여 제거한 정점 순서
2) DFS traversal  
DFS를 실행한 결과의 역순이 정렬순서 (DFS stack에서 pop순서 거꾸로)
> *Decrease by a constant*  

### 순열 생성
ex) TSP
> *Decrease by a constant*  

### 부분집합 생성
> *Decrease by a constant*  

### bianry search
> *Decrease by a constant factor*  



```java
<quick select>
private static int quickSelect(int[] arr, int left, int right, int k) {
    int s = lomutoPartition(arr, left, right);
    if (s == k - 1) return arr[s];
    else if (s > k - 1) return quickSelect(arr, left, s - 1, k);
    else return quickSelect(arr, s + 1, right, k);
}

private static int lomutoPartition(int[] arr, int left, int right) {
    int p = arr[left];  // pivot은 첫 번째 원소
    int i = left;
    int temp;

    for (int j = left + 1; j <= right; j++) {
        if (arr[j] < p) {
            i++;
            temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    temp = arr[left];
    arr[left] = arr[i];
    arr[i] = temp;

    return i;
}
```
> *Variable size Decrease*  
> quick sort와 selection 알고리즘의 합쳐진 개념  
> 


## Divide and Conquer
2개 이상의 subproblem이 필요한 경우

```java
<merge sort>
배열을 절반으로 나눠 재귀 호출을 이용해 정렬하면서 합친다.
private static void mergeSort(int[] arr) {
    if (arr.length > 1) {
        int mid = arr.length / 2;
        int[] leftTemp = new int[mid];
        int[] rightTemp = new int[arr.length - mid];
        System.arraycopy(arr, 0, leftTemp, 0, mid);
        System.arraycopy(arr, mid, rightTemp, 0, arr.length - mid);

        mergeSort(leftTemp);
        mergeSort(rightTemp);
        merge(leftTemp, rightTemp, arr);
    }
}

private static void merge(int[] leftArr, int[] rightArr, int[] arr) {
    int i = 0;  // leftArr
    int j = 0;  // rightArr
    int k = 0;  // arr

    while (i < leftArr.length && j < rightArr.length) {
        if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            i++;
        } else {
            arr[k] = rightArr[j];
            j++;
        }
        k++;
    }

    if (i == leftArr.length) System.arraycopy(rightArr, j, arr, k, rightArr.length - j);
    else System.arraycopy(leftArr, i, arr, k, leftArr.length - i);
}
```
> 주어진 배열을 절반으로 나누는 시간 : O(1)  
> 각각 나눠서 정렬한 배열들을 하나의 배열로 병합하는 시간 : O(N)  
 =>반으로 나눈 두 배열의 길이 합만큼 반복문을 수행해야 하기 때문에, 병합하는 시간에 의해 수행 시간이 지배되는데 아래 단계로 갈수록 부분 문제의 수는 두배로 늘지만 각 부분 문제의 크기는 반으로 줄어들기 때문에 한 단계 내에서 병합에 필요한 시간은 O(N)으로 일정하다.  
> 절반으로 나누는 횟수 : O(logN)  
 => 매번 2개씩 나누므로 log<sub>2</sub>N번 과정을 거쳐 나누게 된다.  
> 따라서, 시간 복잡도는 O(NlogN)


```java
<quick sort>
pivot을 기준으로 왼쪽에는 기준보다 작은 숫자를, 오른쪽에는 기준보다 큰 숫자를 보내 배열을 나눠 재귀호출을 통해 정렬한다.
private static void quickSort(int[] arr, int left, int right) {
    if (left < right) {
        int s = hoarePartition(arr, left, right);
        quickSort(arr, left, s - 1);
        quickSort(arr, s + 1, right);
    }
}

private static int hoarePartition(int[] arr, int left, int right) {
    int p = arr[left];  // pivot은 첫 번째 원소
    int i = left + 1;
    int j = right;
    int temp;

    while (i <= j) {
        while (arr[i] <= p) i++;
        while (arr[j] >= p) j--;

        if (i <= j) {
            temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }

    temp = arr[left];
    arr[left] = arr[j];
    arr[j] = temp;
    return j;
}
```
> pivot을 정하는데 걸리는 시간: O(N)  
배열을 나누는데 O(N)이나 걸리고 pivot을 정하는 기준에 따라 달라지는 비효율적인 분할을 불러올 여지가 있지만 별도의 병합 작업이 필요없다는 장점이 있다.  
따라서, pivot에 의해 어떻게 분할되는지에 따라 수행 시간이 좌우된다.  
> worst-case는 비슷한 크기로 분할되지 않고 pivot이 치우쳐 있는 경우(배열의 최대/최소 원소인 경우): O(N<sup>2</sup>)  
> best/average-case는 pivot이 중간쯤에 있는 경우: O(NlogN)

---
#algorithm/알고리즘문제해결전략  
#algorithm/Introduction to the Design & Analysis of Algorithms, Third Edition,  Anomy Levitin