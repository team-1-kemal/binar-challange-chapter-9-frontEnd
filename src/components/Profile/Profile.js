import React from "react";
import "./Profile.css";
import { Link } from "react-router-dom";

const Profile = () => {
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const city = localStorage.getItem("city");
  const dob = localStorage.getItem("dob");

  return (
    <section className="justify-center h-screen align-middle profile-page bg-cover">
      <Link to="/dashboard">
        <div className="absolute inline-block text-lg group mt-5 ml-5">
          <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
            <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
            <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
            <span className="relative">Back to Home</span>
          </span>
          <span
            className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
            data-rounded="rounded-lg"
          ></span>
        </div>
      </Link>
      <br />

      <div className="text-center font-bold text-3xl">Profile</div>
      <div className="w-[600px] h-[900px] mx-auto my-auto">
        <div
          data-id="0"
          className="mr-5 w-[600px] h-[290px] mt-5 mx-auto relative inline-block px-4 py-2 font-medium group"
        >
          <span className="absolute inset-0 w-full h-full   translate-x-1 translate-y-1 bg-black "></span>
          <span className="absolute inset-0 w-full h-full bg-slate-600 border-2 border-black "></span>
          <span className="relative text-white text-lg ">
            <div className="mx-20 mt-[15px] ">
              <p className="text-2xl font-medium">
                Full Name: Ngakan Made Rama
              </p>
              {/* <p>Full Name: {name}</p> */}
              <p className="text-2xl font-medium mt-4">
                Email: nmaderama@gmail.com
              </p>
              {/* <p>Email: {email}</p> */}
              <p className="text-2xl font-medium mt-4">City: Bekasi</p>
              {/* <p>City: {city}</p> */}
              <p className="text-2xl font-medium mt-4">DoB: 12/08/1994</p>
              {/* <p>DoB: {dob}</p> */}
            </div>
          </span>
        </div>
        <Link to="/edit">
          <button class="absolute inline-block px-4 py-2 font-medium group ml-[240px] mt-[-70px]">
            <span class="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
            <span class="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
            <span class="relative text-black group-hover:text-white">
              Edit Profile
            </span>
          </button>
        </Link>

        <div class="overflow-x-auto relative shadow-md sm:rounded-lg mt-[50px]">
          <h3 className="text-center text-xl">Game History</h3>
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-3">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
              <tr>
                <th scope="col" class="py-3 px-6">
                  Name
                </th>
                <th scope="col" class="py-3 px-6">
                  Date
                </th>
                <th scope="col" class="py-3 px-6">
                  Point
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Rama
                </th>
                <td class="py-4 px-6">24/11/2022</td>
                <td class="py-4 px-6">100</td>
              </tr>

              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Rama
                </th>
                <td class="py-4 px-6">23/11/2022</td>
                <td class="py-4 px-6">100</td>
              </tr>

              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Rama
                </th>
                <td class="py-4 px-6">23/11/2022</td>
                <td class="py-4 px-6">100</td>
              </tr>

              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Rama
                </th>
                <td class="py-4 px-6">23/11/2022</td>
                <td class="py-4 px-6">100</td>
              </tr>

              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Rama
                </th>
                <td class="py-4 px-6">23/11/2022</td>
                <td class="py-4 px-6">100</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Profile;
