import Register from "./components/Register/Register";
import Login from "./components/Login/Login";

import { Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";

function App() {
  return (
    <main className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </main>
  );
}

export default App;
