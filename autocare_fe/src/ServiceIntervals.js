import React from "react";
import { useNavigate } from "react-router-dom";

const ServiceIntervals = () => {
  const navigate = useNavigate();
  
  return (
    <div className="page-container">
      <h1>Service Intervals</h1>
      <p>This page is under construction.</p>
      <button onClick={() => navigate("/")}>Înapoi la pagina principală</button>
    </div>
  );
};

export default ServiceIntervals;
