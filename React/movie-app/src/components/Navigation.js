import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (
    <div className="nav">
      <Link to="/">Home</Link>
      {/* 라우터에 있는 모든 Route들은 props를 기본값으로 가진다. => 이를 사용해서 정보를 전달할 수 있다. */}
      {/* <Link
            to={{
                pathname: "/about",
                state: {
                    fromNavigation: true
                }
                }}
            > */}
      <Link to="about">About</Link>
    </div>
  );
}

export default Navigation;
