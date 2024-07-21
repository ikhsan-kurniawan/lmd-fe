import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const apiURL = process.env.REACT_APP_API_URL;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [realName, setRealName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [validation, setValidation] = useState([]);

  const navigate = useNavigate();

  const registerHandler = async (e) => {
    e.preventDefault();
    //initialize formData
    const formData = new FormData();
    //append data to formData
    formData.append("username", username);
    formData.append("email", email);
    formData.append("real_name", realName);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("password_confirmation", passwordConfirmation);
    //send data to server
    await axios
      .post(`${apiURL}/register`, formData)
      .then(() => {
        //redirect to login page
        navigate("/login");
      })
      .catch((error) => {
        //assign error to state "validation"
        setValidation(error.response.data);
      });
  };

  return (
    <div className="container" style={{ marginTop: "120px" }}>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card border-0 rounded shadow-sm">
            <div className="card-body">
              <h4 className="fw-bold">HALAMAN REGISTER</h4>
              <hr />
              <form onSubmit={registerHandler}>
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
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">PASSWORD</label>
                      <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Masukkan Password"
                      />
                    </div>
                    {validation.password && (
                      <div className="alert alert-danger">{validation.password[0]}</div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">KONFIRMASI PASSWORD</label>
                      <input
                        type="password"
                        className="form-control"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        placeholder="Masukkan Konfirmasi Password"
                      />
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  REGISTER
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
