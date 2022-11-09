import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Edit.css";
import logo from "../asset/Logo-GameNation.png";
import boxEdit from "../asset/box-register.png";
import axios from "../api/axios";

const TEXT_REGEX = /^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$/;
const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

const Edit = () => {
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
    setErrMsg("");
  }, [email]);

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const v1 = EMAIL_REGEX.test(email);
    if (!v1) {
      setErrMsg("Invalid Entry");
      return;
    }

    const dataEdit = {
      fullName,
      email,
      city,
      dob,
    };

    try {
      const response = await axios.put("/auth/signup", dataEdit);
      console.log(response.data);
      console.log(JSON.stringify(response));
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Edit Profile Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section className="edit_success flex">
          <div className="relative">
            <img src={boxEdit} alt="box" className="regis_box-success" />
            <div className="regis_success-text flex flex-col items-center absolute">
              <h1>Edit Profile Success!</h1>
              <p>
                Go to your&nbsp;
                <Link to="/Profile">Profile</Link>
              </p>
            </div>
          </div>
        </section>
      ) : (
        <section className="edit-page">
          <img src={logo} alt="logo" className="regis_logo-gn" />
          <div
            data-id="0"
            className=" w-[600px] h-[590px] mt-5 mx-auto relative inline-block px-4 py-2 font-medium group"
          >
            <span className="absolute inset-0 w-full h-full   translate-x-1 translate-y-1 bg-black "></span>
            <span className="absolute inset-0 w-full h-full bg-slate-600 border-2 border-black "></span>
            <span className="relative text-white text-lg ">
              <div className="">
                <div className="edit-comp">
                  <p
                    ref={errRef}
                    className={errMsg ? "edit-errmsg" : "offscreen"}
                    // className="errmsg"
                    aria-live="assertive"
                  >
                    {errMsg}
                  </p>
                  <form className="mx-auto mt-[40px]" onSubmit={handlerSubmit}>
                    <h1 className="edit-title text-center font-semibold text-xl">
                      Edit Your Agent
                    </h1>
                    <div className="flex ml-[120px]">
                      <div className="relevant edit-form">
                        <label htmlFor="fullName">
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
                          className="w-80 text-black"
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
                              ? "instructions"
                              : "offscreen"
                          }
                        >
                          <FontAwesomeIcon icon={faInfoCircle} />
                          Please input your name correctly.
                        </p>
                        <label htmlFor="email">
                          Email:
                          <span className={validEmail ? "valid" : "hide"}>
                            <FontAwesomeIcon icon={faCheck} />
                          </span>
                          <span
                            className={
                              validEmail || !email ? "hide" : "invalid"
                            }
                          >
                            <FontAwesomeIcon icon={faTimes} />
                          </span>
                        </label>

                        <input
                          type="email"
                          id="email"
                          className="text-black"
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
                              ? "instructions"
                              : "offscreen"
                          }
                        >
                          <FontAwesomeIcon icon={faInfoCircle} /> Please input
                          your email account correctly
                        </p>

                        <label htmlFor="city">
                          City:
                          <span className={validCity ? "valid" : "hide"}>
                            <FontAwesomeIcon icon={faCheck} />
                          </span>
                          <span
                            className={validCity || !city ? "hide" : "invalid"}
                          >
                            <FontAwesomeIcon icon={faTimes} />
                          </span>
                        </label>

                        <input
                          type="text"
                          id="city"
                          className="text-black"
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
                              ? "instructions"
                              : "offscreen"
                          }
                        >
                          <FontAwesomeIcon icon={faInfoCircle} /> 4 to 24
                          characters.
                          <br />
                          Must begin with a letter.
                          <br />
                          Letters, numbers, underscores, hypens allowed.
                        </p>

                        <label htmlFor="dob">
                          Date of Birth:
                          <span className={validDob ? "valid" : "hide"}>
                            <FontAwesomeIcon icon={faCheck} />
                          </span>
                          <span
                            className={validDob || !dob ? "hide" : "invalid"}
                          >
                            <FontAwesomeIcon icon={faTimes} />
                          </span>
                        </label>

                        <input
                          type="date"
                          id="dob"
                          className="text-black"
                          name="dob"
                          autoComplete="off"
                          onChange={(e) => setDob(e.target.value)}
                          required
                          aria-invalid={validDob ? "false" : "true"}
                          aria-describedby="uidnote"
                          onFocus={() => setDobFocus(true)}
                          onBlur={() => setDobFocus(false)}
                        />
                      </div>

                      <div className="form"></div>
                    </div>

                    <button
                      disabled={!validEmail || !validFullName ? true : false}
                      class="px-5 py-2.5 relative rounded group font-medium text-white inline-block ml-[230px] mt-[60px]"
                    >
                      <span class="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-purple-600 to-blue-500"></span>
                      <span class="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-purple-600 to-blue-500"></span>
                      <span class="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500"></span>
                      <span class="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-slate-600 from-slate-500"></span>
                      <span class="relative">Submit</span>
                    </button>
                  </form>
                </div>
              </div>
            </span>
          </div>
        </section>
      )}
    </>
  );
};

export default Edit;
