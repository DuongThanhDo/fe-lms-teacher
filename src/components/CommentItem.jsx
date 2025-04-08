import React, { useState } from "react";
import { Avatar, Button, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import axios from "axios";
import dayjs from "dayjs";

function CommentItem({
  comment,
  user,
  currentUser,
  contentType,
  contentId,
  allComments,
  setAllComments,
}) {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [showReplies, setShowReplies] = useState(false);

  const replies = allComments.filter((c) => c.parent_id === comment.id);

  const handleReply = async () => {
    if (!replyContent.trim()) return;

    const res = await axios.post("http://localhost:5000/comments", {
      content: replyContent,
      user_id: user.id,
      commentable_type: contentType,
      commentable_id: contentId,
      parent_id: comment.id,
    });

    setAllComments((prev) => [...prev, res.data]);
    setReplyContent("");
    setShowReplyInput(false);
    setShowReplies(true);
  };

  return (
    <div className="d-flex mb-3">
      <Avatar
        size={40}
        icon={<UserOutlined />}
        src={comment.user?.profile?.avatar?.file_url}
        className="me-2"
        style={{ backgroundColor: "#0d6efd" }}
      />

      <div className="flex-grow-1">
        <div className="bg-light px-3 py-2 rounded-3">
          <div className="fw-bold mb-1">
            {comment.user?.profile?.name || `Thành viên ẩn danh ${comment.user?.id}`}
            {user?.id === comment.user?.id && (
              <span className="ms-2 text-success">Giảng viên</span>
            )}
          </div>
          <div>{comment.content}</div>
        </div>

        <div className="d-flex gap-3 text-muted small mt-1 align-items-center">
          <span>{dayjs(comment.updated_at).fromNow()}</span>
          <button
            className="btn btn-sm text-primary p-0"
            onClick={() => setShowReplyInput(!showReplyInput)}
          >
            Phản hồi
          </button>
          {replies.length > 0 && !showReplies && (
            <button
              className="btn btn-sm text-primary p-0"
              onClick={() => setShowReplies(true)}
            >
              Xem {replies.length} phản hồi
            </button>
          )}
        </div>

        {showReplyInput && (
          <div className="d-flex mt-2 align-items-center">
            <Avatar
              size={32}
              src={currentUser?.avatar?.file_url}
              icon={<UserOutlined />}
              className="me-2"
            />
            <Input
              size="small"
              autoFocus
              value={replyContent}
              placeholder="Viết phản hồi..."
              onChange={(e) => setReplyContent(e.target.value)}
              className="me-2"
            />
            <Button size="small" onClick={handleReply}>
              Gửi
            </Button>
          </div>
        )}

        {showReplies && (
          <div className="mt-3 ps-4 border-start">
            {replies.map((reply) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                user={user}
                currentUser={currentUser}
                contentType={contentType}
                contentId={contentId}
                allComments={allComments}
                setAllComments={setAllComments}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentItem;
