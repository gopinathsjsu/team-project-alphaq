import React from 'react';

import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import useComponentVisible from '_hooks/useComponentVisible'; // Assuming this is a custom hook

// Assuming the logo is imported or defined here
const logo = '';

export default function GeneralNavbar({ transparent }) {
  const { navbarOpen, setNavbarOpen, ref } = useComponentVisible(false);
  const { isLogin } = useSelector((state) => state.auth?.userInfo || {});

  const extraClass = transparent ? ' bg-transparent ' : 'border';

  const renderLoginSignupButtons = () => (
    <React.Fragment>
      <li className="flex items-center">
        <Link to="/auth/login">
          <motion.button
            className="bg-white hover:bg-offwhite text-gray-800 active:bg-gray-100 text-xs font-bold
             uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none
              lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="fas fa-sign-in-alt" />
            &nbsp;Log In
          </motion.button>
        </Link>
      </li>
      <li className="flex items-center">
        <Link to="/auth/register">
          <motion.button
            className="bg-alpha hover:bg-alpha text-white active:bg-gray-100 text-xs font-bold
             uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none
              lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="fas fa-user-plus" />
            &nbsp;Sign Up
          </motion.button>
        </Link>
      </li>
    </React.Fragment>
  );

  return (
    <nav
      className={`top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-6 py-3 navbar-expand-lg
       ${extraClass}`}
    >
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <Link
            to="/"
            className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase"
          >
            <div className="flex ">
              <div>
                <img
                  style={{ height: '25px', width: '30px' }}
                  className="inline-block"
                  src={logo}
                  alt="Brandlogo"
                />
              </div>
              <div className={`ml-3 ${!transparent ? 'text-gray-600' : ''}`}>
                MovieBook
              </div>
            </div>
          </Link>
          <button
            className={`cursor-pointer z-51 text-xl leading-none px-3 py-1 border text-alpha border-solid
             border-transparent rounded ${extraClass} block lg:hidden outline-none focus:outline-none`}
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            {' '}
            <i
              className={`${
                transparent ? 'text-white' : 'text-gray-600'
              } fas fa-bars`}
            />
          </button>
        </div>
        <div
          ref={ref}
          className={`lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none${
            navbarOpen ? ' block rounded shadow-lg' : ' hidden'
          }`}
        >
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
            {isLogin ? 'AssumeProperButton' : renderLoginSignupButtons()}
          </ul>
        </div>
      </div>
    </nav>
  );
}

GeneralNavbar.defaultProps = {
  transparent: false,
};

GeneralNavbar.propTypes = {
  transparent: PropTypes.bool,
};
