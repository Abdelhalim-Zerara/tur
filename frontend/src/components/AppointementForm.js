import React from "react";
import { Formik, Field } from "formik";
import '../assets/styles/form-container.css'
import '../assets/styles/button.css'

const AppointementForm = ({ id }) => {
  return (
    <Formik
      initialValues={{ fullName: "", date: "", time: "" }}
      onSubmit={(values) => {
        fetch(`/api/appointements/${id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              customerName: values.fullName,
              date: new Date(`${values.date}T${values.time}`),
            })
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            alert(data.message);
          })
          .catch(() => {
            alert("An error has occurred");
          });
      }}
    >
      {({ values, handleSubmit, handleChange }) => (
        <form className="flex column" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fullName">Full Name</label>
            <Field
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter your full name"
              onChange={handleChange}
              value={values.fullName}
              required
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <Field
              type="date"
              id="date"
              name="date"
              onChange={handleChange}
              value={values.date}
              required
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <Field
              type="time"
              id="time"
              name="time"
              onChange={handleChange}
              value={values.time}
              required
            />
          </div>
          <button  className="button primary submit" type="submit">Submit</button>
        </form>
      )}
    </Formik>
  );
};

export default AppointementForm;