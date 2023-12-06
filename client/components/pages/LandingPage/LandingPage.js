import React from 'react';

import { motion } from 'framer-motion';

import { GeneralNavbar } from '_components/elements/Navbar';
import Footer from '_components/layouts/Footer';

import { cardTypes } from '../../../constants';
import { useGetLandingPageDataQuery } from '../../../store/services/landing';

import HorizontalSection from './HorizontalSection';
import SearchPanel from './SeachPanel';

export default function Landing() {
  const { data } = useGetLandingPageDataQuery({
    lat: 0,
    long: 0,
  });

  const {
    genreList = [],
    movieByGenreList: genreMovieList = [],
    upcomingMovieList = [],
    currentlyShowingMovieList = [],
    // theaterList = [],
  } = data || {};

  const searchFilterByGenre = async () => {
    // ! setup query string and redirect to /search page
  };

  return (
    <React.Fragment>
      <GeneralNavbar transparent />
      <main>
        <SearchPanel />

        <HorizontalSection
          listOfItems={upcomingMovieList}
          title="Upcoming Movies"
          type={cardTypes.UPCOMING_MOVIE}
          withDates
        />
        <HorizontalSection
          listOfItems={currentlyShowingMovieList}
          title="Showing now"
          type={cardTypes.UPCOMING_MOVIE}
          withDates
        />
        {/* <HorizontalSection
          listOfItems={theaterList}
          title="Explore Theatre"
          type={cardTypes.THEATRE}
          style={{ marginBottom: '20px' }}
        /> */}

        {genreMovieList.map((el) => (
          <HorizontalSection
            listOfItems={el.movies}
            title={el.genre}
            type={cardTypes.MOVIE}
            style={{ marginBottom: '0px' }}
            key={el.id}
            // ! EDIT Key
          />
        ))}

        <section className="pb-4 bg-gray-100 ">
          <div className="container mx-auto">
            <div className="flex flex-col">
              <div className="flex flex-row justify-center">
                {' '}
                <div className="text-2xl m-4 font-semibold text-alpha text-center pt-6">
                  {' '}
                  Browse Movies by Genres
                </div>
              </div>
              <div className="flex flex-row justify-around flex-wrap container p-4">
                {' '}
                {genreList.map((el) => (
                  <motion.button
                    type="button"
                    className="rounded-lg shadow p-4 category-container mb-4 text-center hover:border-lightbeta
                     hover:shadow-lg active:bg-superlightbeta active:text-white hover:bg-offwhite
                       hover:text-extrabeta font-semibold"
                    style={{ outline: 'none' }}
                    whileHover={{ scale: 1.05 }}
                    // ! ADJUST KEY
                    key={el.id}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => searchFilterByGenre(el.name)}
                  >
                    {el.name}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </React.Fragment>
  );
}
