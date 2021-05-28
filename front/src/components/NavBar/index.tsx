import React, { useCallback, useState } from "react";
import { AlignRightOutlined } from "@ant-design/icons";
import LeftMenu from "./Sections/LeftMenu";
import RightMenu from "./Sections/RightMenu";
import {
  MenuContainer,
  MenuLogo,
  Nav,
  NavBarButton,
  NavBarDrawer,
} from "./styles";
import { Link } from "react-router-dom";

function NavBar() {
  const [visible, setVisible] = useState(false);

  const showDrawer = useCallback(() => {
    setVisible(true);
  }, [setVisible]);

  const onClose = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  return (
    <Nav>
      <MenuLogo>
        <Link to="/">CTube</Link>
      </MenuLogo>
      <MenuContainer>
        <div className="menu_left">
          <LeftMenu mode="horizontal"></LeftMenu>
        </div>
        <div className="menu_right">
          <RightMenu mode="horizontal"></RightMenu>
        </div>
        <div className="menu_Button">
          <NavBarButton type="primary" onClick={showDrawer}>
            <AlignRightOutlined />
          </NavBarButton>
        </div>
        <NavBarDrawer
          title="Basic Drawer"
          placement="right"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <LeftMenu mode="inline"></LeftMenu>
          <RightMenu mode="inline"></RightMenu>
        </NavBarDrawer>
      </MenuContainer>
    </Nav>
  );
}

export default NavBar;
