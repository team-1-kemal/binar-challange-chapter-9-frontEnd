import { Link } from "react-router-dom";
const Homepage = () => {
  return (
    <div>
      <h1>This is Homepage</h1>
      <Link to="/register">
        <button>Register</button>
      </Link>
      <Link to="/login">
        <button>Login</button>
      </Link>
    </div>
  );
};

export default Homepage;
