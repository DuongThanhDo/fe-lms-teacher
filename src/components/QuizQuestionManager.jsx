import React, { useState } from "react";
import QuizQuestionForm from "./QuizQuestionForm";
import QuizQuestionList from "./QuizQuestionList";

const QuizQuestionManager = ({ quizId, showForm }) => {
  const [questions, setQuestions] = useState([]);
  const [isEditingIndex, setIsEditingIndex] = useState(null);
  const [questionText, setQuestionText] = useState("");
  const [answers, setAnswers] = useState([{ text: "", correct: false }]);

  const resetForm = () => {
    setQuestionText("");
    setAnswers([{ text: "", correct: false }]);
    setIsEditingIndex(null);
  };

  const handleSave = () => {
    const trimmedAnswers = answers.filter((a) => a.text.trim() !== "");
    const newQuestion = {
      question: questionText.trim(),
      answers: trimmedAnswers,
    };

    if (isEditingIndex !== null) {
      const updated = [...questions];
      updated[isEditingIndex] = newQuestion;
      setQuestions(updated);
    } else {
      setQuestions([...questions, newQuestion]);
    }

    resetForm();
  };

  return (
    <div>
      {showForm && (
        <QuizQuestionForm
          questionText={questionText}
          answers={answers}
          isEditing={isEditingIndex !== null}
          onQuestionChange={setQuestionText}
          onAnswerChange={(idx, text) => {
            const updated = [...answers];
            updated[idx].text = text;
            setAnswers(updated);
          }}
          onAnswerToggleCorrect={(idx, checked) => {
            const updated = [...answers];
            updated[idx].correct = checked;
            setAnswers(updated);
          }}
          onAddAnswer={() => setAnswers([...answers, { text: "", correct: false }])}
          onRemoveAnswer={(idx) => {
            const updated = [...answers];
            updated.splice(idx, 1);
            setAnswers(updated);
          }}
          onCancelEdit={resetForm}
          onSave={handleSave}
          onSelectCorrectAnswer={(selectedIdx) => {
            const updated = answers.map((a, idx) => ({
              ...a,
              correct: idx === selectedIdx,
            }));
            setAnswers(updated);
          }}
        />
      )}

      <QuizQuestionList
        questions={questions}
        onEdit={(index) => {
          const q = questions[index];
          setQuestionText(q.question);
          setAnswers(q.answers);
          setIsEditingIndex(index);
        }}
        onDelete={(index) => {
          const updated = [...questions];
          updated.splice(index, 1);
          setQuestions(updated);
        }}
      />
    </div>
  );
};

export default QuizQuestionManager;
