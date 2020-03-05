import React from "react";
import PropTypes from "prop-types";

class App extends React.Component {
  state = {
    count: 0
  };

  add = () => {
    // this.state.count = 1;  => 작동하지 않는다. react는 render함수를 refresh하지 않기 때문 => setState 사용
    // this.setState({ count: this.state.count + 1 });  => 이 방법(setState에서 state를 사용하는 벙법)은 별로 좋지 않은 방법
    this.setState(current => ({ count: current.count + 1 })); // 이 방법이 외부의 상태에 의존하지 않는 가장 좋은 방법 (current는 react에서 지원해주는 현재 state를 얻는 방법)
  };

  minus = () => {
    this.setState(current => ({ count: current.count - 1 }));
  };

  render() {
    return (
      <div>
        <h1>The number is: {this.state.count}</h1>
        <button onClick={this.add}>Add</button>
        <button onClick={this.minus}>Minus</button>
      </div>
    );
  }
}

export default App;
