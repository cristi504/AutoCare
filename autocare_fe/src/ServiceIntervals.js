import React ,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import './serviceIntervals.css';
const ServiceIntervals = () => {
  const user_id = localStorage.getItem("user_id");
  const navigate = useNavigate();

  const [options, setOptions] = useState([]);
  const [serverData, setServerData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedCar, setSelectedCar] = useState(null); // Store the selected car
  const [serviceEntries, setServiceEntries] = useState([]);
  const [newServiceEntry, setServiceEntry] = useState({ date: "", km: "", service: "", description: "" });
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const selectedBrand = event.target.value;
    setSelectedOption(selectedBrand);

    const car = serverData.find((e) => e.brand === selectedBrand);
    setSelectedCar(car); 
    setServiceEntries(car?.services || []);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setServiceEntry({ ...newServiceEntry, [name]: value });
  };

  const addCarHandler = async (date, km, service, description) => {
    if (!selectedCar) {
      alert("Please select a car before adding a service entry!");
      return;
    }

    const user_id = localStorage.getItem("user_id");
    const car_ID = selectedCar.carID;
    console.log("Car ID:", car_ID); 

    try {
      const response = await fetch(`http://localhost:5000/users/${user_id}/cars/${car_ID}/services`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({date, km, service, description }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Service added successfully");
      } else {
        alert(data.error || "Failed to add service entry");
      }
    } catch (err) {
      console.error("Error connecting to the server:", err);
      alert("Error connecting to the server");
    }
  };

  const handleAddService = async () => {
    if (newServiceEntry.date && newServiceEntry.km && newServiceEntry.service && newServiceEntry.description) {
      await addCarHandler(newServiceEntry.date, newServiceEntry.km, newServiceEntry.service, newServiceEntry.description);
      setServiceEntry({ date: "", km: "", service: "", description: "" }); 
      setShowPopup(false);
    } else {
      alert("Please fill out all fields!");
    }
  };

  useEffect(() => {
    fetch(`http://localhost:5000/users/${user_id}/cars`)
      .then((res) => res.json())
      .then((data) => {
        setOptions(data.cars.map((e) => e.brand));
        setServerData(data.cars);
        setSelectedCar(data.cars[0]);
        setServiceEntries(data.cars[0]?.services || []);
      });
  }, [user_id]);

  return (
    <div className="page-container">
      <div>
        <label htmlFor="dropdown">Choose an option: </label>
        <select id="dropdown" value={selectedOption} onChange={handleChange}>
          <option value="" disabled>Select an option</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Km</th>
            <th>Service</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {serviceEntries.map((entry, index) => (
            <tr key={index}>
              <td>{entry.date}</td>
              <td>{entry.km}</td>
              <td>{entry.service}</td>
              <td>{entry.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setShowPopup(true)}>Add Service Entry</button>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Add a New Service Entry</h2>
            <input type="date" name="date" value={newServiceEntry.date} onChange={handleInputChange} />
            <input type="text" name="km" placeholder="Km" value={newServiceEntry.km} onChange={handleInputChange} />
            <input type="text" name="service" placeholder="Service" value={newServiceEntry.service} onChange={handleInputChange} />
            <input type="text" name="description" placeholder="Description" value={newServiceEntry.description} onChange={handleInputChange} />
            <button onClick={handleAddService}>Save</button>
            <button onClick={() => setShowPopup(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceIntervals;
