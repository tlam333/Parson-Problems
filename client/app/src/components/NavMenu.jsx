import React from 'react';

const NavMenu = () => {
  return (
    <nav className="flex justify-between items-center bg-black p-4">
      {/* Left Button - Orange Button */}
      <div className="flex items-center">
        <button className="btn bg-orange-500 text-white p-6 rounded-xl"></button>
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
          <li><a className="text-orange-500 hover:bg-orange-500 hover:text-black" href="#!">Profile Stats</a></li>
          <li><a className="text-orange-500 hover:bg-orange-500 hover:text-black" href="#!">Saved Problems</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default NavMenu;
