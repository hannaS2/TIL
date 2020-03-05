import React from "react";
import PropTypes from "prop-types";

class App extends React.Component {
  state = {
    count: 0
  };

  add = () => {
    this.setState(current => ({ count: current.count + 1 }));
  };

  minus = () => {
    this.setState(current => ({ count: current.count - 1 }));
  };

  componentDidMount() {
    // 컴포넌트가 처음 render되는 부분
    console.log("component rendered");
  }

  componentDidUpdate() {
    console.log("i just updated");
  }

  componentWillUnmount() {
    // 다른 페이지로 가는 등 컴포넌트가 제거될 때
    console.log("Goodbye");
  }

  render() {
    console.log("i'm rendering");
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
