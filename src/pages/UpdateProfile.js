import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const apiURL = process.env.REACT_APP_API_URL;

  const token = localStorage.getItem("token");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [realName, setRealName] = useState("");
  const [phone, setPhone] = useState("");

  const [validation, setValidation] = useState([]);

  const navigate = useNavigate();

  const updateHandler = async (e) => {
    e.preventDefault();
    //initialize formData
    const formData = new FormData();
    //append data to formData
    formData.append("username", username);
    formData.append("email", email);
    formData.append("real_name", realName);
    formData.append("phone", phone);

    //send data to server
    await axios
      .post(`${apiURL}/profile?_method=PUT`, formData)
      .then(() => {
        //redirect to dasboard page
        navigate("/dashboard");
      })
      .catch((error) => {
        //assign error to state "validation"
        setValidation(error.response.data);
      });
  };

  const fetchUser = async () => {
    //set axios header dengan type Authorization + Bearer token
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //fetch user from Rest API
    await axios.get(`${apiURL}/profile`).then((response) => {
      //set response user to state
      setUsername(response.data.username);
      setRealName(response.data.real_name);
      setEmail(response.data.email);
      setPhone(response.data.phone);
    });
  };

  useEffect(() => {
    //check token empty
    if (!token) {
      //redirect login page
      navigate("/login");
    } else {
      //call function "fetchData"
      fetchUser();
    }
  }, []);

  return (
    <div className="container" style={{ marginTop: "120px" }}>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card border-0 rounded shadow-sm">
            <div className="card-body">
              <h4 className="fw-bold">HALAMAN EDIT PROFILE</h4>
              <hr />
              <form onSubmit={updateHandler}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">NAMA LENGKAP</label>
                      <input
                        type="text"
                        className="form-control"
                        value={realName}
                        onChange={(e) => setRealName(e.target.value)}
                        placeholder="Masukkan Nama Lengkap"
                      />
                    </div>
                    {validation.real_name && (
                      <div className="alert alert-danger">{validation.real_name[0]}</div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">USERNAME</label>
                      <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Masukkan Username"
                      />
                    </div>
                    {validation.username && (
                      <div className="alert alert-danger">{validation.username[0]}</div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">ALAMAT EMAIL</label>
                      <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Masukkan Alamat Email"
                      />
                    </div>
                    {validation.email && (
                      <div className="alert alert-danger">{validation.email[0]}</div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">PHONE</label>
                      <input
                        type="text"
                        className="form-control"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Masukkan Nomor Telepon"
                      />
                    </div>
                    {validation.phone && (
                      <div className="alert alert-danger">{validation.phone[0]}</div>
                    )}
                  </div>
                </div>
                <div className="row"></div>
                <button type="submit" className="btn btn-primary">
                  SIMPAN
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
