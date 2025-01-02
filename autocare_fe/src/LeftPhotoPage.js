import React from "react";
import { useNavigate } from "react-router-dom";

const LeftPage = () => {
  const navigate = useNavigate();

  return (
    <div className="page-content">
      <h1>Documente Necesare</h1>
      <p>
        Aici poți afla toate informațiile legate de documentele necesare pentru mecanic, ITP, și RAR. 
        Este important să ai aceste documente pregătite pentru a evita întârzierile.
      </p>
      <button onClick={() => navigate("/main")}>Înapoi la pagina principală</button>
    </div>
  );
};

export default LeftPage;
