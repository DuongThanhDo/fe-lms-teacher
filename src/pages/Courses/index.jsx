import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Input, Select, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import ModalCreateCourse from "../../components/ModalCreateCourse";
import CourseList from "../../components/CourseList";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../store/slices/categorySlice";

const { Option } = Select;

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState(null);
  const [type, setType] = useState(null);
  const [status, setStatus] = useState(null);

  const user = useSelector((state) => state.auth.userInfo);
  const categories = useSelector((state) => state.categories.list);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/courses/teacher",
        {
          params: { teacherId: user.id, searchValue, category, type, status },
        }
      );
      setCourses(response.data);
    } catch (error) {
      console.error("Lỗi khi tải khóa học:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSearch = () => {
    fetchCourses();
    console.log(courses);
  };

  return (
    <Container className="my-4">
      <div className="w-100 d-flex flex-wrap align-items-center justify-content-between gap-2 py-3 bg-white rounded mb-3">
        <Input
          placeholder="Tìm kiếm"
          style={{ maxWidth: "50%" }}
          allowClear
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        <Select
          placeholder="Danh mục"
          style={{ minWidth: "200px" }}
          value={category}
          onChange={(value) => setCategory(value)}
          allowClear
        >
          {categories.map((category) => 
            <Option value={category.id}>{category.name}</Option>
          )}

        </Select>

        <Select
          placeholder="Loại"
          style={{ minWidth: "100px" }}
          value={type}
          onChange={(value) => setType(value)}
          allowClear
        >
          <Option value="online">Online</Option>
          <Option value="offline">Offline</Option>
        </Select>

        <Select
          placeholder="Trạng thái"
          style={{ minWidth: "100px" }}
          value={status}
          onChange={(value) => setStatus(value)}
          allowClear
        >
          <Option value="draft">Nháp</Option>
          <Option value="pending">Chờ duyệt</Option>
          <Option value="published">Đã đăng</Option>
          <Option value="hidden">Ẩn</Option>
          <Option value="rejected">Bị từ chối</Option>
        </Select>

        <Button
          type="primary"
          icon={<SearchOutlined />}
          className="!ml-2"
          onClick={handleSearch}
        />

        <div className="bg-teal-600 flex items-center !ml-2">
          <ModalCreateCourse />
        </div>
      </div>

      <CourseList courses={courses} />
    </Container>
  );
};

export default Courses;
