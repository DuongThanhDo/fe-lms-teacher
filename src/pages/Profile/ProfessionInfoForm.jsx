import React, { useEffect, useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";

const ProfessionInfoForm = () => {
  const [form] = Form.useForm();
  const user = useSelector((state) => state.auth.userInfo);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?.id) return;

    const fetchProfessionInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/professions/${user.id}`);
        const data = response.data;

        form.setFieldsValue({
          major: data.major || "",
          level: data.level || "",
          bio: data.bio || "",
        });
      } catch (error) {
        console.error("Lỗi tải thông tin chuyên ngành:", error);
      }
    };

    fetchProfessionInfo();
  }, [user?.id, form]);

  const handleSave = async (values) => {
    if (!user?.id) return;
    setLoading(true);

    try {
      await axios.put(`http://localhost:5000/professions/${user.id}`, {
        major: values.major || null,
        level: values.level || null,
        bio: values.bio || null,
      });

      message.success("Thông tin chuyên ngành đã được cập nhật!");
    } catch (error) {
      message.error("Lưu thông tin thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSave}>
      <Form.Item label="Chuyên ngành" name="major">
        <Input placeholder="Nhập chuyên ngành" />
      </Form.Item>
      <Form.Item label="Trình độ" name="level">
        <Input placeholder="Nhập trình độ" />
      </Form.Item>
      <Form.Item label="Kinh nghiệm làm việc" name="bio">
        <Input.TextArea placeholder="Nhập kinh nghiệm làm việc" rows={4} />
      </Form.Item>
      <Button type="primary" htmlType="submit" loading={loading}>
        Lưu thông tin
      </Button>
    </Form>
  );
};

export default ProfessionInfoForm;
