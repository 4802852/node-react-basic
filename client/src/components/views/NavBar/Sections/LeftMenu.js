import React from "react";
import { Menu } from "antd";

function LeftMenu(props) {
  return (
    <Menu mode="horizontal">
      <Menu.Item key="home">
        <a href="/">Home</a>
      </Menu.Item>
      <Menu.Item key="blog">
        <a href="/">Blog</a>
      </Menu.Item>
    </Menu>
  );
}

export default LeftMenu;
