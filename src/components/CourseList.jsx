import React from "react";
import {
  Table,
  Tag,
  Image,
  Menu,
  Dropdown as AntDropdown,
  message,
} from "antd";
import moment from "moment";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Button } from "react-bootstrap";
import { configs } from "../configs";
import { useNavigate } from "react-router-dom";

const statusColors = {
  draft: "gray",
  pending: "orange",
  published: "green",
  hidden: "blue",
  rejected: "red",
};

const statusLabels = {
  draft: "Nháp",
  pending: "Chờ duyệt",
  published: "Đã xuất bản",
  hidden: "Ẩn",
  rejected: "Bị từ chối",
};

const CourseList = ({ courses }) => {
  const navigate = useNavigate();

  const handleAction = (key, record) => {
    if (key === "view") {
      message.info(`Xem chi tiết: ${record.name}`);
    } else if (key === "edit") {
      navigate(`/courses/edit/${record.id}`);
    } else if (key === "delete") {
      message.error(`Xóa khóa học: ${record.name}`);
    }
  };

  const columns = [
    {
      title: "Khóa học",
      dataIndex: "image",
      key: "image",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Image
            src={record.image}
            width={80}
            height={50}
            style={{ borderRadius: 5 }}
          />
          <div style={{ marginLeft: 12 }}>
            <div style={{ fontWeight: "bold" }}>{record.name}</div>
            <div style={{ fontSize: 12, color: "#888" }}>
              {record.description}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
      render: (category) => category || "Chưa xác định",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) =>
        price !== null && price !== undefined && price !== 0
          ? `${price.toLocaleString()} VND`
          : "Miễn phí",
    },
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
      render: (type) => (
        <Tag color={type === "online" ? "blue" : "purple"}>
          {type.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={statusColors[status]}>{statusLabels[status]}</Tag>
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "created_at",
      render: (date) =>
        date ? moment(date).format("DD-MM-YYYY") : "Chưa cập nhật",
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (text, record) => (
        <AntDropdown
          overlay={
            <Menu onClick={(e) => handleAction(e.key, record)}>
              <Menu.Item key="view" icon={<EyeOutlined />}>
                Xem chi tiết
              </Menu.Item>
              <Menu.Item
                key="edit"
                icon={<EditOutlined />}
                style={{ color: "#1890ff" }}
              >
                Sửa khóa học
              </Menu.Item>
              <Menu.Item key="delete" icon={<DeleteOutlined />} danger>
                Xóa khóa học
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <Button variant="light" className="border-0">
            <EllipsisOutlined style={{ fontSize: "18px" }} />
          </Button>
        </AntDropdown>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={courses}
      rowKey="id"
      pagination={{ pageSize: 5 }}
    />
  );
};

export default CourseList;
