import React from "react";
import { useNavigate } from "react-router-dom";

const RightPhoto = () => {
  const navigate = useNavigate();

  return (
    <div className="photo-wrapper right-photo">
      <a onClick={() => navigate("/right-photo")}>
        <img src="/static/right-image.jpg" alt="Right Image" />
        <span className="overlay-text">Martorii din Bord</span>
      </a>
    </div>
  );
};

export default RightPhoto;
