import React, { useEffect, useState } from "react";
import { Form, Input, DatePicker, Select, Button, message } from "antd";
import { useSelector } from "react-redux";
import moment from "moment";
import axios from "axios";

const CourseOverview = () => {
  const [form] = Form.useForm();
  const user = useSelector((state) => state.auth.userInfo);
  const [loading, setLoading] = useState(false);
  const [courseId, setCourseId] = useState(null);

  useEffect(() => {
    if (!user?.id) return;

    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/courses/${user.id}`);
        const data = response.data;

        setCourseId(data.id);
        form.setFieldsValue({
          title: data.title || "",
          description: data.description || "",
          startDate: data.start_date ? moment(data.start_date) : null,
          category: data.category || "",
          duration: data.duration || "",
        });
      } catch (error) {
        console.error("Lỗi tải thông tin khóa học:", error);
      }
    };

    fetchCourseDetails();
  }, [user?.id, form]);

  const handleSave = async (values) => {
    if (!user?.id || !courseId) return;
    setLoading(true);

    try {
      await axios.put(`http://localhost:5000/courses/${courseId}`, {
        title: values.title || null,
        description: values.description || null,
        start_date: values.startDate ? values.startDate.format("YYYY-MM-DD") : null,
        category: values.category || null,
        duration: values.duration || null,
      });

      message.success("Thông tin khóa học đã được cập nhật thành công!");
    } catch (error) {
      message.error("Lưu thông tin thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSave}>
      <Form.Item label="Tên khóa học" name="title">
        <Input placeholder="Nhập tên khóa học" />
      </Form.Item>
      <Form.Item label="Mô tả khóa học" name="description">
        <Input.TextArea placeholder="Nhập mô tả khóa học" rows={4} />
      </Form.Item>
      <Form.Item label="Ngày bắt đầu" name="startDate">
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item label="Danh mục" name="category">
        <Select>
          <Select.Option value="frontend">Frontend</Select.Option>
          <Select.Option value="backend">Backend</Select.Option>
          <Select.Option value="fullstack">Fullstack</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Thời gian học (tuần)" name="duration">
        <Input placeholder="Nhập thời gian học" />
      </Form.Item>
      <Button type="primary" htmlType="submit" loading={loading}>
        Lưu thông tin
      </Button>
    </Form>
  );
};

export default CourseOverview;
