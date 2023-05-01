import React from "react";
import { Formik, Field } from "formik";
import '../assets/styles/form-container.css'
import '../assets/styles/button.css'
import { useNavigate } from 'react-router-dom';


const LoginForm = () => {
  const navigate = useNavigate();
    return (
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          fetch("/api/users/login", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
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
              localStorage.setItem("turToken", `Bearer ${data.token}`);
              if(data.token)
                navigate("/account/dashboard");
              else
                throw new Error('Invalid token');
            })
            .catch(error => {
              alert("an error has occured");
            });
        }}
      >
        {({ values, handleSubmit, handleChange }) => (
          <form className="flex column" onSubmit={handleSubmit}>
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
            <button  className="button primary submit" type="submit">Login</button>
          </form>
        )}
      </Formik>
    );
  };

  export default LoginForm;