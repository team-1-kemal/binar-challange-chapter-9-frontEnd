import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";

import { Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Game from "./components/Game/Game";
import Board from "./components/Leaderboard/Board";

function App() {
  return (
    <main className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/game" element={<Game />} />
        <Route path="/leaderboard" element={<Board />} />
      </Routes>
    </main>
  );
}

export default App;
