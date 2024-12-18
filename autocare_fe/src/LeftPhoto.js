import React from "react";
import { useNavigate } from "react-router-dom";

const LeftPhoto = () => {
  const navigate = useNavigate();

  return (
    <div className="photo-wrapper left-photo">
      <a onClick={() => navigate("/left-photo")}>
        <img src="/static/left-image.jpg" alt="Left Image" />
        <span className="overlay-text">Documente Necesare</span>
      </a>
    </div>
  );
};

export default LeftPhoto;
