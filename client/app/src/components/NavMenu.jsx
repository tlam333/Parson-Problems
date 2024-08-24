import React from "react";
import { useNavigate } from "react-router-dom";

const NavHome = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  return (
    <nav className="flex justify-between items-center bg-black p-4">
      {/* Left Button - Orange Button */}
      <div className="flex items-center">
        <button className="btn bg-orange-500 text-white p-6 rounded-xl" onClick={() => navigate("/Home")}></button>
      </div>

      {/* Right Menu - Dropdown */}
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="text-orange-500 text-4xl">
          &#9776;
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-black border border-orange-500 rounded-box w-52 p-2 shadow"
        >
          <li>
            <a
              className="text-orange-500 hover:bg-orange-500 hover:text-black"
              href="#popup1"
            >
              Login
            </a>
          </li>
          <li>
            <a
              className="text-orange-500 hover:bg-orange-500 hover:text-black"
              href="#popup2"
            >
              Register
            </a>
          </li>
          <li>
            <a
              className="text-orange-500 hover:bg-orange-500 hover:text-black"
              onClick={() => navigate("/Workpage")}
            >
              WorkPage
            </a>
          </li>
          <li>
            <a
              className="text-orange-500 hover:bg-orange-500 hover:text-black"
              onClick={() => navigate("/profile")}
            >
              Profile Analytics
            </a>
          </li>
          <li>
            <a
              className="text-orange-500 hover:bg-orange-500 hover:text-black"
              onClick={() => navigate("/CategoriesPage")}
            >
              Categories
            </a>
          </li>
          <li>
            <a
              className="text-orange-500 hover:bg-orange-500 hover:text-black"
              onClick={() => navigate("/SavedProblems")}
            >
              Saved Problems
            </a>
          </li>
        </ul>
      </div>

      {/* Popup for Login */}
      <div className="popup" id="popup1">
        <div className="popup-inner text-black">
          <h3 className="inline">Login</h3>
          <a href="#" className="button">
            x
          </a>
          <form className="mb-1">
            <label className="block font-bold">Email</label>
            <input className="block border-neutral-950 border-2 bg-white text-black" />
            <label className="block font-bold">Password</label>
            <input className="block border-neutral-950 border-2 bg-white text-black" />
            <button className="block p-1 mt-2 mb-2 rounded-lg font-bold text-white bg-orange-400">
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Popup for Register */}
      <div className="popup" id="popup2">
        <div className="popup-inner text-black">
          <h3 className="inline">Register</h3>
          <a href="#" className="button">
            x
          </a>
          <form className="mb-1">
            <label className="block font-bold">Email</label>
            <input className="block border-neutral-950 border-2 bg-white text-black" />
            <label className="block font-bold">Password</label>
            <input className="block border-neutral-950 border-2 bg-white text-black" />
            <button className="block p-1 mt-2 mb-2 rounded-lg font-bold text-white bg-orange-400">
              Submit
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default NavHome;
