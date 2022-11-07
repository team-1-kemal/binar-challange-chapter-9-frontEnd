import React from "react";
import "./Navbar.css";
import logo from "../asset/Logo-GameNation.png";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const username = localStorage.getItem("name");
  console.log(username);
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <section className="flex items-center justify-between w-full p-4 z-[100] absolute nav-page">
      <img src={logo} alt="logo" className="nav-logo" />
      <div className="flex nav-comp gap-10 ml-[210px]">
        <Link to="/profile">
          <p className="text-black pr-4 text-xl font-bold mt-4">Profile</p>
        </Link>
        <Link to="/leaderboard">
          <p className="text-black pr-4 text-xl font-bold mt-4">Leaderboard</p>
        </Link>
      </div>

      <div className="flex items-center gap-5 nav-comp">
        <p className="text-black pr-4 text-xl font-semibold mt-4">
          Welcome, {username}
        </p>

        <button
          type="button"
          className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white"
          onClick={handleLogOut}
        >
          Log Out
        </button>
      </div>
    </section>
  );
};

export default Navbar;
