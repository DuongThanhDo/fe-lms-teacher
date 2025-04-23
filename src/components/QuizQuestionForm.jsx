import React, { useState, useEffect } from "react";
import { Button, Input, Radio, Space, message } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { configs } from "../configs";

const QuizQuestionForm = ({
  quizId,
  questionData = {},
  isEditing,
  onSaveSuccess,
  onCancelEdit,
}) => {
  const [question, setQuestion] = useState({
    id: undefined,
    name: "",
    explain: "",
    answers: [{ id: undefined, value: "", correct: false }]
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("questionData:"+questionData);
    
    setQuestion({
      id: questionData?.id,
      name: questionData?.name || "",
      explain: questionData?.explain || "",
      answers:
        isEditing ? questionData?.answers?.map((a) => ({
          id: a.id,
          value: a.value,
          correct: a.correct,
        })) : Array(4).fill(null).map(() => ({ id: undefined, value: "", correct: false })),
    });
  }, [questionData]);
  

  const handleSave = async () => {
    if (!question.name.trim()) return;
  
    const validAnswers = question.answers.filter(a => a.value.trim() !== "");
  
    if (validAnswers.length < 2) {
      message.error("Câu hỏi phải có ít nhất 2 đáp án hợp lệ!");
      return;
    }
  
    if (!validAnswers.some((a) => a.correct)) {
      message.error("Phải chọn ít nhất 1 đáp án đúng!");
      return;
    }
  
    setLoading(true);
    try {
      let questionId;
  
      if (isEditing) {
        await axios.put(
          `${configs.API_BASE_URL}/quizzes/${quizId}/questions/${question.id}`,
          {
            name: question.name,
            explain: question.explain || "",
          }
        );
        questionId = questionData.id;
      } else {
        const res = await axios.post(`${configs.API_BASE_URL}/questions`, {
          quizId,
          name: question.name,
          explain: question.explain || "",
        });
        questionId = res.data.id;
      }
  
      const preparedAnswers = validAnswers.map((a) => ({
        id: a.id,
        quizId,
        questionId,
        value: a.value,
        correct: a.correct,
      }));
  
      const existingAnswersRes = await axios.get(
        `${configs.API_BASE_URL}/quizzes/${quizId}/questions/${questionId}/answers`
      );
      const existingAnswerIds = existingAnswersRes.data.data.map((a) => a.id);
      const currentAnswerIds = preparedAnswers
        .map((a) => a.id)
        .filter((id) => !!id);
  
      const answersToDelete = existingAnswerIds.filter(
        (id) => !currentAnswerIds.includes(id)
      );
  
      const deletePromises = answersToDelete.map((id) =>
        axios.delete(
          `${configs.API_BASE_URL}/quizzes/${quizId}/questions/${questionId}/answers/${id}`
        )
      );
  
      const updatePromises = preparedAnswers.map((a) => {
        if (a.id) {
          return axios.put(
            `${configs.API_BASE_URL}/quizzes/${quizId}/questions/${questionId}/answers/${a.id}`,
            a
          );
        } else {
          return axios.post(`${configs.API_BASE_URL}/answers`, a);
        }
      });
  
      await Promise.all([...deletePromises, ...updatePromises]);
  
      message.success(
        isEditing ? "Cập nhật câu hỏi thành công!" : "Thêm câu hỏi thành công!"
      );
      onSaveSuccess?.();
    } catch (err) {
      console.log("Lỗi khi lưu:", err);
      message.error("Có lỗi xảy ra khi lưu câu hỏi");
    } finally {
      setLoading(false);
    }
  };
  
  
  return (
    <div style={{ marginBottom: 24 }}>
      <h4>{isEditing ? "Sửa câu hỏi" : "Thêm câu hỏi"}</h4>

      <Input.TextArea
        placeholder="Nhập nội dung câu hỏi"
        value={question.name}
        onChange={(e) =>
          setQuestion((prev) => ({ ...prev, name: e.target.value }))
        }
        style={{ marginBottom: 12 }}
        autoSize
        autoFocus
      />

      <Input.TextArea
        placeholder="Giải thích cho câu hỏi (tùy chọn)"
        value={question.explain}
        onChange={(e) =>
          setQuestion((prev) => ({ ...prev, explain: e.target.value }))
        }
        style={{ marginBottom: 12 }}
        autoSize
      />

      <Radio.Group
        value={question.answers.findIndex((a) => a.correct)}
        onChange={(e) => {
          const updated = question.answers.map((a, idx) => ({
            ...a,
            correct: idx === e.target.value,
          }));
          setQuestion((prev) => ({ ...prev, answers: updated }));
        }}
        style={{ display: "flex", flexDirection: "column", gap: 8 }}
      >
        {question.answers.map((answer, idx) => (
          <Space key={idx} style={{ display: "flex" }}>
            <Radio value={idx} />
            <Input
              placeholder={`Đáp án ${idx + 1}`}
              value={answer.value}
              onChange={(e) => {
                const updated = [...question.answers];
                updated[idx].value = e.target.value;
                setQuestion((prev) => ({ ...prev, answers: updated }));
              }}
              style={{ width: 300 }}
            />
            <Button
              icon={<DeleteOutlined />}
              onClick={() => {
                const updated = [...question.answers];
                updated.splice(idx, 1);
                setQuestion((prev) => ({ ...prev, answers: updated }));
              }}
              disabled={question.answers.length <= 1}
            />
          </Space>
        ))}
      </Radio.Group>

      <Button
        icon={<PlusOutlined />}
        onClick={() =>
          setQuestion((prev) => ({
            ...prev,
            answers: [
              ...prev.answers,
              { id: undefined, value: "", correct: false },
            ],
          }))
        }
        style={{ marginTop: 8 }}
      >
        Thêm đáp án
      </Button>

      <div style={{ marginTop: 16 }}>
        <Button
          type="primary"
          icon={<CheckOutlined />}
          onClick={handleSave}
          disabled={!question.name.trim()}
          loading={loading}
        >
          {isEditing ? "Cập nhật" : "Thêm câu hỏi"}
        </Button>
        {isEditing && (
          <Button
            icon={<CloseOutlined />}
            onClick={onCancelEdit}
            style={{ marginLeft: 8 }}
          >
            Hủy
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuizQuestionForm;
