import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../api/axios";
import "./Game.css";

const Game = () => {
  const [userChoice, setUserChoice] = useState("rock");
  const [comChoice, setComChoice] = useState("rock");
  const [userScore, setUserScore] = useState(0);
  const [comScore, setComScore] = useState(0);
  const [result, setResult] = useState("Lets see who wins");
  const [gameOver, setGameOver] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [user, setUser] = useState({});

  const choice = ["rock", "paper", "scissors"];
  const { userId } = useParams();

  const handleOnClick = (choice) => {
    setUserChoice(choice);
    generateComChoice();
  };

  const generateComChoice = () => {
    const randomChoice = choice[Math.floor(Math.random() * choice.length)];
    setComChoice(randomChoice);
  };

  const reset = () => {
    window.location.reload();
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("/game/" + userId, { headers: { Authorization: token } })
      .then((user) => setUser(user.data.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const comboMoves = userChoice + comChoice;
    if (userScore <= 2 && comScore <= 2) {
      if (comboMoves === "rockscissors" || comboMoves === "paperrock" || comboMoves === "scissorspaper") {
        const updatedUserScore = userScore + 1;
        setUserScore(updatedUserScore);
        if (updatedUserScore === 3) {
          setGameOver(true);
          setResult("Win!");
          setBtnDisabled(true);
          let pointUser = user.point;
          console.log(pointUser);
          pointUser += 100;
          axios
            .put("/game/" + userId + `?point=${pointUser}`)
            .then((response) => console.log(response))
            .catch((err) => console.log(err));
        }
      }
      if (comboMoves === "paperscissors" || comboMoves === "scissorsrock" || comboMoves === "rockpaper") {
        const updatedComputerScore = comScore + 1;
        setComScore(updatedComputerScore);
        if (updatedComputerScore === 3) {
          setGameOver(true);
          setResult("Lose!");
          setBtnDisabled(true);
        }
      }
      if (comboMoves === "rockrock" || comboMoves === "paperpaper" || comboMoves === "scissorsscissors") {
      }
    }
  }, [userChoice, comChoice]);

  return (
    <div>
      <Link to="/dashboard">
        <div className="absolute inline-block text-lg group mt-5 ml-5">
          <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
            <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
            <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
            <span className="relative">Back to Home</span>
          </span>
          <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
        </div>
      </Link>
      <section className="game-page">
        <img src={window.location.origin + `/image/logo-game.png`} className="w-32" alt="logo" />
        <div className="game_score flex gap-96">
          <div>
            <h1 className="text-center text-white text-xl text-user-point">User Points</h1>
            <h5 className="text-center text-white text-3xl user-point mt-3">{userScore}</h5>
          </div>
          <div>
            <h1 className="text-center text-white text-xl text-user-point">Com Points</h1>
            <h5 className="text-center text-white text-3xl user-point mt-3">{comScore}</h5>
          </div>
        </div>
        <div className="choices mt-16">
          <div className="flex gap-80 ">
            <div className="choice-user">
              <img className="user-hand w-60" alt="choice user" src={window.location.origin + `/image/${userChoice}.png`} />
            </div>
            <div className="choice-com">
              <img className="com-hand w-60" alt="choice com" src={window.location.origin + `/image/${comChoice}.png`} />
            </div>
          </div>

          <div className="game-btn-comp mt-16">
            {choice.map((choice, index) => (
              <button className="button mr-5 w-32 relative inline-block px-4 py-2 font-medium group" key={index} onClick={() => handleOnClick(choice)} disabled={btnDisabled}>
                <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                <span className="relative text-black group-hover:text-white">{choice}</span>
              </button>
            ))}
          </div>

          <div className="game-result mt-[-300px]">
            {/* <h1>Turn Result: {turnResult}</h1> */}
            {gameOver && (
              <div>
                <h1 className="text-center text-xl text-result mt-[-20px]">You</h1>
                <h1 className="text-result text-5xl text-center mt-5">{result}</h1>
              </div>
            )}
          </div>

          <div className="btn-gameover-comp mt-[270px]">
            {gameOver && (
              <button
                className="btn-gameover relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-white transition duration-300 ease-out border-2 bg-slate-700 border-white rounded-full shadow-md group"
                onClick={() => reset()}
              >
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-black group-hover:translate-x-0 ease">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </span>
                <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">Restart Game</span>
                <span className="relative invisible">Restart Game?</span>
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Game;
