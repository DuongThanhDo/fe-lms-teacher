import React, { useState } from "react";
import { Card, Button, Input, Dropdown, Menu } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined, CheckOutlined } from "@ant-design/icons";

const Curriculum = () => {
  const [sections, setSections] = useState([
    {
      id: 1,
      title: "Giới thiệu",
      items: [{ id: 1, type: "lecture", title: "Mở đầu", video: null }],
    },
  ]);
  const [editingSection, setEditingSection] = useState(null);
  const [hoveredSection, setHoveredSection] = useState(null);

  const addItem = (sectionIndex, type) => {
    const newItem = {
      id: Date.now(),
      type,
      title:
        type === "lecture"
          ? "Bài giảng mới"
          : type === "quiz"
          ? "Bài tập trắc nghiệm"
          : "Bài tập coding",
      video: null,
      content: "",
    };
    const updatedSections = [...sections];
    updatedSections[sectionIndex].items.push(newItem);
    setSections(updatedSections);
  };

  const addSection = () => {
    setSections([...sections, { id: Date.now(), title: "Phần mới", items: [] }]);
  };

  const deleteSection = (sectionIndex) => {
    setSections(sections.filter((_, index) => index !== sectionIndex));
  };

  const editSectionTitle = (index, newTitle) => {
    const updatedSections = [...sections];
    updatedSections[index].title = newTitle;
    setSections(updatedSections);
  };

  return (
    <div>
      {sections.map((section, sectionIndex) => (
        <Card
          key={section.id}
          className="mb-3"
          title={
            <div
              onMouseEnter={() => setHoveredSection(sectionIndex)}
              onMouseLeave={() => setHoveredSection(null)}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
            >
              {editingSection === sectionIndex ? (
                <Input
                  value={section.title}
                  onChange={(e) => editSectionTitle(sectionIndex, e.target.value)}
                  onBlur={() => setEditingSection(null)}
                  autoFocus
                  style={{ width: "80%" }}
                />
              ) : (
                <span>{`Phần ${sectionIndex + 1}: ${section.title}`}</span>
              )}
              {hoveredSection === sectionIndex && (
                <div>
                  <Button icon={<EditOutlined />} onClick={() => setEditingSection(sectionIndex)} />
                  <Button danger icon={<DeleteOutlined />} onClick={() => deleteSection(sectionIndex)} />
                </div>
              )}
            </div>
          }
        >
          {section.items.map((item, itemIndex) => (
            <div key={item.id} style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
              <Input value={item.title} style={{ flex: 1 }} readOnly />
            </div>
          ))}

          <Dropdown
            overlay={
              <Menu>
                <Menu.Item onClick={() => addItem(sectionIndex, "lecture")}>Bài giảng</Menu.Item>
                <Menu.Item onClick={() => addItem(sectionIndex, "coding")}>Bài tập coding</Menu.Item>
                <Menu.Item onClick={() => addItem(sectionIndex, "quiz")}>Bài tập trắc nghiệm</Menu.Item>
              </Menu>
            }
          >
            <Button icon={<PlusOutlined />}>Mục mới</Button>
          </Dropdown>
        </Card>
      ))}

      <Button type="dashed" onClick={addSection} icon={<PlusOutlined />}>
        Thêm phần
      </Button>
    </div>
  );
};

export default Curriculum;