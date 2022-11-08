import { useState } from "react";
import "./Dashboard.css";
import gifRPS from "../asset/animate-rps.gif";
import Navbar from "./Navbar";
import GameList from "./GameList";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [games, setGames] = useState([]);

  return (
    <section className="dash_page flex my-auto">
      <Navbar />
      <br />
      <div className="w-full game-preview mx-auto">
        <img src={gifRPS} className="relative rps-preview object-center" />
        <h1 className="db_title absolute text-2xl font-bold text-white">
          Rock, Paper, Scissor!
        </h1>
        <p className="db_subtitle absolute text-ml text-white font-normal">
          One of the most popular traditional game.
          <br />
          Play now and show your best in
          <br />
          our leaderboard!
        </p>
        <Link to="/game">
          <button className="db_btn-play absolute bg-yellow-600 font-semibold px-6 py-2 rounded cursor-pointer text-white">
            Play Now!
          </button>
        </Link>
        <GameList />
      </div>
    </section>
  );
};

export default Dashboard;
