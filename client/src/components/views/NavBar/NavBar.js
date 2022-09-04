import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  const onLogoutHandler = () => {
    axios.get("/api/users/logout").then((response) => {
      if (response.data.success) {
        navigate("/login");
      } else {
        alert("로그아웃에 실패했습니다.");
      }
    });
  };
  return (
    <div style={{ position: "fixed", width: "100%", height: "68px" }}>
      NavBar<button onClick={onLogoutHandler}>로그아웃</button>
    </div>
  );
}

export default NavBar;
