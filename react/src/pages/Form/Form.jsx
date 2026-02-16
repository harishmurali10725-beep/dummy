import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Add this import
import './Form.css';
import TableContext from "./Auth";

const Form = () => {
  const [formData, setFormData] = useState({
    username: "",
    city: "",
    gender: "",
    phone: "",
    feedback: ""
  });
  
  const [errors, setErrors] = useState({});
  const { submittedData, setSubmittedData } = useContext(TableContext);
  const navigate = useNavigate(); // Add this

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({...prev, [name]: value}));
  
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  }

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username?.trim()) newErrors.username = "Name is required";
    if (!formData.city) newErrors.city = "Please Select the City";
    if (!formData.gender) newErrors.gender = "Please Select the gender";
    if (!formData.phone) {
      newErrors.phone = "Please Enter the PhoneNo";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Enter appropriate phoneno";
    }
    return newErrors;
  }
 
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setSubmittedData(prev => [...prev, { ...formData, id: Date.now() }]);
      setFormData({username: "", city: "", gender: "", phone: "", feedback: ""});
      setErrors({});
      alert("Form submitted successfully! Check the Table page.");
      console.log("Form Data:", formData);
    } else {
      setErrors(validationErrors);
    }
  }

  const cities = [
    "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem",
    "Erode", "Tiruppur", "Vellore", "Thoothukudi", "Dindigul",
    "Thanjavur", "Nagercoil", "Cuddalore", "Kanchipuram", "Karur",
    "Namakkal", "Sivakasi", "Ramanathapuram", "Virudhunagar",
    "Krishnagiri", "Dharmapuri", "Ariyalur", "Perambalur",
    "Pudukkottai", "Nagapattinam", "Tiruvannamalai",
    "Tenkasi", "Kallakurichi", "Nilgiris"
  ];

  return (
    <div className="form-page-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label className="username">Username: </label>
          <input 
            type="text" 
            name="username" 
            placeholder="Enter your name" 
            value={formData.username || ""} 
            onChange={handleChange}
          />
          {errors.username && <span style={{color: "red"}}>{" *" + errors.username}</span>}
        </div>

        <div>
          <label>City:</label>
          <select name="city" value={formData.city || ""} onChange={handleChange}>
            <option value="">Select City</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.city && <span style={{color: "red"}}>{" *" + errors.city}</span>}
        </div>

        <div>
          <label>Gender:</label>
          <input 
            type="radio" 
            name="gender" 
            value="Male" 
            checked={formData.gender === "Male"}
            onChange={handleChange}
          /> Male
          <input 
            type="radio" 
            name="gender" 
            value="Female" 
            checked={formData.gender === "Female"}
            onChange={handleChange}
          /> Female
          {errors.gender && <span style={{color: "red"}}>{" *" + errors.gender}</span>}
        </div>

        <div>
          <label>Phone Number:</label>
          <input 
            type="tel" 
            name="phone" 
            value={formData.phone || ""} 
            placeholder="Enter your PhoneNo" 
            onChange={handleChange} 
          />
          {errors.phone && <span style={{color: "red"}}>{" *" + errors.phone}</span>}
        </div>

        <div>
          <label>Feedback:</label>
          <textarea 
            name="feedback" 
            value={formData.feedback || ""} 
            onChange={handleChange}
          />
        </div>

        <button type="submit">Submit</button>
        <button 
          type="button" 
          onClick={() => navigate('/table')}
          style={{marginLeft: '10px'}}
        >
          View Table
        </button>
      </form>

      {/* Show count of submitted entries */}
      {submittedData.length > 0 && (
        <p style={{marginTop: '20px', color: '#667eea', fontWeight: 'bold'}}>
          {submittedData.length} form(s) submitted. Go to Table page to view.
        </p>
      )}
    </div>
  );
};

export default Form;