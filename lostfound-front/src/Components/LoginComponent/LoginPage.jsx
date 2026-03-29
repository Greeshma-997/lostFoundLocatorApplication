import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import {validateUser} from "../../Services/LoginService";
 import '../../DisplayView.css';
 
const LoginPage=()=>{

let navigate=useNavigate();
    const [errors, setErrors] = useState({});
    const [loginData, setLoginData] =useState ({
      username: "",
      password: "",
    });
    const [flag,setFlag]=useState(true);
 
    const validateLogin=(e)=>{
      e.preventDefault();
      validateUser(loginData.username,loginData.password).then((response)=>{
       let role=String(response.data);
       if(role==="Admin")
            navigate('/admin-menu');
       else if(role==="Student")
           navigate('/student-menu');
      else
         setFlag(false);
      });
   }
   const  onChangeHandler = (event) =>{
      event.persist();
      setFlag(true);
      const name = event.target.name;
      const value = event.target.value;
      setLoginData(values =>({...values, [name]: value }));
  };
  const handleValidation = (event) => {
      event.preventDefault();
      let tempErrors = {};
      let isValid = true;
 
      if (!loginData.username.trim()) {
        tempErrors.username = "User Name is required";
        isValid = false;
      }
 
      if (!loginData.password.trim()) {
        tempErrors.password = "Password is required";
        isValid = false;
      }
 
      setErrors(tempErrors);
      if (isValid) {
        validateLogin(event);
      }
    };
    const registerNewUser=(e)=>{
      navigate('/register');
  }
  return (
  <div className="theme-bg">

    <div className="theme-card">

      <h2 className="text-center mb-4">
        Welcome To LostFoundLocator 👋
      </h2>

      <form>

        <div className="mb-3">
          <label className="fw-semibold">Username</label>
          <input
            placeholder="Enter username"
            name="username"
            className="form-control"
            value={loginData.username}
            onChange={onChangeHandler}
          />
          {errors.username && (
            <small className="text-warning">{errors.username}</small>
          )}
        </div>

        <div className="mb-3">
          <label className="fw-semibold">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            className="form-control"
            value={loginData.password}
            onChange={onChangeHandler}
          />
          {errors.password && (
            <small className="text-warning">{errors.password}</small>
          )}
        </div>

        <button
          type="button"
          className="theme-btn w-100 mt-3"
          onClick={handleValidation}
        >
          Login
        </button>

      </form>

      {!flag && (
        <p className="text-danger text-center mt-3">
          Invalid Username or Password
        </p>
      )}

      <div className="text-center mt-4">
        <button
          className="secondary-btn w-100"
          onClick={registerNewUser}
        >
          Create New Account
        </button>
      </div>

    </div>

  </div>
);
}
export default LoginPage;