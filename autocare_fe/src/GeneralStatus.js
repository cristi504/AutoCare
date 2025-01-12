import React , {useState}  from "react";
import { useNavigate } from "react-router-dom";
import './statusgeneral.css';
import { useEffect } from "react";
import './generalStatus.css';

const GeneralStatus = () => {
  const user_id = localStorage.getItem("user_id"); //store in localStorate the user_id
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [newCar, setNewCar] = useState({ brand: "", model: "", year: "" , vin:"" , enginecapacity: "", power:"" });
  const [error, setError] = useState(''); 
  const [cars, setCars] = useState([
    { brand: " ", model: " ", year:'' , vin: " ", enginecapacity:"", power:""  }]);
 
    useEffect(() => {
      fetch(`http://localhost:5000/users/${user_id}/cars`)  //load data,this function is called when page is loaded
          .then((res) => res.json())
          .then((data) => {
            if(data.cars == undefined) 
            {
              setCars([ ]);
            }
            else
            {
             // console.log("Yolo cars = ", data.cars)   //for debbuging
              setCars(data.cars); //put the data loaded in the table(page)
            }
              
              
          });
  }, [user_id]);


  const handleInputChange = (e) => {  //at every key press in the input it gets updated
    const { name, value } = e.target;
    setNewCar({ ...newCar, [name]: value }); 
  };
  const  handleAddCar = async () => {
    if (newCar.brand && newCar.model && newCar.year &&newCar.vin &&newCar.enginecapacity&&newCar.power) {
      setCars([...cars, { ...newCar}]); //update the cars array with the new one
      setShowPopup(false); //close the popup
      await addCarHandler(newCar.brand,newCar.model,newCar.year,newCar.vin,newCar.enginecapacity,newCar.power) //calls the function to send data to the backend
      setNewCar({ brand: "", model: "", year: "" ,vin:"", enginecapacity:"" , power:""}); //reset the "form"
    } else {
      alert("Please fill out all fields!");
    }
  };
  const addCarHandler = async (brand,model,year,vin,enginecapacity,power) =>{
    
    setError('');

    try{
        const user_id = localStorage.getItem("user_id"); // get the user_id
        const response = await fetch(`http://localhost:5000/users/${user_id}/cars`,{
          method :'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({brand,model,year,vin,enginecapacity,power}), //this body is sent to the API
        });

        const data=  await response.json();
        if(response.ok)
        {
          alert("Car added succesfully");
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
  
  // const cars = [
  //   { brand: "Toyota", model: "Corolla", year: 2020, vin: "1HGBH41JXMN109186" },
  //   { brand: "Ford", model: "Mustang", year: 2018, vin: "1FAFP4041XF108632" },
  // ];
  return (
    <div className="containers">
    <h1>Cars List</h1>
    <table>
      <thead>
        <tr>
          <th>Brand</th>
          <th>Model</th>
          <th>Year</th>
          <th>VIN</th>
          <th>Engine Capacity</th>
          <th>Power</th>
        </tr>
      </thead>
      <tbody>
        {cars.map((car, index) => (
          <tr key={index}>
            <td>{car.brand}</td>
            <td>{car.model}</td>
            <td>{car.year}</td>
            <td>{car.vin}</td>
            <td>{car.enginecapacity}</td>
            <td>{car.power}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <button onClick={() => setShowPopup(true)}> Add Car</button>
    {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Add a New Car</h2>
            <input
              type="text"
              name="brand"
              placeholder="Brand"
              value={newCar.brand}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="model"
              placeholder="Model"
              value={newCar.model}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="year"
              placeholder="Year"
              value={newCar.year}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="vin"
              placeholder="VIN"
              value={newCar.vin}
              onChange={handleInputChange}
            />
             <input
              type="number"
              name="enginecapacity"
              placeholder="Engine Capacity"
              value={newCar.enginecapacity}
              onChange={handleInputChange}
            />
             <input 
              type="number"
              name="power"
              placeholder="Power"
              value={newCar.power}
              onChange={handleInputChange}
            />
            <button className="save-button" onClick={handleAddCar}>
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

export default GeneralStatus;
