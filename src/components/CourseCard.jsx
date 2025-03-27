import React from "react";
import { Card, Badge } from "react-bootstrap";
import "../assets/css/CourseCard.css";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
  <Link style={{textDecoration: "none"}} to={`/course/${course.id}`}>
        <Card className="shadow-sm border-0 course-card">
          <div className="image-container">
            <Card.Img variant="top" src={course.image} alt={course.title} />
          </div>
          <Card.Body>
            <Card.Title className="course-title">{course.title}</Card.Title>
            <Card.Text className="text-muted">{course.instructor}</Card.Text>
            <Badge bg="success">{course.isOnline ? "Online" : "Offline"}</Badge>
            <div className="mt-2">
              <strong className="text-primary">{course.price}đ</strong>{" "}
              <del className="text-muted">{course.oldPrice}đ</del>
            </div>
          </Card.Body>
        </Card>
    </Link>
  );
};

export default CourseCard;
