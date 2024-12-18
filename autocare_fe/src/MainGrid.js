import React from "react";
import { useNavigate } from "react-router-dom";
import LeftPhoto from "./LeftPhoto";
import RightPhoto from "./RightPhoto";

const MainGrid = () => {
  const navigate = useNavigate();
  return (
    <div className="main-grid">
      <button onClick={() => navigate("/service-intervals")}>INTERVALE SERVICE</button>
      <button onClick={() => navigate("/documents")}>DOCUMENTE</button>
      <button onClick={() => navigate("/preventive-maintenance")}>INTRETINERE PREVENTIVA</button>
      <button onClick={() => navigate("/technical-issues")}>PROBLEME TEHNICE</button>

      <LeftPhoto />
      <RightPhoto />

      <button className="row-span" onClick={() => navigate("/general-status")}>STATUS GENERAL</button>
      <button className="row-span" onClick={() => navigate("/problem")}>AI O PROBLEMA?</button>
    </div>
  );
};

export default MainGrid;

