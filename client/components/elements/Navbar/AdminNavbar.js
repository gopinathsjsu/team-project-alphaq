import React from 'react';

import { UserMenu } from '../Menus';

export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-no-wrap md:justify-start flex items-center p-4">
      <div className="w-full mx-autp items-center flex justify-between md:flex-no-wrap flex-wrap md:px-10 px-4">
        <a
          className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
          href="#pablo"
          onClick={(e) => e.preventDefault()}
        >
          {' '}
        </a>
        <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
          <UserMenu />
        </ul>
      </div>
    </nav>
  );
}
