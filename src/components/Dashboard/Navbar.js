import React from "react";
import "./Navbar.css";
import logo from "../asset/Logo-GameNation.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <section className="flex items-center justify-between w-full p-4 z-[100] absolute nav-page">
      <img src={logo} alt="logo" className="nav-logo" />
      <div className="flex nav-comp gap-10 ml-[210px]">
        <p className="text-black pr-4 text-xl font-bold mt-4">Profile</p>
        <Link to="/leaderboard">
          <p className="text-black pr-4 text-xl font-bold mt-4">Leaderboard</p>
        </Link>
      </div>

      <div className="flex items-center gap-5 nav-comp">
        <p className="text-black pr-4 text-xl font-semibold mt-4">
          Welcome "Agent XXX"
        </p>
        <Link to="/">
          <button className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white">
            Log Out
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Navbar;
