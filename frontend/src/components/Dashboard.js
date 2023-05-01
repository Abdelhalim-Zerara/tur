import React, { useState, useEffect } from 'react';
import Appointement from './Appointement';




function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('turToken');
      const response = await fetch('/api/appointements', {
        headers: {
          'Authorization': `${token}`
        }
      });
      const data = await response.json();
      setAppointments(data);
      setLoading(false);
    };
    fetchData();
  }, []);


  const handleDeleteAppointment = async (appointmentId) => {
    const token = localStorage.getItem('turToken');
    const response = await fetch(`/api/appointements/${appointmentId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `${token}`
      }
    });
    if (response.ok) {
      setAppointments(appointments.filter(appointment => appointment._id !== appointmentId));
    }
  }

  const deleteAppointment = (id) => {
    return async () => {
      await handleDeleteAppointment(id);
    };
  };


  return (
    <div className="flex flex-wrap">
      {loading ? (
        <p>Loading...</p>
      ) : (
        appointments.map(appointment => (
          <Appointement
            key={appointment._id}
            id={appointment._id}
            type={appointment.type}
            date={appointment.date}
            handleDelete={deleteAppointment(appointment._id)}
            fullName={appointment.customerName}
          />
        ))
      )}
    </div>
  );
}

export default Dashboard;
