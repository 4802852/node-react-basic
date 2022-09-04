import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Menu } from "antd";

function RightMenu(props) {
  const navigate = useNavigate();

  const [LoggedIn, setLoggedIn] = useState(false);
  const [UserName, setUserName] = useState("");

  useEffect(() => {
    if (window.localStorage.loginSuccess) {
      setLoggedIn(window.localStorage.loginSuccess);
      setUserName(window.localStorage.userName);
    }
  }, []);

  const onLogoutHandler = () => {
    axios.get("/api/users/logout").then((response) => {
      if (response.data.success) {
        window.localStorage.clear();
        setLoggedIn(false);
        navigate("/login");
      } else {
        alert("로그아웃에 실패했습니다.");
      }
    });
  };

  return (
    <Menu mode="horizontal">
      {LoggedIn ? (
        <>
          <Menu.Item key="username">{UserName}</Menu.Item>
          <Menu.Item key="logout">
            <span onClick={onLogoutHandler}>Logout</span>
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item key="login">
            <a href="/login">Login</a>
          </Menu.Item>
          <Menu.Item key="register">
            <a href="/register">Register</a>
          </Menu.Item>
        </>
      )}
    </Menu>
  );
}

export default RightMenu;
