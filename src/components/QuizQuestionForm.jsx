import React from "react";
import { Button, Input, Radio, Space } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const QuizQuestionForm = ({
  questionText,
  answers,
  isEditing,
  onQuestionChange,
  onAnswerChange,
  onSelectCorrectAnswer,
  onAddAnswer,
  onRemoveAnswer,
  onCancelEdit,
  onSave,
}) => {
  return (
    <div style={{ marginBottom: 24 }}>
      <h3>{isEditing ? "Sửa câu hỏi" : "Thêm câu hỏi"}</h3>

      <Input
        placeholder="Nhập nội dung câu hỏi"
        value={questionText}
        onChange={(e) => onQuestionChange(e.target.value)}
        style={{ marginBottom: 12 }}
        autoFocus
      />

      <Radio.Group
        value={answers.findIndex((a) => a.correct)}
        onChange={(e) => onSelectCorrectAnswer(e.target.value)}
        style={{ display: "flex", flexDirection: "column", gap: 8 }}
      >
        {answers.map((answer, idx) => (
          <Space key={idx} style={{ display: "flex" }}>
            <Radio value={idx} />
            <Input
              placeholder={`Đáp án ${idx + 1}`}
              value={answer.text}
              onChange={(e) => onAnswerChange(idx, e.target.value)}
              style={{ width: 300 }}
            />
            <Button
              icon={<DeleteOutlined />}
              onClick={() => onRemoveAnswer(idx)}
              disabled={answers.length <= 1}
            />
          </Space>
        ))}
      </Radio.Group>

      <Button icon={<PlusOutlined />} onClick={onAddAnswer} style={{ marginTop: 8 }}>
        Thêm đáp án
      </Button>

      <div style={{ marginTop: 16 }}>
        <Button
          type="primary"
          icon={<CheckOutlined />}
          onClick={onSave}
          disabled={!questionText.trim()}
        >
          {isEditing ? "Cập nhật" : "Thêm câu hỏi"}
        </Button>
        {isEditing && (
          <Button icon={<CloseOutlined />} onClick={onCancelEdit} style={{ marginLeft: 8 }}>
            Hủy
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuizQuestionForm;
