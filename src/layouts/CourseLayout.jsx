import React, { useEffect, useState, useCallback } from "react";
import { Button, Layout } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../assets/css/CourseLayout.css";
import SidebarCourse from "../components/Layout/SidebarCourse";
import CourseHeader from "../components/Layout/CourseHeader";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

const { Content, Footer } = Layout;
const SIDEBAR_WIDTH = 320;

const fetchCourseData = async (courseId) => {
  try {
    const courseResponse = await axios.get(
      `http://localhost:5000/courses/${courseId}`
    );
    const contentsResponse = await axios.get(
      `http://localhost:5000/chapters/content/${courseId}`
    );
    return { course: courseResponse.data, contents: contentsResponse.data };
  } catch (error) {
    console.error("Lỗi tải thông tin khóa học:", error);
    return { course: null, contents: [] };
  }
};

const CourseLayout = ({ children }) => {
  const [showSider, setShowSider] = useState(true);
  const [course, setCourse] = useState(null);
  const [contents, setContents] = useState([]);
  const [durations, setDurations] = useState({});
  const [selectedItem, setSelectedItem] = useState({ type: null, id: null });

  const { courseId } = useParams();
  const navigator = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const pathParts = pathname.split("/");
  const itemType = pathParts[3];
  const itemId = pathParts[4];

  useEffect(() => {
    if (!courseId) return;

    const loadData = async () => {
      const { course, contents } = await fetchCourseData(courseId);
      setCourse(course);
      setContents(contents);
      handleDurations(contents);
    };

    loadData();
  }, [courseId]);

  useEffect(() => {
    setSelectedItem({ type: itemType, id: itemId });
  }, [itemType, itemId]);

  const getVideoDuration = useCallback((videoUrl) => {
    return new Promise((resolve) => {
      const video = document.createElement("video");
      video.preload = "metadata";
      video.src = videoUrl;
      video.onloadedmetadata = () => {
        const minutes = Math.floor(video.duration / 60);
        const seconds = Math.floor(video.duration % 60);
        const formatted = `${minutes < 10 ? "0" : ""}${minutes}:${
          seconds < 10 ? "0" : ""
        }${seconds}`;
        resolve(formatted);
      };
      video.onerror = () => resolve("00:00");
    });
  }, []);

  const handleDurations = useCallback(
    async (data) => {
      const result = {};
      for (const chapter of data) {
        for (const item of chapter.items) {
          if (item.type === "lecture" && item.video?.file_url) {
            const duration = await getVideoDuration(item.video.file_url);
            result[item.id] = duration;
          }
        }
      }
      setDurations(result);
    },
    [getVideoDuration]
  );

  const handleClickItem = useCallback(
    (item) => {
      const pathMap = {
        lecture: "lecture",
        code: "code",
        quiz: "quiz",
      };

      const path = pathMap[item.type];
      if (path) {
        setSelectedItem({ type: path, id: item.id });
        navigator(`/courses/${courseId}/${path}/${item.id}`);
      }
    },
    [courseId, navigator]
  );

  const getPreviousAndNextItem = (currentItem) => {
    let previousItem = null;
    let nextItem = null;
    let chapterCurrent = null;
  
    for (let i = 0; i < contents.length; i++) {
      const chapter = contents[i];
      const items = chapter.items;
  
      const currentIndex = items.findIndex((item) => (item.id == currentItem.id && item.type == currentItem.type));
  
      if (currentIndex !== -1) {
        if (currentIndex > 0) {
          previousItem = items[currentIndex - 1];
        } else {
          if (i === 0 && currentIndex === 0) {
            previousItem = null;
          } else {
            if (i > 0) {
              previousItem = contents[i - 1].items[contents[i - 1].items.length - 1];
            }
          }
        }
  
        if (currentIndex < items.length - 1) {
          nextItem = items[currentIndex + 1];
        } else {
          if (i === contents.length - 1 && currentIndex === items.length - 1) {
            nextItem = null;
          } else {
            if (i < contents.length - 1) {
              nextItem = contents[i + 1].items[0];
            }
          }
        }
        chapterCurrent = chapter;
        break;
      }
    }
  
    return { previousItem, nextItem, chapterCurrent };
  };
  

  const { previousItem, nextItem, chapterCurrent } = getPreviousAndNextItem(selectedItem);

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "white" }}>
      <CourseHeader course={course} navigator={navigator} />

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
          <SidebarCourse
            chapter={chapterCurrent}
            contents={contents}
            selectedItem={selectedItem}
            handleClickItem={handleClickItem}
            durations={durations}
          />
        )}
      </Layout>

      <Footer className="custom-footer">
        <div>
          <Button
            style={{ marginRight: 10 }}
            icon={<ArrowLeftOutlined />}
            onClick={() =>
              navigator(
                `/courses/${courseId}/${previousItem.type}/${previousItem.id}`
              )
            }
            disabled={!previousItem}
          >
            Bài trước
          </Button>

          <Button
            onClick={() =>
              navigator(`/courses/${courseId}/${nextItem.type}/${nextItem.id}`)
            }
            disabled={!nextItem}
          >
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
