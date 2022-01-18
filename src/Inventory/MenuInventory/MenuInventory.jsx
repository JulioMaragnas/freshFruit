import React from "react";
import "./MenuInventory.css";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Menu, Switch, Divider } from "antd";
import {
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined,
  LinkOutlined,
} from "@ant-design/icons";

function MenuInventory(params) {
  return (
    <Menu
      style={{ width: '100%', height: '100%' ,backgroundColor: '#EBEBEB' }}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
    >
      <Menu.Item key="1" icon={<MailOutlined />}>
        Navigation One
      </Menu.Item>
      <Menu.Item key="2" icon={<CalendarOutlined />}>
        Navigation Two
      </Menu.Item>
      <Menu.SubMenu key="sub1" icon={<AppstoreOutlined />} title="Navigation Two">
        <Menu.Item key="3">Option 3</Menu.Item>
        <Menu.Item key="4">Option 4</Menu.Item>
        <Menu.SubMenu  key="sub1-2" title="Submenu">
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
        </Menu.SubMenu >
      </Menu.SubMenu >
      <Menu.SubMenu  key="sub2" icon={<SettingOutlined />} title="Navigation Three">
        <Menu.Item key="7">Option 7</Menu.Item>
        <Menu.Item key="8">Option 8</Menu.Item>
        <Menu.Item key="9">Option 9</Menu.Item>
        <Menu.Item key="10">Option 10</Menu.Item>
      </Menu.SubMenu >
      <Menu.Item key="link" icon={<LinkOutlined />}>
        <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
          Ant Design
        </a>
      </Menu.Item>
    </Menu>
  );
}

export default MenuInventory;