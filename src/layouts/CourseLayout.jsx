import React, { useEffect, useState } from "react";
import { Layout, Button, Typography, Collapse } from "antd";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CodeOutlined,
  PlayCircleOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import "../assets/css/CourseLayout.css"; // Import CSS file
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const { Header, Content, Footer } = Layout;
const { Panel } = Collapse;

const SIDEBAR_WIDTH = 320;

const CourseLayout = ({ children }) => {
  const [showSider, setShowSider] = useState(true);
  const [course, setCourse] = useState([]);
  const [contents, setContents] = useState([]);

  const { courseId } = useParams();
  const navigator = useNavigate();

  useEffect(() => {
    if (!courseId) return;

    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/courses/${courseId}`
        );
        setCourse(response.data);
      } catch (error) {
        console.error("Lỗi tải thông tin khóa học:", error);
      }
    };

    const fetchContentCourse = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/chapters/content/${courseId}`
        );
        setContents(response.data);
      } catch (error) {
        console.error(
          "Lỗi khi lấy chapters:",
          error.response?.data || error.message
        );
      }
    };

    fetchCourse();
    fetchContentCourse();
  }, [courseId]);

  const getVideoDuration = (videoUrl) => {
    if (!videoUrl) return "Chưa có video";
    const videoElement = document.createElement("video");
    videoElement.src = videoUrl;
    return new Promise((resolve) => {
      videoElement.onloadedmetadata = () => {
        const minutes = Math.floor(videoElement.duration / 60);
        const seconds = Math.floor(videoElement.duration % 60);

        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

        resolve(`${formattedMinutes}:${formattedSeconds}`);
      };
    });
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="custom-header">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigator("/courses")}
        ></Button>
        <Typography.Title
          level={4}
          style={{
            margin: 0,
            marginLeft: 12,
            color: "white",
          }}
        >
          {course.name}
        </Typography.Title>
      </Header>

      <Layout style={{ paddingTop: 64, paddingBottom: 64 }}>
        <Content
          style={{
            marginRight: showSider ? SIDEBAR_WIDTH : 0,
            transition: "margin-right 0.3s",
          }}
        >
          {children}
        </Content>

        {showSider && (
          <div
            style={{
              position: "fixed",
              top: 64,
              right: 0,
              width: SIDEBAR_WIDTH,
              height: "calc(100vh - 110px)",
              background: "#fff",
              padding: 16,
              overflowY: "auto",
              borderLeft: "1px solid #f0f0f0",
              zIndex: 1000,
            }}
          >
            <Typography.Title level={5}>Nội dung khóa học</Typography.Title>
            <Collapse expandIconPosition="end" style={{ width: "100%" }}>
              {contents.map((chapter, indexC) => (
                <Panel
                  className="custom-panel-header"
                  header={`${indexC + 1}. ${chapter.title}`}
                  key={chapter.id}
                >
                  <div className="custom-panel-content">
                    <ul>
                      {chapter.items.map((item, indexI) => (
                        <li key={item.id}>
                          <p>
                            {indexI + 1}. {item.title}
                          </p>
                          {item.type === "lecture" &&
                          item.video &&
                          item.video.file_url ? (
                            <p style={{ fontSize: 12, color: "#888" }}>
                              <span className="video-duration">
                                <PlayCircleOutlined
                                  style={{ marginRight: 8 }}
                                />{" "}
                                {getVideoDuration(item.video.file_url)}
                              </span>
                            </p>
                          ) : item.type === "code" ? (
                            <p style={{ fontSize: 12, color: "#888" }}>
                              <span>
                                <CodeOutlined style={{ marginRight: 8 }} /> code
                              </span>
                            </p>
                          ) : item.type === "quiz" ? (
                            <p style={{ fontSize: 12, color: "#888" }}>
                              <span>
                                <QuestionCircleOutlined
                                  style={{ marginRight: 8 }}
                                />{" "}
                                quiz
                              </span>
                            </p>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Panel>
              ))}
            </Collapse>
          </div>
        )}
      </Layout>

      <Footer className="custom-footer">
        <div>
          <Button style={{ marginRight: 10 }} icon={<ArrowLeftOutlined />}>
            Bài trước
          </Button>
          <Button>
            Bài tiếp theo <ArrowRightOutlined />
          </Button>
        </div>
        <Button type="primary" ghost onClick={() => setShowSider(!showSider)}>
          {showSider ? "Ẩn nội dung" : "Hiện nội dung"}
        </Button>
      </Footer>
    </Layout>
  );
};

export default CourseLayout;
