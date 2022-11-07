import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Register.css";
import logo from "../asset/Logo-GameNation.png";
import boxRegis from "../asset/box-register.png";
import btnRegis from "../asset/btn-register.png";
import axios from "../api/axios";

const TEXT_REGEX = /^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [fullName, setFullName] = useState("");
  const [validFullName, setValidFullName] = useState(false);
  const [fullNameFocus, setFullNameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [city, setCity] = useState("");
  const [validCity, setValidCity] = useState(false);
  const [cityFocus, setCityFocus] = useState(false);

  const [dob, setDob] = useState("");
  const [validDob, setValidDob] = useState(false);
  const [dobFocus, setDobFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    // let result = null;
    // if (user === "") {
    //   result = false;
    // } else result = true;
    const result = TEXT_REGEX.test(fullName);
    console.log(result);
    console.log(fullName);
    setValidFullName(result);
  }, [fullName]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    console.log(result);
    console.log(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    let result = null;
    if (city === "") {
      result = false;
    } else result = true;
    console.log(result);
    console.log(city);
    setValidCity(result);
  }, [city]);

  useEffect(() => {
    let result = null;
    if (dob === "") {
      result = false;
    } else result = true;
    console.log(result);
    console.log(dob);
    setValidDob(result);
  }, [dob]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    console.log(result);
    console.log(password);
    setValidPwd(result);
    const match = password === matchPwd;
    setValidMatch(match);
  }, [password, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [email, password, matchPwd]);

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(password);
    if (!v1 | !v2) {
      setErrMsg("Invalid Entry");
      return;
    }

    const dataRegis = {
      fullName,
      email,
      password,
      city,
      dob,
    };

    try {
      const response = await axios.post("/auth/signup", dataRegis);
      console.log(response.data);
      console.log(JSON.stringify(response));
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section className="regis_success flex">
          <div className="relative">
            <img src={boxRegis} alt="box" className="regis_box-success" />
            <div className="regis_success-text flex flex-col items-center absolute">
              <h1>Registration Success!</h1>
              <p>
                Please&nbsp;
                <Link to="/login">Sign In</Link>
              </p>
            </div>
          </div>
        </section>
      ) : (
        <section className="register-page">
          <img src={logo} alt="logo" className="regis_logo-gn" />
          <div className="register-comp">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
              {errMsg}
            </p>
            <form onSubmit={handlerSubmit}>
              <h1 className="text">Create New Agent</h1>
              <div className="flex-row flex">
                <div className="form">
                  <label htmlFor="fullName">
                    Full Name:
                    <span className={validFullName ? "valid" : "hide"}>
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validFullName || !fullName ? "hide" : "invalid"}>
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    aria-invalid={validFullName ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setFullNameFocus(true)}
                    onBlur={() => setFullNameFocus(false)}
                  />
                  <p id="uidnote" className={fullNameFocus && fullName && !validFullName ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Please input your name correctly.
                  </p>
                  <label htmlFor="email">
                    Email:
                    <span className={validEmail ? "valid" : "hide"}>
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validEmail || !email ? "hide" : "invalid"}>
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </label>

                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-invalid={validEmail ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                  />

                  <p id="uidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} /> Please input your email account correctly
                  </p>

                  <label htmlFor="city">
                    City:
                    <span className={validCity ? "valid" : "hide"}>
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validCity || !city ? "hide" : "invalid"}>
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </label>

                  <input
                    type="text"
                    id="city"
                    name="city"
                    autoComplete="off"
                    onChange={(e) => setCity(e.target.value)}
                    required
                    aria-invalid={validCity ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setCityFocus(true)}
                    onBlur={() => setCityFocus(false)}
                  />
                  <p id="uidnote" className={cityFocus && city && !validCity ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} /> 4 to 24 characters.
                    <br />
                    Must begin with a letter.
                    <br />
                    Letters, numbers, underscores, hypens allowed.
                  </p>
                </div>

                <div className="form">
                  <label htmlFor="dob">
                    Date of Birth:
                    <span className={validDob ? "valid" : "hide"}>
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validDob || !dob ? "hide" : "invalid"}>
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </label>

                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    autoComplete="off"
                    onChange={(e) => setDob(e.target.value)}
                    required
                    aria-invalid={validDob ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setDobFocus(true)}
                    onBlur={() => setDobFocus(false)}
                  />
                  <p id="uidnote" className={dobFocus && dob && !validDob ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} /> 4 to 24 characters.
                    <br />
                    Must begin with a letter.
                    <br />
                    Letters, numbers, underscores, hypens allowed.
                  </p>

                  <label htmlFor="password">
                    Password:
                    <span className={validPwd ? "valid" : "hide"}>
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validPwd || !password ? "hide" : "invalid"}>
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </label>

                  <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                  />
                  <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />8 to 24 characters.
                    <br />
                    Must include uppercase and lowercase letters, a number and a special character.
                    <br />
                    Allowed special characters:
                    <span aria-label="exclamation mark">!</span>
                    <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="percent">%</span>
                  </p>

                  <label htmlFor="confirm_pwd">
                    Confirm Password:
                    <span className={validMatch && matchPwd ? "valid" : "hide"}>
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </label>
                  <input
                    type="password"
                    id="confirm_pwd"
                    name="confirm_pwd"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                  />
                  <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must match the first password input field.
                  </p>
                </div>
              </div>
              <div className="register_btn-regis-comp">
                <img src={btnRegis} alt="button" className="absolute register_btn-regis-base" />
                <button disabled={!validPwd || !validMatch || !validEmail || !validFullName ? true : false}>
                  <div className="register_btn-regis relative" alt="button"></div>
                </button>
              </div>
              <p className="register_text-sign-in">
                Already registered?&nbsp;
                <span className="line">
                  <Link to="/login"> Sign In</Link>
                </span>
              </p>
            </form>
          </div>
        </section>
      )}
    </>
  );
};

export default Register;
