import React from 'react';

// import crossifyImg from 'assets/logos/logo_final.png';

export default function Footer() {
  const logo = '';
  return (
    <footer className=" bg-gray-300 pt-8 pb-6">
      <div
        className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
        style={{ transform: 'translateZ(0)' }}
      >
        <svg
          className="absolute bottom-0 overflow-hidden"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          version="1.1"
          viewBox="0 0 2560 100"
          x="0"
          y="0"
        >
          <polygon
            className="text-gray-300 fill-current"
            points="2560 0 2560 100 0 100"
          />
        </svg>
      </div>
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap text-center lg:text-left">
          <div className="w-full lg:w-6/12 px-4 ">
            {/* <img
              alt="brandphoto"
              src={logo}
              className="mr-2 inline-block"
              style={{ height: 30 }}
            /> */}
            <h4 className="text-3xl font-semibold inline-block pb-2">
              MovieBook
            </h4>
            <h5 className="text-lg mt-0 mb-2 text-gray-700">
              Find your next favourite movie
            </h5>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="flex flex-wrap items-top mb-6">
              <div className="w-full lg:w-6/12 px-4 ml-auto">
                <div className="mt-6 lg:mb-0 mb-6">
                  <button
                    className="bg-white text-blue-400 shadow-lg font-normal h-10 w-10 items-center justify-center
                     align-center rounded-full outline-none focus:outline-none mr-2"
                    type="button"
                    onClick={() => {
                      window.open(' https://twitter.com/hackershil', '_blank');
                    }}
                  >
                    <i className="fab fa-twitter" />
                  </button>
                  <button
                    className="bg-white text-blue-600 shadow-lg font-normal h-10 w-10 items-center justify-center
                    align-center rounded-full outline-none focus:outline-none mr-2"
                    type="button"
                    onClick={() =>
                      window.open(
                        'https://www.facebook.com/harshil.y.patel',
                        '_blank',
                      )
                    }
                  >
                    <i className="fab fa-facebook-square" />
                  </button>
                  <button
                    className="bg-white text-blue-600 shadow-lg font-normal h-10 w-10 items-center justify-center
                    align-center rounded-full outline-none focus:outline-none mr-2"
                    type="button"
                    onClick={() => {
                      window.open(
                        'https://www.linkedin.com/groups/9049763/',
                        '_blank',
                      );
                    }}
                  >
                    <i className="fab fa-linkedin" />
                  </button>
                  <button
                    className="bg-white text-gray-900 shadow-lg font-normal h-10 w-10 items-center justify-center
                     align-center rounded-full outline-none focus:outline-none mr-2"
                    type="button"
                    onClick={() => {
                      window.open(
                        'https://www.github.com/hackershil',
                        '_blank',
                      );
                    }}
                  >
                    <i className="fab fa-github" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-400" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-gray-600 font-semibold py-1 ">
              MovieBook by AlphaQ
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
