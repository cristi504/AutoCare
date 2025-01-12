import { useEffect } from "react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './generalStatus.css';

const Documents = () => {
  const user_id = localStorage.getItem("user_id"); //get the user_id from database and store it in localStorage
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [newDocument, setNewDocument] = useState({
    type: "",
    issue_date: "",
    expiry_date: "",
  });
  const [showPopup, setShowPopup] = useState(false); 
  const [selectedDocument, setSelectedDocument] = useState(null); //track selected document


  useEffect(() => {  // this function is called when page is loaded
    //fetch the project entries from the API
    fetch(`http://localhost:5000/users/${user_id}/cars`)
      .then((res) => res.json())   //res is converted in json
      .then((data) => {
        if (data.documents == undefined) {
          setDocuments([]);  //set the documents empty array if we don t have data
        }
        else {
          //console.log("Yolo docs = ", data.documents)
          setDocuments(data.documents);  //set the documents with the fetched data
        }


      });
  }, [user_id]);

  const handleInputChange = (e) => {  //e is a event object
    setNewDocument({ ...newDocument, [e.target.name]: e.target.value });
  };
//the { ...newDocument } part creates a shallow copy of the newDocument object to ensure that the original state is not modified


  const handleAddDocument = async () => {
    const response = await fetch(`http://localhost:5000/users/${user_id}/documents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDocument), //that s the body that is sent to api
    });
    const result = await response.json();
    if (response.ok) {
      setDocuments([...documents, newDocument]); //update documents with the new value added
      setShowPopup(false); //close the popup after add
    } else {
      console.error("Failed to add document:", result.error);
    }
  };
 
  const handleDeleteDocument = () => {
    if (!selectedDocument) {
      alert("Please select a document to delete.");
      return;
    }

    fetch(`http://localhost:5000/users/${user_id}/documents/${selectedDocument}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
          setDocuments(documents.filter((doc) => doc.doc_id !== selectedDocument)); //update the list
          setSelectedDocument(null); //reset selection
        } else {
          console.error("Failed to delete document:", data.error);
        }
      })
      .catch((error) => console.error("Error:", error));
  };
  return (
    <div className="page-container">
    <h1>Documents</h1>
    <table>
      <thead>
        <tr>
          <th>Select</th>
          <th>Type</th>
          <th>Issue Date</th>
          <th>Expiry Date</th>
        </tr>
      </thead>
      <tbody>
        {documents.map((doc) => (
          <tr key={doc.doc_id}>
            <td>
              <input
                type="radio"
                name="selectedDocument"
                value={doc.doc_id}
                onChange={() => setSelectedDocument(doc.doc_id)}
              />
            </td>
            <td>{doc.type}</td>
            <td>{doc.issue_date}</td>
            <td>{doc.expiry_date}</td>
          </tr>
        ))}
      </tbody>
    </table>
    {selectedDocument && (
        <button onClick={handleDeleteDocument}>Delete Selected Document</button>
    )}
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
          <button className="save-button"  onClick={handleAddDocument}>Save</button>
          <button className="cancel-button" onClick={() => setShowPopup(false)}>Cancel</button>
        </div>
      </div>
    )}
  </div>
  );
};


export default Documents;
