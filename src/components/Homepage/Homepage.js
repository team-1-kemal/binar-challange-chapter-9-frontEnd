import "./Homepage.css";
import logo from "../asset/Logo-GameNation.png";
import gameboy from "../asset/gameboy.png";
import btnRegister from "../asset/btn-register.png";
import btnLogin from "../asset/btn-login.png";
import { Link } from "react-router-dom";
const Homepage = () => {
  return (
    <div className=" mx-auto">
      <div className=" mx-auto home w-full h-screen bg-cover bg-center flex">
        <br />
        <img src={logo} alt="Logo" className="logo" />
        <div className="mx-auto w-[1600px] flex justify-between ">
          <div className="home-title ">
            <h1 className="maintitle mt-[70px]">
              Let <br /> the fun <br /> begin!
            </h1>
            <h4 className="subtitle">
              Play our games and show <br /> your skills to the world!
            </h4>
            <div className="container-btn flex">
              <div className="container-register">
                <img
                  className="absolute btn-regis-base"
                  src={btnRegister}
                  alt="btnRegister"
                />
                <Link to="/register">
                  <div className="btn-regis relative" alt="button"></div>
                </Link>
              </div>
              <div className="container-login">
                <img
                  className="absolute btn-login-base"
                  src={btnLogin}
                  alt="btnLogin"
                />
                <Link to="/login">
                  <div className="btn-login relative" alt="button"></div>
                </Link>
              </div>
            </div>
          </div>
          <img className="gameboy" src={gameboy} alt="gameboy pic" />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
