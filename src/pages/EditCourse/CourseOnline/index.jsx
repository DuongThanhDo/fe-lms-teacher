import React from "react";
import { Tabs, Button, Flex } from "antd";
import CourseOverview from "./CourseOverview";
import Curriculum from "./Curriculum";
import TargetStudents from "./TargetStudents";
import CourseImageUpload from "./CourseImageUpload";

const { TabPane } = Tabs;

const CourseOnline = () => {
  return (
    <div className="container mt-4">
      <div style={{ display:"flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Thông tin khóa học</h2>
        <Button type="primary" style={{ marginTop: 20 }}>
          Gửi đi để xem xét
        </Button>
      </div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Tổng quan khóa học" key="1">
          <CourseOverview />
        </TabPane>
        <TabPane tab="Chương trình giảng dạy" key="2">
          <Curriculum />
        </TabPane>
        <TabPane tab="Học viên mục tiêu" key="3">
          <TargetStudents />
        </TabPane>
        <TabPane tab="Hình ảnh khóa học" key="4">
          <CourseImageUpload />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default CourseOnline;
