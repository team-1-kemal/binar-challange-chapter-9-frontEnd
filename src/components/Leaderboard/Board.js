import React from "react";
import Datauser from "./Datauser";
import "./Board.css";
import { Leaderboard } from "./Database";
import logo from "../asset/logo-game.png";
import { Link } from "react-router-dom";

const Board = () => {
  return (
    <section className="board-main">
      <Link to="/dashboard">
        <div className="absolute inline-block text-lg group mt-5 ml-5">
          <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
            <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
            <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
            <span className="relative">Back to Home</span>
          </span>
          <span
            className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
            data-rounded="rounded-lg"
          ></span>
        </div>
      </Link>
      <div className="board">
        <br />
        <img src={logo} alt="logo" className="w-[200px] mx-auto" />
        <h1 className="leaderboard board-title text-2xl  font-semibold">
          Leaderboard
        </h1>

        <div className="duration">
          <div
            data-id="0"
            className="button mr-5 w-28 mt-5 ml-3 relative inline-block px-4 py-2 font-medium group"
          >
            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black "></span>
            <span className="absolute inset-0 w-full h-full bg-white border-2 border-black "></span>
            <span className="relative text-black text-lg ">All-Time</span>
          </div>
        </div>

        <Datauser Leaderboard={sortUser(Leaderboard)} />
      </div>
    </section>
  );
};

function sortUser(data) {
  return data.sort((a, b) => {
    if (a.score === b.score) {
      return b.score - a.score;
    } else {
      return b.score - a.score;
    }
  });
}

export default Board;
