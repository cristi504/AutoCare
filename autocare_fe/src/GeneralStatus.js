import React , {useState}  from "react";
import { useNavigate } from "react-router-dom";
import './statusgeneral.css';
import { useEffect } from "react";

const GeneralStatus = () => {
  const user_id = localStorage.getItem("user_id");
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [newCar, setNewCar] = useState({ brand: "", model: "", year: "" });
  const [error, setError] = useState('');
  const [cars, setCars] = useState([
    { brand: " ", model: " ", year:'' , vin: " " }]);
 
    useEffect(() => {
      // Fetch the project entries from the API
      fetch(`http://localhost:5000/users/${user_id}/cars`)
          .then((res) => res.json())
          .then((data) => {
            if(data.cars == undefined) 
            {
              setCars([ ]);
            }
            else
            {
              console.log("Yolo cars = ", data.cars)
              setCars(data.cars);
            }
              
              
          });
  }, [user_id]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCar({ ...newCar, [name]: value });
  };
  const  handleAddCar = async () => {
    if (newCar.brand && newCar.model && newCar.year) {
      setCars([...cars, { ...newCar, vin: Date.now().toString() }]);
      setShowPopup(false);
      await addCarHandler(newCar.brand,newCar.model,newCar.year)
      setNewCar({ brand: "", model: "", year: "" }); // Reset the form
    } else {
      alert("Please fill out all fields!");
    }
  };
  const addCarHandler = async (brand,model,year) =>{
    
    setError('');

    try{
        const user_id = localStorage.getItem("user_id");
        const response = await fetch(`http://localhost:5000/users/${user_id}/cars`,{
          method :'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({brand,model,year}),
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
  

  // const cars = [
  //   { brand: "Toyota", model: "Corolla", year: 2020, vin: "1HGBH41JXMN109186" },
  //   { brand: "Ford", model: "Mustang", year: 2018, vin: "1FAFP4041XF108632" },
  //   { brand: "Honda", model: "Civic", year: 2022, vin: "19XFC2F59GE227615" },
  //   { brand: "Chevrolet", model: "Camaro", year: 2019, vin: "2G1FB1E35F9202323" },
  //   { brand: "Tesla", model: "Model 3", year: 2021, vin: "5YJ3E1EA7LF789012" },
  //   { brand: "BMW", model: "X5", year: 2017, vin: "WBAKS8C59ED123456" },
  //   { brand: "Audi", model: "A4", year: 2016, vin: "WAUFFAFL7GN123456" },
  //   { brand: "Mercedes-Benz", model: "C-Class", year: 2023, vin: "WDDGF81X123456789" },
  // ];
  return (
    <div className="container">
    <h1>Cars List</h1>
    <table>
      <thead>
        <tr>
          <th>Brand</th>
          <th>Model</th>
          <th>Year</th>
          <th>VIN</th>
        </tr>
      </thead>
      <tbody>
        {cars.map((car, index) => (
          <tr key={index}>
            <td>{car.brand}</td>
            <td>{car.model}</td>
            <td>{car.year}</td>
            <td>{car.vin}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <button onClick={() => setShowPopup(true)}> Adauga masina  </button>
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
