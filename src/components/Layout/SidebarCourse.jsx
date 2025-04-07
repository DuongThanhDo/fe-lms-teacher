import React, { useEffect, useState } from "react";
import { Typography, Collapse } from "antd";
import { PlayCircleOutlined, CodeOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import '../../assets/css/CourseLayout.css'

const { Panel } = Collapse;

const SidebarCourse = ({ chapter, contents, selectedItem, handleClickItem, durations }) => {
  const [activeKeys, setActiveKeys] = useState([]);

  useEffect(() => {
    if (chapter?.id && !activeKeys.includes(chapter.id)) {
      setActiveKeys(prevKeys => [...prevKeys, chapter.id]);
    }
  }, [chapter]);

  const renderIconAndDuration = (item) => {
    const style = { fontSize: 12, color: "#888" };
    const durationText = durations[item.id] || "Đang tải...";

    if (item.type === "lecture" && item.video?.file_url) {
      return <p style={style}><PlayCircleOutlined style={{ marginRight: 8 }} />{durationText}</p>;
    }
    if (item.type === "code") {
      return <p style={style}><CodeOutlined style={{ marginRight: 8 }} />code</p>;
    }
    if (item.type === "quiz") {
      return <p style={style}><QuestionCircleOutlined style={{ marginRight: 8 }} />quiz</p>;
    }
    return null;
  };

  const handleCollapseChange = (keys) => {
    setActiveKeys(keys)
  };

  if (!contents || contents.length === 0) {
    return null;
  }

  return (
    <div style={{ position: "fixed", top: 64, right: 0, width: 320, height: "calc(100vh - 110px)", background: "#fff", padding: 16, overflowY: "auto", borderLeft: "1px solid #f0f0f0", zIndex: 1000 }}>
      <Typography.Title level={5}>Nội dung khóa học</Typography.Title>
      <Collapse expandIconPosition="end" style={{ width: "100%" }} defaultActiveKey={[chapter?.id]} activeKey={activeKeys} onChange={handleCollapseChange} >
        {contents.map((chapter, indexC) => (
          <Panel className="custom-panel-header" header={`${indexC + 1}. ${chapter.title}`} key={chapter.id}>
            <div className="custom-panel-content">
              <ul>
                {chapter.items.map((item, indexI) => (
                  <li
                    onClick={() => handleClickItem(item)}
                    key={item.id}
                    className={selectedItem.type == item.type && selectedItem.id == item.id ? "selected-item" : ""}
                  >
                    <p>{indexI + 1}. {item.title}</p>
                    {renderIconAndDuration(item)}
                  </li>
                ))}
              </ul>
            </div>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default SidebarCourse;
