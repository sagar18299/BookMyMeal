import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AUTH_TOKEN } from "../../../helpers/constants";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();

  const data = { email: "", password: "" };
  const [inputData, setInputData] = useState(data);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);

    setInputData({ ...inputData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loader = toast.loading(
      "Please wait while we are processing your request"
    );

    try {
      const { email, password } = inputData;

      const { data, status } = await axios.post("/employee/login", {
        email,
        password,
      });

      if (status === 200) {
        localStorage.setItem(AUTH_TOKEN, data.data.token);
        axios.defaults.headers.common["Authorization"] = data.data.token;
        setInputData({ ...inputData, email: "", password: "" });
        navigate("/");

        toast.success("Logged in successful!");
      }
    } catch (error) {
      toast.error("Some error occurred");
      console.log(error);
    } finally {
      toast.dismiss(loader);
    }
  };

  function togglePassword() {
    const passwordInput = document.getElementById("password-field");
    const passwordIcon = document.getElementById("password-icon");

    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      passwordIcon.classList.remove("icon-eye-close");
      passwordIcon.classList.add("icon-eye-open");
    } else {
      passwordInput.type = "password";
      passwordIcon.classList.remove("icon-eye-open");
      passwordIcon.classList.add("icon-eye-close");
    }
  }

  return (
    <body className="mt-0">
      <section className="login-content">
        <div className="login-content-lt"></div>
        <div className="login-content-rt">
          <div className="login-box">
            <form className="login-form" action="#" method="POST">
              <div className="logo-wrapper">
                <img src="images/logo.svg" alt="Rishabh Software" />
                <span>Meal Facility</span>
              </div>
              <h3 className="login-head">Sign in to your account</h3>
              <p className="login-text">
                Enter your credentials to access your account.
              </p>
              <div className="form-group">
                <label className="control-label">User Name</label>
                <div className="input-addon">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Robert Smith"
                    autoFocus
                    name="email"
                    onChange={handleInput}
                    value={inputData.email}
                  />
                  <div className="icon-after icon-green">
                    <i className="icon-check"></i>
                  </div>
                </div>
                {/* <div className="error-block">Error display here</div> */}
              </div>
              <div className="form-group">
                <label className="control-label">Password</label>
                <div className="input-addon">
                  <input
                    id="password-field"
                    className="form-control"
                    type="password"
                    name="password"
                    onChange={handleInput}
                    value={inputData.password}
                  />
                  <span
                    id="password-icon"
                    onClick={togglePassword}
                    className="icon-eye-close field-icon toggle-password"
                  ></span>
                </div>
              </div>

              <div className="d-flex align-items-center justify-content-between">
                {/* <div className="form-group mb-0">
                  <label className="custom-checkbox mb-0">
                    <span className="checkbox__title">Remember Me</span>
                    <input
                      className="checkbox__input"
                      type="checkbox"
                    />
                    <span className="checkbox__checkmark"></span>
                  </label>
                </div> */}
                <div className="form-group mb-0">
                  <div className="utility">
                    <p>
                      <a href="/password-reset" className="form-link">
                        Forgot Password?
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="form-group btn-container">
                <button
                  className="btn btn-xl btn-primary"
                  onClick={handleSubmit}
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      {/* End Footer */}
      {/* End Page Content */}
      {/* Essential javascripts for application to work*/}
      <script src="js/jquery-3.3.1.min.js"></script>
      <script src="js/popper.min.js"></script>
      <script src="js/bootstrap.min.js"></script>
      <script src="js/main.js"></script>
      {/* The javascript plugin to display page loading on top*/}
      <script src="js/plugins/pace.min.js"></script>
    </body>
  );
}
