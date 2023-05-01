import React, { useState } from "react";
import '../assets/styles/toggle-form-button.css'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'

const BookingForm = () => {
  const [showLoginForm, setShowLoginForm] = useState(true);

  const handleToggleForm = () => {
    setShowLoginForm(!showLoginForm);
  }

  return (
   <div className="page flex center" style={{ backgroundColor:"rgb(4, 104, 135)"}}>
    <div className="form-container flex column center">
      <h2 align="center" >Welcome</h2>
      {showLoginForm ? <LoginForm /> : <SignupForm goToLogin={handleToggleForm}/>}
      <button className="toggle-form-button" onClick={handleToggleForm}>
        {showLoginForm ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
      </button>
    </div>
   </div>
  );
};

export default BookingForm;