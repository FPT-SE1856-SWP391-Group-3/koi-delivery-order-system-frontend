import React from "react";
import "../css/BlogCard.css";
import blog1 from "../../../assets/blog1.jfif";
import blog2 from "../../../assets/blog2.jpg";
import blog3 from "../../../assets/blog3.jpg";
import blog4 from "../../../assets/blog4.jfif";

const BlogCard = () => {
  return (
    <div className="blog-container">
      <div className="main-card">
        <img src={blog1} alt="Main Blog Image" className="main-img" />
        <div className="main-content">
          <div className="main-text">
            <h3>
              <i className="icon"></i> Lorem ipsum dolor sit amet consectetur.
            </h3>
            <p>
              Lorem ipsum dolor sit amet consectetur. Senectus quam ipsum semper
              mollis nulla eget. Quam in duis consectetur accumsan.
            </p>
          </div>
          <a href="#" className="arrow-link">
            <i className="arrow-icon"></i>
          </a>
        </div>
      </div>

      <div className="side-cards">
        <div className="side-card">
          <img src={blog2} alt="Side Blog Image" className="side-img" />
          <div className="side-content">
            <h4>
              <i className="icon"></i> Lorem ipsum dolor sit amet consectetur.
            </h4>
            <p>
              Lorem ipsum dolor sit amet consectetur. Senectus quam ipsum semper
              mollis nulla eget.
            </p>
            <a href="#" className="arrow-link">
              <i className="arrow-icon"></i>
            </a>
          </div>
        </div>

        <div className="side-card">
          <img src={blog3} alt="Side Blog Image" className="side-img" />
          <div className="side-content">
            <h4>
              <i className="icon"></i> Lorem ipsum dolor sit amet consectetur.
            </h4>
            <p>
              Lorem ipsum dolor sit amet consectetur. Senectus quam ipsum semper
              mollis nulla eget.
            </p>
            <a href="#" className="arrow-link">
              <i className="arrow-icon"></i>
            </a>
          </div>
        </div>

        <div className="side-card">
          <img src={blog4} alt="Side Blog Image" className="side-img" />
          <div className="side-content">
            <h4>
              <i className="icon"></i> Lorem ipsum dolor sit amet consectetur.
            </h4>
            <p>
              Lorem ipsum dolor sit amet consectetur. Senectus quam ipsum semper
              mollis nulla eget.
            </p>
            <a href="#" className="arrow-link">
              <i className="arrow-icon"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
