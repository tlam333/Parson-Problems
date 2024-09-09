import React from 'react';
import { Link } from 'react-router-dom';

const NavMenu = () => {
  return (
    <nav className="flex justify-between items-center bg-black p-4">
      {/* Left Button - Redirect to Home */}
      <div className="flex items-center">
        <Link to='/'>
          <button className="btn bg-orange-500 text-white p-6 rounded-xl">
          </button>
        </Link>
      </div>

      {/* Right Menu - Dropdown */}
      <div className="dropdown dropdown-end z-40">
        <div tabIndex={0} role="button" className="text-orange-500 text-4xl">
          &#9776;
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-black border border-orange-500 rounded-box w-52 p-2 shadow"
        >
          <li><Link className="text-orange-500 hover:bg-orange-500 hover:text-black" to='/Profile'>Profile Analytics</Link></li>
          <li><Link className="text-orange-500 hover:bg-orange-500 hover:text-black" to='/CategoriesPage'>Categories</Link></li>
          <li><Link className="text-orange-500 hover:bg-orange-500 hover:text-black" to='/WorkPage'>Workspace</Link></li>
          <li><Link className="text-orange-500 hover:bg-orange-500 hover:text-black" to='/SavedProblems'>Saved Problems</Link></li>
          <></>
        </ul>
      </div>
    </nav>
  );
};

export default NavMenu;
