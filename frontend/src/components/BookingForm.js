import React from "react";
import '../assets/styles/form-container.css'
import '../assets/styles/button.css'
import { useState,useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import AppointementForm from './AppointementForm'

const BookingForm = () => {
  const navigate = useNavigate(); 
  const [fullName, setFullName] = useState('');
  const { id } = useParams();


  useEffect(() => {
    fetch(`/api/users/check/${id}`)
      .then(response => {
        if (!response.ok) {
          navigate('/not-found');
        }
        return response.json();
      })
      .then(data => {
        setFullName(data.message);
      })
      .catch(error => {
        navigate('/not-found');
      });
  }, [id, navigate]);


  return (
   <div className="page flex center" style={{ backgroundColor:"rgb(4, 104, 135)"}}>
         <div className="form-container flex column center">
      <h2 align="center" >Appointement with {fullName}</h2>
      <AppointementForm id={id}/>
    </div>
   </div>
  );
};

export default BookingForm;