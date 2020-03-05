import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (
    <div className="nav">
      {/* <div href="/">Home</div>  => 이렇게 HTML처럼 하면 페이지를 전부 리로딩한다. React의 Link를 사용하자 */}
      {/* Link는 라우터 밖에서 사용할 수 없다. */}
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </div>
  );
}

export default Navigation;
