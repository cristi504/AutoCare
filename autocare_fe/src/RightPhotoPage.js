import React from "react";
import { useNavigate } from "react-router-dom";

const RightPage = () => {
  const navigate = useNavigate();

  return (
    <div className="page-content">
      <h1>Martorii din Bord</h1>
      <p>
        Descoperă semnificațiile martorilor din bordul mașinii tale. Înțelege ce ar trebui să faci 
        și când este nevoie să acționezi de urgență.
      </p>
      <button onClick={() => navigate("/main")}>Înapoi la pagina principală</button>
    </div>
  );
};

export default RightPage;
