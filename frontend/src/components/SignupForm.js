import React from "react";
import { Formik, Field } from "formik";
import '../assets/styles/form-container.css'
import '../assets/styles/button.css'


const SignupForm = ({goToLogin}) => {

  return (
    <Formik
      initialValues={{ fullName: "", email: "", password: "" }}
      onSubmit={(values) => {
        fetch("/api/users/register", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              fullName: values.fullName,
              email: values.email,
              password: values.password,
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
            goToLogin();
          })
          .catch(error => {
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
            <label htmlFor="email">Email</label>
            <Field
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              value={values.email}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Field
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              value={values.password}
              required
            />
          </div>
          <button  className="button primary submit" >Sign Up</button>
        </form>
      )}
    </Formik>
  );
};

export default SignupForm;