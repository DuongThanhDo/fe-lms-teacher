import React from "react";
import { List, Button, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const QuizQuestionList = ({ questions, onEdit, onDelete }) => {
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
      <h3>Danh sách câu hỏi</h3>
      <List
        bordered
        dataSource={questions}
        renderItem={(q, index) => (
          <List.Item
            actions={[
              <Button icon={<EditOutlined />} size="small" onClick={() => onEdit(index)} />,
              <Button icon={<DeleteOutlined />} size="small" danger onClick={() => handleDelete(index)} />,
            ]}
          >
            <div style={{ width: "100%" }}>
              <strong>{q.question}</strong>
              <ul style={{ marginTop: 4 }}>
                {q.answers.map((ans, i) => (
                  <li key={i} style={{ color: ans.correct ? "green" : "black" }}>
                    {ans.text} {ans.correct && "(Đúng)"}
                  </li>
                ))}
              </ul>
            </div>
          </List.Item>
        )}
      />
    </>
  );
};

export default QuizQuestionList;
