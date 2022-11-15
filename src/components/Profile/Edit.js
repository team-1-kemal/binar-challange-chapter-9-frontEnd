import { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
  const navigate = useNavigate();
  const { userId } = useParams();
  const token = localStorage.getItem("token");

  const [fullName, setFullName] = useState("");
  const [userValue, setUserValue] = useState({});
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
    axios
      .get("/user/profile/" + userId, { headers: { Authorization: token } })
      .then((user) => {
        setUserValue(user.data.data);
      })
      .catch((err) => navigate("/login"));
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
    setErrMsg("");
  }, [email]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const v1 = EMAIL_REGEX.test(email);
    if (!v1) {
      setErrMsg("Invalid Entry");
      return;
    }

    const data = {
      fullName,
      email,
      city,
      dob,
    };
    console.log(data);
    axios
      .put("/user/profile/" + userId, data, {
        headers: { Authorization: token },
      })
      .then((response) => {
        setSuccess(true);
        navigate("/profile/" + userId);
      })
      .catch((err) => {
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 409) {
          setErrMsg("Edit Profile Failed");
        }
        navigate("/login");
        errRef.current.focus();
      });
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
                <Link to="/profile/:userId">Profile</Link>
              </p>
            </div>
          </div>
        </section>
      ) : (
        <section>
          <Link to="/profile/:userId">
            <div className="absolute inline-block text-sm group mt-5 ml-5">
              <span className="relative z-10 block px-2 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                <span className="relative">Back</span>
              </span>
              <span
                className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                data-rounded="rounded-lg"
              ></span>
            </div>
          </Link>
          <div className="edit-page">
            <img src={logo} alt="logo" className="w-[100px] mt-[-90px]" />
            <div
              data-id="0"
              className=" w-[300px] h-[450px] md:h-[500px] md:w-[500px]  mx-auto relative  px-4 py-2 flex flex-col items-center font-medium group"
            >
              <span className="absolute inset-0 w-full h-full   translate-x-1 translate-y-1 bg-black "></span>
              <span className="absolute inset-0 w-full h-full bg-slate-600 border-2 border-black "></span>
              <span className="relative text-white text-lg ">
                <div className="">
                  <div className="edit-comp">
                    <p
                      ref={errRef}
                      className={errMsg ? "edit-errmsg" : "offscreen"}
                      aria-live="assertive"
                    >
                      {errMsg}
                    </p>
                    <form
                      className="w-[260px] md:w-[350px] mt-[30px]"
                      onSubmit={handleSubmit}
                    >
                      <h1 className="edit-title text-center font-semibold text-xl">
                        Edit Your Agent
                      </h1>
                      <div className="flex">
                        <div className="relevant text-sm md:text-lg edit-form">
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
                            className=" text-black"
                            name="fullName"
                            ref={userRef}
                            autoComplete="off"
                            placeholder={userValue.full_name || ""}
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
                          <label htmlFor="email" className="mt-3 md:mt-1">
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
                            placeholder={userValue.email || ""}
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

                          <label htmlFor="city" className="mt-3 md:mt-1">
                            City:
                            <span className={validCity ? "valid" : "hide"}>
                              <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span
                              className={
                                validCity || !city ? "hide" : "invalid"
                              }
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
                            placeholder={userValue.city || ""}
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

                          <label htmlFor="dob" className="mt-3 md:mt-1">
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
                            placeholder={userValue.dob || ""}
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
                        </div>

                        <div className="form"></div>
                      </div>
                      <button
                        disabled={!validEmail || !validFullName ? true : false}
                        className="px-5 py-2.5 relative rounded group font-medium text-white inline-block ml-[80px] md:ml-[125px] mt-[60px]"
                      >
                        <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-purple-600 to-blue-500"></span>
                        <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-purple-600 to-blue-500"></span>
                        <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500"></span>
                        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-slate-600 from-slate-500"></span>
                        <span className="relative">Submit</span>
                      </button>
                    </form>
                  </div>
                </div>
              </span>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Edit;
