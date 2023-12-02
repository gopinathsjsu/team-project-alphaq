import React, { useState } from 'react';

import { SearchBarCity } from '_components/elements/FormInput';
import movieAppBgImg from '../../../assets/images/movieappbg.jpg';

export default function SearchPanel() {
  const [search, setSearch] = useState('');
  const [location, setlocation] = useState({});

  const onSubmit = async () => {
    // ! setup query string and redirect to /search page
  };

  const onLocationChange = (newValue) => {
    setlocation(newValue);
  };
  return (
    <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75 w-full">
      <div
        className="absolute top-0 w-full h-full bg-center bg-cover"
        style={{
          backgroundImage: `url('${movieAppBgImg}')`,
        }}
      >
        <span
          id="blackOverlay"
          className="w-full h-full absolute opacity-75 bg-black"
        />
      </div>
      <div className="container relative mx-auto">
        <div className="items-center flex flex-wrap">
          <div className="w-full lg:w-6/12 px-2 ml-auto mr-auto text-center">
            <h1 className="text-white font-semibold text-5xl">Find movies</h1>
          </div>
        </div>
        <br />
        <form>
          <div className="flex justify-center flex-wrap w-full">
            <div className="bg-white p-2 align-center flex w-80 xs:p-1 xs:w-65">
              <div style={{ flex: '1 1 60%' }}>
                <input
                  style={{
                    outline: 'none',
                    borderRight: '2px solid gray',
                  }}
                  className="p-2 text-lg w-full"
                  type="text"
                  name="search"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                  placeholder="Search for movies"
                />
              </div>
              <div style={{ flex: '1 1 35%' }}>
                <SearchBarCity
                  onLocationChange={onLocationChange}
                  value={location}
                  className="p-2 text-lg w-full"
                />
              </div>
            </div>
            <button
              style={{ marginLeft: '10px' }}
              className="bg-alpha hover:bg-brightalpha hover:shadow-md rounded text-white p-2
             pl-4 pr-4 xs:block"
              onClick={onSubmit}
              type="button"
            >
              <p className="font-semibold text-md">Search</p>
            </button>
          </div>
        </form>
      </div>

      <div
        className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
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
        />
      </div>
    </div>
  );
}
