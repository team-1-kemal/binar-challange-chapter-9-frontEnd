import React, { useEffect, useState } from "react";
import logoUser from "../asset/logo-user.png";
import axios from "../api/axios";

const Datauser = () => {
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("/user/profile", { headers: { Authorization: token } })
      .then((users) => {
        setData(users.data.data);
      });
  }, []);
  return (
    <div id="data-user">
      <div className="profile-list md:w-[600px] backdrop-blur-md mx-auto">
        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
        <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
        <span className="relative text-black group-hover:text-white">
          {data.map((user, i) => (
            <div className="flex md:w-[500px] mx-auto mt-0" key={i}>
              {/* <div className="flex md:w-[500px] mx-auto mt-0"> */}
              <div className="item text-xs md:text-base">
                <div className="w-[200px] md:w-[300px]">
                  <img src={logoUser} alt="dp" />
                </div>
                <div className="info ml-[-150px] md:ml-[-200px]">
                  <h3 className="name text-dark">{user.full_name}</h3>
                  {/* <h3 className="name text-dark">Ngakan Made</h3> */}
                  <span>{user.city}</span>
                  {/* <span>Bekasi</span> */}
                </div>
              </div>
              <div className="item">
                <span>{user.point}</span>
                {/* <span>1000</span> */}
              </div>
            </div>
          ))}
        </span>
      </div>
    </div>
  );
};

export default Datauser;
