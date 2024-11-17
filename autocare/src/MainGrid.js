import React from "react";
import { useNavigate } from "react-router-dom";

const MainGrid = () => {
  const navigate = useNavigate();
  return (
    <div className="main-grid">
      <button onClick={() => navigate("/service-intervals")}>INTERVALE SERVICE</button>
      <button onClick={() => navigate("/documents")}>DOCUMENTE</button>
      <button onClick={() => navigate("/preventive-maintenance")}>INTRETINERE PREVENTIVA</button>
      <button onClick={() => navigate("/technical-issues")}>PROBLEME TEHNICE</button>

      <div className="photo-wrapper left-photo">
        <a href="left-page.html">
          <img src="/static/left-image.jpg" alt="Left Image" />
          <span className="overlay-text">Documente necesare.</span>
        </a>
      </div>

      <div className="photo-wrapper right-photo">
        <a href="right-page.html">
          <img src="/static/right-image.jpg" alt="Right Image" />
          <span className="overlay-text">Martorii din Bord.</span>
        </a>
      </div>

      <button className="row-span" onClick={() => navigate("/general-status")}>STATUS GENERAL</button>
      <button className="row-span" onClick={() => navigate("/problem")}>AI O PROBLEMA?</button>
    </div>
  );
};

export default MainGrid;

