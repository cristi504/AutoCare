import React from "react";

const MainGrid = () => {
  return (
    <div className="main-grid">
      <button>INTERVALE SERVICE</button>
      <button>DOCUMENTE</button>
      <button>INTRETINERE PREVENTIVA</button>
      <button>PROBLEME TEHNICE</button>

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

      <button className="row-span">STATUS GENERAL</button>
      <button className="row-span">AI O PROBLEMA?</button>
    </div>
  );
};

export default MainGrid;

