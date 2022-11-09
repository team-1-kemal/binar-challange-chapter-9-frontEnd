import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";

import { Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Game from "./components/Game/Game";
import Board from "./components/Leaderboard/Board";
import Profile from "./components/Profile/Profile";
import Edit from "./components/Profile/Edit";

function App() {
  return (
    <main className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/game/:userId" element={<Game />} />
        <Route path="/leaderboard" element={<Board />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit" element={<Edit />} />
      </Routes>
    </main>
  );
}

export default App;
