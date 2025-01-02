import React from "react";
import { useNavigate } from "react-router-dom";

const PreventiveMaintenance = () => {
  const navigate = useNavigate();
  
  return (
    <div className="page-container">
      <h1>Preventive Maintenance</h1>
      <p>This page is under construction.</p>
      <button onClick={() => navigate("/main")}>Înapoi la pagina principală</button>
    </div>
  );
};

export default PreventiveMaintenance;
