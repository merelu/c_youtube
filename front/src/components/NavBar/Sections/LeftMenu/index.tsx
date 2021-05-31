import React from "react";
import { Menu } from "antd";
import { MenuMode } from "antd/lib/menu";
import { Link } from "react-router-dom";

interface ILeftMenu {
  mode: MenuMode;
}
function LeftMenu({ mode }: ILeftMenu) {
  return (
    <Menu mode={mode}>
      <Menu.Item key="mail">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="subscription">
        <Link to="/subscription">Subscription</Link>
      </Menu.Item>
    </Menu>
  );
}

export default LeftMenu;
