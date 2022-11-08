import React from "react";

const Datauser = ({ Leaderboard }) => {
  return <div id="data-user">{Item(Leaderboard)}</div>;
};

const Item = (data) => {
  return (
    <div className="profile-list backdrop-blur-md mx-auto">
      <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
      <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
      <span className="relative text-black group-hover:text-white">
        {data.map((value, index) => (
          <div className="flex w-[500px] mx-auto mt-0" key={index}>
            <div className="item">
              <img src={value.img} alt="dp" />
              <div className="info">
                <h3 className="name text-dark">{value.name}</h3>
                <span>{value.location}</span>
              </div>
            </div>
            <div className="item">
              <span>{value.score}</span>
            </div>
          </div>
        ))}
      </span>
    </div>
  );
};

export default Datauser;
