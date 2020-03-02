# React Native 레이아웃

React Native에서 레이아웃을 잡는 방법에는 2가지가 있다.  
1. 고정 크기의 영역 잡기
2. 다이나믹하게 변경되는 영역 잡기 => 보통 사용하는 방법

## 고정 크기의 영역 잡기
**고정적인 수치** 또는 %로 width, height를 지정한다. (%는 부모 View에 해당하는 %만큼 크기 지정)
```javascript
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.case1}/>
        <View style={styles.case2}/>
        <View style={styles.case3}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  case1: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },
  case2: {
    width: 100,
    height: 50,
    backgroundColor: 'green',
  },
  case3: {
    width: 100%,
    height: 10%,
    backgroundColor: 'blue',
  },
});
```

## 변경되는 크기의 영역 잡기
flexBox 사용  

### flex
**flex**는 레이아웃 구성의 가중치로, 부모 View 크기의 특정 비율만큼 크기를 지정한다.
ex) View가 1개일 때 flex가 1이면 100%, 2개가 각각 1이면 각각 50%를 말한다.
> flex와 %는 부모 크기의 영향을 받으므로, 부모 크기를 지정하지 않았는지 잘 확인해야 한다.  
> height와 flex를 같이 사용하게 되면 height로 고정된 값 이외의 범위를 flex로 채우게 된다. (고정으로 들어가는 height가 있을 경우 이렇게 사용)


```javascript
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.case1}/>
        <View style={styles.case2}/>
        <View style={styles.case3}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  case1: {
    flex: 1,
    backgroundColor: 'red',
  },
  case2: {
    flex: 3,
    backgroundColor: 'green',
  },
  case3: {
    flex: 1,
    backgroundColor: 'blue',
  },
});
```
### flexDirection
**flexDirection**은 View에서 자식 요소들을 가로 또는 세로로 배치할 지에 대한 스타일이다. 기본적으로 flex에서 flexDirection은 column이 기본 속성이다(세로 레이아웃). 가로 레이아웃을 사용하고 싶으면 flexDirection을 row로 설정한다.

### justifyContent
**justifyContent**는 정렬 보조속성으로 flexDirection의 값에 영향을 받는다. flexDirection과 수평방향으로 정렬한다. (flexDirection이 column인 세로배치일 때, 같은 방향으로 수직정렬한다)  
- flex-start : 세로배치일 때는 상단, 가로배치일 때는 좌측
- center : 가운데
- flex-end : 세로배치일 때는 하단, 가로배치일 때는 우측
- space-between : 양쪽 정렬(양 끝을 기점으로 요소간의 거리를 균등하게 정렬)
- space-around : 공백이 있는 양쪽 정렬(양 옆 공백을 포함한 상태로 균등하게 정렬)
- space-evenly : 공백이 일정한 양쪽 정렬

<img src="https://css-tricks.com/wp-content/uploads/2018/10/justify-content.svg" width="50%">

### alignItems
**alighItems**는 정렬 보조속성으로 flexDirection의 값에 영향을 받는다. flexDirection과는 수직방향으로 정렬한다. (flexDirection이 column인 수직배치일 때, 그 반대인 가로정렬한다)  
- flex-start : 가로정렬(세로배치)일 때는 좌측, 세로정렬(가로배치)일 때는 상단
- center : 가운데
- flex-end : 가로정렬일 때는 우측, 세로정렬일 때는 하단
- stretch : flex-start부터 flex-end까지 쭉 늘리는 속성(단, 정렬방향의 크기를 지정해주지 않아야 적용된다)
- baseline  

<img src="https://css-tricks.com/wp-content/uploads/2018/10/align-items.svg" width="50%">


-------------------------
https://css-tricks.com/snippets/css/a-guide-to-flexbox/