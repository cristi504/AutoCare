import React from "react";
import { useNavigate } from "react-router-dom";

const TechnicalIssues = () => {
  const navigate = useNavigate();
  
  return (
    <div className="page-container">
      <h1>Technical Issues</h1>
      <p>This page is under construction.</p>
      <button onClick={() => navigate("/main")}>Înapoi la pagina principală</button>
    </div>
  );
};

export default TechnicalIssues;
