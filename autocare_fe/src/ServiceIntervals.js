import React ,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ServiceIntervals = () => {
  const user_id = localStorage.getItem("user_id");
  const navigate = useNavigate();
  const [options ,setOptions] = useState([]); 
    const [showPopup, setShowPopup] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [newServiceEntry, setServiceEntry] = useState({ date: "", km: "", service: "", description: " " });
  const [serverData, setServerData] = useState([]);
  const [serviceEntries, setServiceEntries] = useState([]);
    const [error, setError] = useState('');


  const handleChange = (event) => {
  setSelectedOption(event.target.value); 
  const selectedCar = serverData.filter(e =>e.brand == event.target.value )[0];
  console.log(selectedCar);
  setServiceEntries(selectedCar.services);
 };
 const handleInputChange = (e) => {
  const { name, value } = e.target;
  setServiceEntry({ ...newServiceEntry, [name]: value });
};
const  handleAddService = async () => {
  if (newServiceEntry.date && newServiceEntry.km && newServiceEntry.service && newServiceEntry.description) {
    setServiceEntries([...serviceEntries, { ...newServiceEntry }]);
    setShowPopup(false);
    await addCarHandler(newServiceEntry.date,newServiceEntry.km,newServiceEntry.service , newServiceEntry.description)
    setServiceEntry({ date: "", km: "", service: "", description :"" }); // Reset the form
  } else {
    alert("Please fill out all fields!");
  }
};
const addCarHandler = async (date,km,service,description) =>{
  
  setError('');

  try{
      const user_id = localStorage.getItem("user_id");
      const response = await fetch(`http://localhost:5000/users/${user_id}/cars`,{
        method :'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({date,km,service,description}),
      });

      const data=  await response.json();
      if(response.ok)
      {
        alert("It s ok");
      }
      else{
        setError(data.error || 'add car Failed');
        alert(error)
      }
  }
  catch (err){
      setError('Error connecting to server');
  }
}


 
     useEffect(() => {
       // Fetch the project entries from the API
       fetch(`http://localhost:5000/users/${user_id}/cars`)
           .then((res) => res.json())
           .then((data) => {
               console.log("Yolo cars = ", data.cars)
               setOptions(data.cars.map(e => e.brand));
               setServerData(data.cars);
               setServiceEntries(data.cars[0].services);
           });
   }, [user_id]);
 
//  const serviceEntries = [
//     { date: "20/10/2020", km: "100000", service: "Stoienesti", description: "Revizie" },
//     { date: "21/12/2022", km: "150000", service: "Palanca", description: "Revizie2" },
//   ];
  
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
    <button onClick={() => setShowPopup(true)}> Adauga Service Entry  </button>
    {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Add a New Car</h2>
            <input
              type="date"
              name="date"
              placeholder="Date"
              value={newServiceEntry.date}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="km"
              placeholder="Km"
              value={newServiceEntry.km}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="service"
              placeholder="Service"
              value={newServiceEntry.service}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={newServiceEntry.description}
              onChange={handleInputChange}
            />
            <button className="save-button" onClick={handleAddService}>
              Save
            </button>
            <button className="cancel-button" onClick={() => setShowPopup(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceIntervals;
