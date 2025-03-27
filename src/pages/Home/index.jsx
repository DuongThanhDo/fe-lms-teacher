import React from "react";
import HeroSection from "../../components/HeroSection";
import { Col, Row } from "react-bootstrap";
import CourseCard from "../../components/CourseCard";
import { assets } from "../../assets";
import { Button } from "antd";

const fakeCourses = [
  {
    id: 1,
    title: "Khóa học ReactJS từ cơ bản đến nâng cao",
    instructor: "Nguyễn Văn A",
    price: "499.000",
    oldPrice: "999.000",
    image: assets.images.about1,
    isOnline: true,
  },
  {
    id: 2,
    title: "Lập trình Java chuyên sâu",
    instructor: "Trần Văn B",
    price: "299.000",
    oldPrice: "599.000",
    image: assets.images.banner1,
    isOnline: false,
  },
  {
    id: 3,
    title: "Thiết kế giao diện với Figma",
    instructor: "Lê Thị C",
    price: "199.000",
    oldPrice: "399.000",
    image: assets.images.about1,
    isOnline: true,
  },
  {
    id: 4,
    title: "Python cho người mới bắt đầu",
    instructor: "Phạm Văn D",
    price: "399.000",
    oldPrice: "799.000",
    image: assets.images.about1,
    isOnline: true,
  },
];

const topics = [
  "Công nghệ phần mềm",
  "Công nghệ phần mềm",
  "Công nghệ phần mềm",
  "Công nghệ phần mềm",
  "Công nghệ phần mềm",
  "Công nghệ phần mềm",
  "Công nghệ phần mềm",
  "Công nghệ phần mềm",
];

const Home = () => {
  return (
    <>
      <HeroSection />

      <h1 style={{ color: "#1B8381", marginTop: "40px", marginBottom: "60px" }}>
        Khóa học sẽ học tiếp theo
      </h1>

      <h2>Được đề xuất cho bạn</h2>
      <Row className="my-5">
        {fakeCourses.map((course) => (
          <Col key={course.id} md={6} lg={4} xl={3} className="mb-4">
            <CourseCard course={course} />
          </Col>
        ))}
      </Row>

      <h2>Khóa học miễn phí</h2>
      <Row className="my-5">
        {fakeCourses.map((course) => (
          <Col key={course.id} md={6} lg={4} xl={3} className="mb-4">
            <CourseCard course={course} />
          </Col>
        ))}
      </Row>

      <div
        style={{ background: "#E6FFFB", padding: "40px 32px", borderRadius: "8px", marginBottom: "100px" }}
      >
        <h2 style={{ color: "#00796B" }}>Chủ đề đề xuất dành cho bạn</h2>
        <Row className="g-4 mt-2">
          {topics.map((topic, index) => (
            <Col key={index} xs={12} md={3}>
              <Button
                type="primary"
                style={{ width: "100%", height: "60px", backgroundColor: "#1B8381", borderColor: "#1B8381" }}
              >
                {topic}
              </Button>
            </Col>
          ))}
        </Row>
      </div>

      
      <h1 style={{ color: "#1B8381", marginTop: "40px", marginBottom: "60px" }}>
        Khóa học có thể bạn quan tâm
      </h1>

      <h2>Khóa học hàng đầu về công nghệ phần mềm</h2>
      <Row className="my-5">
        {fakeCourses.map((course) => (
          <Col key={course.id} md={6} lg={4} xl={3} className="mb-4">
            <CourseCard course={course} />
          </Col>
        ))}
      </Row>

      <h2>Khóa học hàng đầu về an toàn thông tin</h2>
      <Row className="my-5">
        {fakeCourses.map((course) => (
          <Col key={course.id} md={6} lg={4} xl={3} className="mb-4">
            <CourseCard course={course} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Home;
