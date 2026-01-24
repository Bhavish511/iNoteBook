import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Signup(props) {
  let navigate = useNavigate();
  const host = "http://localhost:5000";
  const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(credentials.password === credentials.cpassword){
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name:credentials.name, email: credentials.email, password: credentials.password }),
      });
      const json = await response.json();
      console.log(json);
      if (json.status) {
        props.showAlert("Account Created Successfully","success")
        navigate('/login');      
      } else {
        props.showAlert(`${json.message}`,"danger")
      }
    }
    else{
      props.showAlert("Password Mismatch", "danger");
      return;
    }
  };
  const onchange = (e) => {
    setCredentials({...credentials,[e.target.name]:e.target.value})
  };
  return (
    <div className="mt-3">
      <h2 className="text-center">Signup to iNoteBook </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            // value={name}
            aria-describedby="emailHelp"
            required="true"
            onChange={onchange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            name="email"
            value={credentials.email}
            aria-describedby="emailHelp"
            required="true"
            onChange={onchange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={credentials.password}
            id="password"
            required="true"
            minLength={5}
            onChange={onchange}
          />{" "}
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            name="cpassword"
            value={credentials.cpassword}
            id="cpassword"
            required="true"
            minLength={5}
            onChange={onchange}
          />{" "}
        </div>
        <button type="submit" className="btn btn-primary">
          SignUp
        </button>
      </form>
    </div>
  );
}
