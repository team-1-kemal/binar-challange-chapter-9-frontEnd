import { useState } from "react";
import "./Dashboard.css";
import gifRPS from "../asset/animate-rps.gif";
import Navbar from "./Navbar";
import GameList from "./GameList";

const Dashboard = () => {
  const [games, setGames] = useState([]);

  return (
    <section className="dash_page flex">
      <Navbar />
      <br />
      <div className="w-full game-preview mx-auto">
        <img src={gifRPS} className="relative rps-preview object-center" />
        <h1 className="db_title absolute text-4xl font-bold text-white">
          Rock, Paper, Scissor!
        </h1>
        <p className="db_subtitle absolute text-xl text-white font-normal">
          One of the most popular traditional game.
          <br />
          Play now and show your best in
          <br />
          our leaderboard!
        </p>
        <button className="db_btn-play absolute bg-yellow-600 font-semibold px-6 py-2 rounded cursor-pointer text-white">
          Play Now!
        </button>
        <GameList />
      </div>
    </section>
  );
};

export default Dashboard;
