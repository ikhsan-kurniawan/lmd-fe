import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// const Login = ({ setToken }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const user = { email, password };
//     try {
//       const response = await api.login(user);
//       setToken(response.data.access_token);
//       alert("Login successful");
//     } catch (error) {
//       alert("Login failed");
//     }
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
//       <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

function Login() {
  const apiURL = process.env.REACT_APP_API_URL;

  //define state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //define state validation
  const [validation, setValidation] = useState([]);

  //define history
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     navigate("/dashboard");
  //   }
  // }, []);

  //function "loginHanlder"
  const loginHandler = async (e) => {
    e.preventDefault();

    //initialize formData
    const formData = new FormData();

    //append data to formData
    formData.append("email", email);
    formData.append("password", password);

    //send data to server
    await axios
      .post(`${apiURL}/login`, formData)
      .then((response) => {
        //set token on localStorage
        localStorage.setItem("token", response.data.token);

        //redirect to dashboard
        navigate("/dashboard");
      })
      .catch((error) => {
        //assign error to state "validation"
        setValidation(error.response.data);
      });
  };

  return (
    <div className="container" style={{ marginTop: "120px" }}>
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card border-0 rounded shadow-sm">
            <div className="card-body">
              <h4 className="fw-bold">HALAMAN LOGIN</h4>
              <hr />
              {validation.message && <div className="alert alert-danger">{validation.message}</div>}
              <form onSubmit={loginHandler}>
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
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">
                    LOGIN
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
