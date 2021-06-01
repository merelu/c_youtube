import React from "react";
import { Menu } from "antd";
import { MenuMode } from "antd/lib/menu";
import { Link } from "react-router-dom";
import { useAppSelector } from "@store/hooks";

interface ILeftMenu {
  mode: MenuMode;
}
function LeftMenu({ mode }: ILeftMenu) {
  const user = useAppSelector((state) => state.user);
  return (
    <Menu mode={mode}>
      <Menu.Item key="mail">
        <Link to="/">Home</Link>
      </Menu.Item>
      {user.userData._id && (
        <React.Fragment>
          <Menu.Item key="subscription">
            <Link to="/subscription">Subscription</Link>
          </Menu.Item>
          <Menu.Item key="myVideo">
            <Link to={`/myVideo`}>My Video</Link>
          </Menu.Item>
        </React.Fragment>
      )}
    </Menu>
  );
}

export default LeftMenu;
