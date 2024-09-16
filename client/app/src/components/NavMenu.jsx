import React from 'react';
import { Link } from 'react-router-dom';

const NavMenu = () => {
  return (
    <nav className="flex justify-between items-center bg-black p-4">
      {/* Left Button - Redirect to Home */}
      <div className="flex items-center">
        <Link to='/'>
          <button class="bg-orange-500 hover:bg-black-600 text-black p-4 rounded-lg flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Home
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