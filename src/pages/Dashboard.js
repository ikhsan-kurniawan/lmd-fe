import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const apiURL = process.env.REACT_APP_API_URL;
  //state user
  const [user, setUser] = useState({});

  //define history
  const navigate = useNavigate();

  //token
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    //set axios header dengan type Authorization + Bearer token
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //fetch user from Rest API
    await axios.get(`${apiURL}/profile`).then((response) => {
      //set response user to state
      setUser(response.data);
    });
  };

  //hook useEffect
  useEffect(() => {
    //check token empty
    if (!token) {
      //redirect login page
      navigate("/login");
    } else {
      //call function "fetchData"
      fetchData();
    }
  }, []);

  //function logout
  const logoutHanlder = async () => {
    //set axios header dengan type Authorization + Bearer token
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //fetch Rest API
    await axios.post(`${apiURL}/logout`).then(() => {
      //remove token from localStorage
      localStorage.removeItem("token");
      //redirect halaman login
      navigate("/login");
    });
  };

  return (
    <div className="container" style={{ marginTop: "50px" }}>
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="card border-0 rounded shadow-sm">
            <div className="card-body">
              SELAMAT DATANG <strong className="text-uppercase">{user.real_name}</strong>
              <hr />
              <div>
                <p>Username : {user.username} </p>
                <p>Email : {user.email} </p>
                <p>Nama Lengkap : {user.real_name} </p>
                <p>Nomor Telepon : {user.phone} </p>
              </div>
              <a href="/edit">
                <button className="btn btn-md btn-warning me-3">EDIT</button>
              </a>
              <button onClick={logoutHanlder} className="btn btn-md btn-danger">
                LOGOUT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
