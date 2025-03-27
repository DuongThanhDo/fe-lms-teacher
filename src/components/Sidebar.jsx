import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  AppstoreOutlined,
  BookOutlined,
  TeamOutlined,
  StarOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import "../assets/css/Sidebar.css";
import { configs } from "../configs";

const { Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const location = useLocation();

  const getActiveKey = () => {
    if (location.pathname.startsWith(configs.routes.courses))
      return configs.routes.courses;
    if (location.pathname.startsWith(configs.routes.students))
      return configs.routes.students;
    if (location.pathname.startsWith(configs.routes.reviews))
      return configs.routes.reviews;
    if (location.pathname.startsWith(configs.routes.messages))
      return configs.routes.messages;
    return "/";
  };

  return (
    <Sider
      className="fixed-sidebar"
      collapsible
      collapsed={collapsed}
      onMouseEnter={() => setCollapsed(false)}
      onMouseLeave={() => setCollapsed(true)}
      width={200}
    >
      <Menu
        theme="dark"
        mode="vertical"
        selectedKeys={[getActiveKey()]} // Active menu theo đường dẫn
        className="custom-sidebar"
      >
        <Menu.Item key={configs.routes.dashboard} icon={<AppstoreOutlined />}>
          <Link style={{ textDecoration: "none" }} to={configs.routes.dashboard}>
            Tổng quan
          </Link>
        </Menu.Item>
        <Menu.Item key={configs.routes.courses} icon={<BookOutlined />}>
          <Link style={{ textDecoration: "none" }} to={configs.routes.courses}>
            Khóa học
          </Link>
        </Menu.Item>
        <Menu.Item key={configs.routes.students} icon={<TeamOutlined />}>
          <Link style={{ textDecoration: "none" }} to={configs.routes.students}>
            Học viên
          </Link>
        </Menu.Item>
        <Menu.Item key={configs.routes.reviews} icon={<StarOutlined />}>
          <Link style={{ textDecoration: "none" }} to={configs.routes.reviews}>
            Đánh giá
          </Link>
        </Menu.Item>
        <Menu.Item key={configs.routes.messages} icon={<MessageOutlined />}>
          <Link style={{ textDecoration: "none" }} to={configs.routes.messages}>
            Tin nhắn
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
