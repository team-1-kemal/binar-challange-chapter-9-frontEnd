import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
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
    const result = TEXT_REGEX.test(fullName);
    setValidFullName(result);
  }, [fullName]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    let result = null;
    if (city === "") {
      result = false;
    } else result = true;
    setValidCity(result);
  }, [city]);

  useEffect(() => {
    let result = null;
    if (dob === "") {
      result = false;
    } else result = true;
    setValidDob(result);
  }, [dob]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
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
        <section className="bg-regis bg-center my-auto min-h-screen flex flex-col bg-cover items-center">
          <div className="flex relative mx-auto my-auto items-center min-h-screen">
            <div class="absolute w-[200px] h-[200px] lg:w-[245px] ml-[-15px] font-medium group">
              <span class="absolute w-full h-full transform translate-x-1 translate-y-1 bg-black"></span>
              <span class="absolute  w-full h-full bg-slate-400 border-2 border-black "></span>
            </div>
            <div className="relative flex flex-col text-center lg:text-xl">
              <h1>Registration Success!</h1>
              <p>
                Please&nbsp;
                <Link to="/login">Sign In</Link>
              </p>
            </div>
          </div>
        </section>
      ) : (
        <section className="bg-regis bg-center my-auto min-h-screen flex flex-col bg-cover items-center">
          <img src={logo} alt="logo" className="w-[150px]" />
          <div className="flex flex-col lg:min-h-[720px] lg:my-auto">
            <p
              ref={errRef}
              className={
                errMsg
                  ? "reg-errmsg z-50 text-center ml-[40px] mt-[380px] relative lg:mt-[275px] lg:ml-[220px]"
                  : "offscreen"
              }
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <form onSubmit={handlerSubmit} className="">
              <div class="absolute w-[300px] h-[550px] mt-[-30px] ml-[-25px] lg:w-[650px] lg:h-[500px]  font-medium group">
                <span class="absolute w-full h-full transform translate-x-1 translate-y-1 bg-black"></span>
                <span class="absolute  w-full h-full bg-slate-400 border-2 border-black "></span>
              </div>
              <h1 className="relative text-center text-lg font-semibold text-white mb-3 lg:text-2xl lg:mb-10">
                Create New Agent
              </h1>
              <div className="flex-col flex lg:flex-row lg:gap-10 justify-center items-center ">
                <div className="relative flex flex-col">
                  <label htmlFor="fullName" className="text-white ">
                    Full Name:
                    <span className={validFullName ? "valid" : "hide"}>
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span
                      className={
                        validFullName || !fullName ? "hide" : "invalid"
                      }
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    className="w-[250px] h-[30px] lg:w-[280px] lg:h-[35px]"
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
                  <p
                    id="uidnote"
                    className={
                      fullNameFocus && fullName && !validFullName
                        ? "relative max-w-[250px] text-[10px] rounded-[8px] text-white bg-black p-1"
                        : "offscreen"
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
                    Please input your name correctly.
                  </p>
                  <label htmlFor="email" className="text-white">
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
                    className="w-[250px] h-[30px] lg:w-[280px] lg:h-[35px]"
                    name="email"
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-invalid={validEmail ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                  />

                  <p
                    id="uidnote"
                    className={
                      emailFocus && email && !validEmail
                        ? "relative max-w-[250px] text-[10px] rounded-[8px] text-white bg-black p-1"
                        : "offscreen"
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />{" "}
                    Please input your email correctly
                  </p>

                  <label htmlFor="city" className="text-white">
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
                    className="w-[250px] h-[30px] lg:w-[280px] lg:h-[35px]"
                    name="city"
                    autoComplete="off"
                    onChange={(e) => setCity(e.target.value)}
                    required
                    aria-invalid={validCity ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setCityFocus(true)}
                    onBlur={() => setCityFocus(false)}
                  />
                  <p
                    id="uidnote"
                    className={
                      cityFocus && city && !validCity
                        ? "relative max-w-[250px] text-[10px] rounded-[8px] text-white bg-black p-1"
                        : "offscreen"
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} className="mr-1" /> 4
                    to 24 characters.
                    <br />
                    Must begin with a letter.
                    <br />
                    Letters, numbers, underscores, hypens allowed.
                  </p>
                </div>

                <div className="flex flex-col relative">
                  <label htmlFor="dob" className="text-white">
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
                    className="w-[250px] h-[30px] lg:w-[280px] lg:h-[35px]"
                    name="dob"
                    autoComplete="off"
                    onChange={(e) => setDob(e.target.value)}
                    required
                    aria-invalid={validDob ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setDobFocus(true)}
                    onBlur={() => setDobFocus(false)}
                  />
                  <p
                    id="uidnote"
                    className={
                      dobFocus && dob && !validDob
                        ? "relative max-w-[250px] text-[10px] rounded-[8px] text-white bg-black p-1"
                        : "offscreen"
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} className="mr-1" /> 4
                    to 24 characters.
                    <br />
                    Must begin with a letter.
                    <br />
                    Letters, numbers, underscores, hypens allowed.
                  </p>

                  <label htmlFor="password" className="text-white">
                    Password:
                    <span className={validPwd ? "valid" : "hide"}>
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span
                      className={validPwd || !password ? "hide" : "invalid"}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </label>

                  <input
                    type="password"
                    id="password"
                    className="w-[250px] h-[30px] lg:w-[280px] lg:h-[35px]"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                  />
                  <p
                    id="pwdnote"
                    className={
                      pwdFocus && !validPwd
                        ? "relative max-w-[250px] text-[10px] rounded-[8px] text-white bg-black p-1"
                        : "offscreen"
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />8 to
                    24 characters.
                    <br />
                    Must include uppercase and lowercase letters, a number and a
                    special character.
                    <br />
                    Allowed special characters:
                    <span aria-label="exclamation mark">!</span>
                    <span aria-label="at symbol">@</span>{" "}
                    <span aria-label="hashtag">#</span>{" "}
                    <span aria-label="percent">%</span>
                  </p>

                  <label htmlFor="confirm_pwd" className="text-white">
                    Confirm Password:
                    <span className={validMatch && matchPwd ? "valid" : "hide"}>
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span
                      className={validMatch || !matchPwd ? "hide" : "invalid"}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </label>
                  <input
                    type="password"
                    id="confirm_pwd"
                    className="w-[250px] h-[30px] lg:w-[280px] lg:h-[35px]"
                    name="confirm_pwd"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                  />
                  <p
                    id="confirmnote"
                    className={
                      matchFocus && !validMatch
                        ? "relative max-w-[250px] text-[10px] rounded-[8px] text-white bg-black p-1"
                        : "offscreen"
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
                    Must match the first password input field.
                  </p>
                </div>
              </div>
              <div className="absolute lg:ml-[170px]">
                <button
                  class="absolute inline-block  ml-[70px] mt-[50px] px-6 py-2 font-semibold group lg:px-6 lg:py-3 lg:mt-[70px] mb-7 "
                  disabled={
                    !validPwd || !validMatch || !validEmail || !validFullName
                      ? true
                      : false
                  }
                >
                  <span class="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                  <span class="absolute inset-0 w-full h-full bg-red-400 border-2 border-black group-hover:bg-black"></span>
                  <h1 class="relative text-center text-sm lg:text-xl text-white group-hover:text-white">
                    Submit
                  </h1>
                </button>
              </div>
              <p className="absolute mt-[100px] ml-[20px] text-center lg:ml-[200px] lg:mt-[140px]">
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
