import React from "react";

function Food({ favorite }) {
  // props -> {props.favorite}을 ES6를 사용해서 속성값으로 받아올 수 있다.
  return <h1>I like {favorite}</h1>;
}

function App() {
  return (
    <div>
      <h1>Hello!</h1>
      <Food favorite="kimchi" />
      <Food favorite="ramen" />
      <Food favorite="samgiopsal" />
      <Food favorite="chukumi" />
    </div>
  );
}

export default App;
