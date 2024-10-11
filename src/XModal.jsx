import React, { useState } from "react";
import "./XModal.css";

const XModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    dob: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!formData.email.includes("@")) {
      alert("Invalid email. Please check your email address.");
    }
    if (!formData.dob) {
      newErrors.dob = "Date of Birth is required";
    } else if (new Date(formData.dob) > new Date()) {
      alert("Invalid date of birth. Please enter a past date.");
    }
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (formData.phone.length !== 10) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsOpen(false);
      setFormData({ username: "", email: "", dob: "", phone: "" });
    }
  };

  return (
    <div className="app">
      <button onClick={() => setIsOpen(true)}>Open Form</button>

      {isOpen && (
        <div className="modal" onClick={() => setIsOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">Username:</label>
              <input
                id="username"
                type="text"
                value={formData.username}
                onChange={handleInputChange}
              />
              {errors.username && <span>{errors.username}</span>}

              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="text"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && <span>{errors.email}</span>}

              <label htmlFor="dob">Date of Birth:</label>
              <input
                id="dob"
                type="date"
                value={formData.dob}
                onChange={handleInputChange}
              />
              {errors.dob && <span>{errors.dob}</span>}

              <label htmlFor="phone">Phone:</label>
              <input
                id="phone"
                type="text"
                value={formData.phone}
                onChange={handleInputChange}
              />
              {errors.phone && <span>{errors.phone}</span>}

              <button className="submit-button" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default XModal;
