import { useEffect } from "react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Documents = () => {
  const user_id = localStorage.getItem("user_id");
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [newDocument, setNewDocument] = useState({
    type: "",
    issue_date: "",
    expiry_date: "",
});
const [showPopup, setShowPopup] = useState(false);


 useEffect(() => {
      // Fetch the project entries from the API
      fetch(`http://localhost:5000/users/${user_id}/cars`)
          .then((res) => res.json())
          .then((data) => {
            if(data.documents == undefined) 
            {
              setDocuments([ ]);
            }
            else
            {
              console.log("Yolo cars = ", data.documents)
              setDocuments(data.documents);
            }
              
              
          });
  }, [user_id]);

const handleInputChange = (e) => {
    setNewDocument({ ...newDocument, [e.target.name]: e.target.value });
};


const handleAddDocument = async () => {
  const response = await fetch(`http://localhost:5000/users/${user_id}/documents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newDocument),
  });
  const result = await response.json();
  if (response.ok) {
    setDocuments([...documents, newDocument]);
    setShowPopup(false);
  } else {
    console.error("Failed to add document:", result.error);
  }
};

return (
    <div className="page-container">
        <h1>Documents</h1>
        <table>
            <thead>
                <tr>
                    <th>Type</th>
                    <th>Issue Date</th>
                    <th>Expiry Date</th>
                </tr>
            </thead>
            <tbody>
                {documents.map((doc, index) => (
                    <tr key={index}>
                        <td>{doc.type}</td>
                        <td>{doc.issue_date}</td>
                        <td>{doc.expiry_date}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <button onClick={() => setShowPopup(true)}>Add Document</button>
        {showPopup && (
            <div className="popup">
                <div className="popup-content">
                    <h2>Add a New Document</h2>
                    <input
                        type="text"
                        name="type"
                        placeholder="Type"
                        value={newDocument.type}
                        onChange={handleInputChange}
                    />
                    <input
                        type="date"
                        name="issue_date"
                        placeholder="Issue Date"
                        value={newDocument.issue_date}
                        onChange={handleInputChange}
                    />
                    <input
                        type="date"
                        name="expiry_date"
                        placeholder="Expiry Date"
                        value={newDocument.expiry_date}
                        onChange={handleInputChange}
                    />
                    <button onClick={handleAddDocument}>Save</button>
                    <button onClick={() => setShowPopup(false)}>Cancel</button>
                </div>
            </div>
        )}
    </div>
);
};


export default Documents;
