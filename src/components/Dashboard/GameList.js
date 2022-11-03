import React from "react";
import "./GameList.css";
import pacman from "../asset/poster-pacman.png";
import sinvader from "../asset/spaceinvader.png";
import plane from "../asset/1942.png";
import punchout from "../asset/punchout.png";
import outrun from "../asset/outrun.png";
import cadillacs from "../asset/cadillacs.png";

const GameList = () => {
  return (
    <section>
      <h2 className="text-white font-bold md:text-xl my-8 ">Upcoming Games</h2>
      <div className=" relative flex item-center gap-10">
        <div className="hover:scale-105 ease-in-out duration-300 pacman">
          <p className="font-bold text-2xl text-center ">
            Coming
            <br />
            Soon
          </p>
        </div>

        <div className="hover:scale-105 ease-in-out duration-300 sinvader">
          <p className="font-bold text-2xl text-center ">
            Coming
            <br />
            Soon
          </p>
        </div>

        <div className="hover:scale-105 ease-in-out duration-300 plane">
          <p className="font-bold text-2xl text-center ">
            Coming
            <br />
            Soon
          </p>
        </div>

        <div className="hover:scale-105 ease-in-out duration-300 punchout">
          <p className="font-bold text-2xl text-center ">
            Coming
            <br />
            Soon
          </p>
        </div>

        <div className="hover:scale-105 ease-in-out duration-300 outrun">
          <p className="font-bold text-2xl text-center ">
            Coming
            <br />
            Soon
          </p>
        </div>

        <div className="hover:scale-105 ease-in-out duration-300 cadillacs">
          <p className="font-bold text-2xl text-center ">
            Coming
            <br />
            Soon
          </p>
        </div>
      </div>
    </section>
  );
};

export default GameList;
