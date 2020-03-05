import React from "react";
import { HashRouter, Route } from "react-router-dom";
import About from "./routes/About";
import Home from "./routes/Home";

function App() {
  // 라우터가 url을 보고 어느 컴포넌트를 불러올지 결정
  // 리액트 라우터는 해당하는 컴포넌트를 모두 렌더링한다. 따라서 동시에 렌더링된다. => exact={true}를 사용하면 해당 url이 아니면 렌더링 하지 않는다.
  return (
    <HashRouter>
      <Route path="/" exact={true} component={Home} />
      <Route path="/about" component={About} />
    </HashRouter>
  );
}

export default App;
