import React, { useCallback } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { logOutUser } from "@_actions/user_action";
import { MenuMode } from "antd/lib/menu";
import { push } from "connected-react-router";

interface IRightMenu {
  mode: MenuMode;
}
function RightMenu({ mode }: IRightMenu) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const logoutHandler = useCallback(() => {
    dispatch(logOutUser()).then((response) => {
      if (response.payload.success) {
        dispatch(push("/login"));
        window.localStorage.removeItem("userId");
      } else {
        alert("Log Out Failed");
      }
    });
  }, [dispatch]);
  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={mode}>
        <Menu.Item key="mail">
          <Link to="/login">Signin</Link>
        </Menu.Item>
        <Menu.Item key="app">
          <Link to="/register">Signup</Link>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu mode={mode}>
        <Menu.Item key="upload">
          <Link to="/video/upload">Upload</Link>
        </Menu.Item>
        <Menu.Item key="logout">
          <Link to="#" onClick={logoutHandler}>
            Logout
          </Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export default RightMenu;
