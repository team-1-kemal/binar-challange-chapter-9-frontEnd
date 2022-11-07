import { useRef, useState, useEffect, useContext } from "react";
import { Navigate, Link } from "react-router-dom";
// import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";
import "./Login.css";
import btnLogin from "../asset/btn-login.png";
import logo from "../asset/Logo-GameNation.png";
// const LOGIN_URL = "http://localhost:5000/auth/login";

const Login = () => {
  // const { setAuth } = useContext(AuthContext);
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    const dataLogin = {
      email,
      password,
    };

    try {
      const response = await axios.post("/auth/login", dataLogin);
      localStorage.setItem("name", response.data.data.username);
      localStorage.setItem("id", response.data.data.userId);
      localStorage.setItem("token", response.data.data.token);
      // console.log(JSON.stringify(response?.data));
      // const token = response?.data?.token;
      // setAuth({ email, password, token });
      setEmail("");
      setPassword("");
      setSuccess(true);
    } catch (err) {
      e.preventDefault();
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <Navigate to="/dashboard" />
      ) : (
        <section className="login-page">
          <img src={logo} className="login_logo" />
          <div className="login-comp">
            <div>
              <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                {errMsg}
              </p>
              {/* <form className="login_form"> */}
              <div className="login_form">
                <h1 className="login_title">Welcome Agent!</h1>
                <p className="login_subtitle text-center">
                  Please enter your details to get
                  <br />
                  sign in to your account
                </p>
                <label htmlFor="email" className="login_label">
                  Email :
                </label>
                <input type="email" id="email" ref={emailRef} autoComplete="off" onChange={(e) => setEmail(e.target.value)} value={email} required />
                <label htmlFor="password" className="login_label">
                  Password :
                </label>
                <input type="password" id="password" autoComplete="off" onChange={(e) => setPassword(e.target.value)} value={password} required />
                <div className="login_btn-login-comp">
                  <img src={btnLogin} className="login_btn-login-base absolute" />
                  <button onClick={handleSubmit}>
                    <div className="login_btn-login relative" alt="button"></div>
                  </button>
                </div>
              </div>
              {/* </form> */}
              <div className="flex login_text-signup">
                <p>
                  Need an Account?&nbsp;
                  <span className="line">
                    <Link to="/register">Sign Up</Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Login;
