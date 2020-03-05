import React from "react";
import PropTypes from "prop-types";

class App extends React.Component {
  state = {
    isLoading: true
  };

  componentDidMount() {
    // 처음 render되고 component가 mount되자마자 호출되는 부분
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 6000);
  }

  render() {
    const { isLoading } = this.state;
    return <div>{isLoading ? "Loading..." : "We are ready"}</div>;
  }
}

export default App;
