import styled from "@emotion/styled";
import { Button, Drawer } from "antd";

export const Nav = styled.nav`
  position: sticky;
  display: flex;
  width: 100%;
  height: 60px;
  top: 0;
  padding: 0 20px;
  border-bottom: solid 1px #e8e8e8;
  overflow: hidden;
  box-shadow: 0 0 30px #f3f1f1;
  background-color: white;
  z-index: 5;
`;

export const MenuLogo = styled.div`
  display: flex;
  margin-left: 20px;
  margin-right: 20px;
  align-items: center;
  justify-content: center;
  a {
    font-size: 20px;
  }
`;

export const MenuContainer = styled.div`
  width: 100%;
  position: relative;
  .menu_left,
  .menu_right {
    position: absolute;
    bottom: 0;
    @media screen and (max-width: 767px) {
      display: none;
    }
  }
  .menu_left {
    left: 10px;
  }
  .menu_right {
    right: 10px;
  }
  .ant-menu-horizontal {
    border-bottom: none;
  }

  @media screen and (max-width: 767px) {
    justify-content: flex-end;
  }
`;

export const NavBarButton = styled(Button)`
  padding: 6px;
  display: none !important; /* use of important to overwrite ant-btn */
  background: #3e91f7;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);

  @media screen and (max-width: 767px) {
    display: inline-block !important;
  }
`;

export const NavBarDrawer = styled(Drawer)`
  & .ant-drawer-body {
    padding: 0 !important;
  }
  & .ant-drawer-header {
    padding: 14px 24px !important;
  }
`;
