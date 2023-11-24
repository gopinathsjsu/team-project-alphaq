import React from 'react';

export default function FooterAdmin() {
  return (
    <footer className="block">
      <div className="container mx-auto">
        {/* <hr className="mb-4 border-b-1 border-gray-300" /> */}
        <div className="flex flex-nowrap xxs:flex-wrap xxs:text-center items-center justify-between">
          <div className="w-full px-4">
            <div className="text-sm text-gray-600 font-semibold py-1">
              MovieBook by&nbsp; AlphaQ
            </div>
          </div>
          <div className="w-full px-4">
            <div className="flex flex-wrap items-top mb-6">
              <div className="w-full px-4 ml-auto">
                <div className="mt-6 mb-6 text-right xxs:text-center">
                  <button
                    className="bg-white text-blue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                    type="button"
                    onClick={() => {
                      window.open(' https://twitter.com/hackershil', '_blank');
                    }}
                  >
                    <i className="fab fa-twitter" />
                  </button>
                  <button
                    className="bg-white text-blue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                    type="button"
                    onClick={() => {
                      window.open(
                        'https://www.facebook.com/harshil.y.patel',
                        '_blank',
                      );
                    }}
                  >
                    <i className="fab fa-facebook-square" />
                  </button>
                  <button
                    className="bg-white text-blue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                    type="button"
                    onClick={() => {
                      window.open(
                        'https://www.linkedin.com/in/hackershil',
                        '_blank',
                      );
                    }}
                  >
                    <i className="fab fa-linkedin" />
                  </button>
                  <button
                    className="bg-white text-gray-900 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
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
      </div>
    </footer>
  );
}
