import React, { useEffect, useState } from "react";
import { Layout, Button, Typography, Collapse } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import "../assets/css/CourseLayout.css";  // Import CSS file
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
