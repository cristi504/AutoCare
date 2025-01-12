import React ,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import './serviceIntervals.css';
const ServiceIntervals = () => {
  const user_id = localStorage.getItem("user_id"); //store the user_id in the localStorage
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
    setSelectedOption(selectedBrand); //this function works with the dropdown

    const car = serverData.find((e) => e.brand === selectedBrand);
    setSelectedCar(car); 
    setServiceEntries(car?.services || []); //if we don t have data , set it empty
  };

  const handleInputChange = (e) => { //at every input chande, update the data
    const { name, value } = e.target;
    setServiceEntry({ ...newServiceEntry, [name]: value });
  };

  const addCarHandler = async (date, km, service, description) => {
    if (!selectedCar) {
      alert("Please select a car before adding a service entry!");
      return;
    }

    const user_id = localStorage.getItem("user_id"); //get the user_id
    const car_ID = selectedCar.carID;//store the carID
    console.log("Car ID:", car_ID); //for debbuging

    try {
      const response = await fetch(`http://localhost:5000/users/${user_id}/cars/${car_ID}/services`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({date, km, service, description }),//this body is sent to the API
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
      await addCarHandler(newServiceEntry.date, newServiceEntry.km, newServiceEntry.service, newServiceEntry.description); //calls the function above to add a new service entry
      setServiceEntry({ date: "", km: "", service: "", description: "" }); //reset the fields
      setShowPopup(false); //close the popup
    } else {
      alert("Please fill out all fields!");
    }
  };

  useEffect(() => { //this is called when page is loaded to load the data from API
    fetch(`http://localhost:5000/users/${user_id}/cars`)
      .then((res) => res.json())
      .then((data) => {
        setOptions(data.cars.map((e) => e.brand)); //in the dropdown we can select the brand of the car 
        setServerData(data.cars);
        setSelectedCar(data.cars[0]); //first service entry shown is for the first car selected
        setServiceEntries(data.cars[0]?.services || []); //if we don t have data for the first car, then it s empty
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
