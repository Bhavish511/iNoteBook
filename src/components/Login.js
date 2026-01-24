import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Login(props) {
  
  let navigate = useNavigate();
  const host = "http://localhost:5000";
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email:email,password:password}),
    });
    const json = await response.json();
    console.log(json);
    if(json.status){
        localStorage.setItem('token',json.token);
        props.showAlert("Logged Successfully","success")
        navigate('/');
      }
      else{
      props.showAlert("Invalid Details","danger")
      navigate('/login');
        
    }
  };
  const onchange = (e) => {
    if (e.target.name === "email") {
      setemail(e.target.value);
    }
    if (e.target.name === "password") {
      setpassword(e.target.value);
    }
  };
  return (
    <div className="mt-3">
      <h2 className="text-center">Login to Continue to iNoteBook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            name="email"
            value={email}
            aria-describedby="emailHelp"
            required="true"
            onChange={onchange}

          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={password}
            id="password"
            required="true"
            minLength={5}
            onChange={onchange}
          />{" "}
        </div>
        <button
          type="submit"
          className="btn btn-primary"
        >
          Login
        </button>
      </form>
    </div>
  );
}
