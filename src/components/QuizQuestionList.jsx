import React from "react";
import { List, Button, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const QuizQuestionList = ({ questions = [], onEdit, onDelete }) => {
  const handleDelete = (index) => {
    Modal.confirm({
      title: "Xóa câu hỏi này?",
      content: "Câu hỏi và các đáp án của nó sẽ bị xóa vĩnh viễn.",
      okText: "Xóa",
      cancelText: "Hủy",
      okType: "danger",
      onOk: () => onDelete(index),
    });
  };

  return (
    <>
      <h4>Danh sách câu hỏi</h4>
      <List
        bordered
        dataSource={questions}
        renderItem={(q, index) => (
          <List.Item
            actions={[
              <Button icon={<EditOutlined />} size="small" onClick={() => onEdit(index)} />,
              <Button
                icon={<DeleteOutlined />}
                size="small"
                danger
                onClick={() => handleDelete(index)}
              />,
            ]}
          >
            <div style={{ width: "100%" }}>
              <strong>{index + 1}.</strong> {q.name}
            </div>
          </List.Item>
        )}
      />
    </>
  );
};

export default QuizQuestionList;
