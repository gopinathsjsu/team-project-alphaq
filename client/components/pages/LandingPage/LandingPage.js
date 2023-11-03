import React, { useEffect } from 'react';

import { motion } from 'framer-motion';
// import { IndexNavbar } from '_components/elements/Navbar';
import { useDispatch } from 'react-redux';

import Footer from '_components/layouts/Footer';

import { cardTypes } from '../../../constants';
import { fetchContent } from '../../../store/features/authSlice';
import { useGetPokemonByNameQuery } from '../../../store/services/landing';

import HorizontalSection from './HorizontalSection';
import SearchPanel from './SeachPanel';

export default function Landing() {
  const dispatch = useDispatch();
  const {
    genres = [],
    upcomingMovieList = [],
    theaterList = [],
    genreMovieList = [],
  } = {};

  useEffect(() => {
    dispatch(fetchContent());
  }, [dispatch]);

  const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur');

  console.log({ data, error, isLoading });

  const searchFilterByGenre = async () => {
    // ! setup query string and redirect to /search page
  };

  return (
    <React.Fragment>
      {/* <IndexNavbar transparent /> */}
      <main>
        <SearchPanel />
        <HorizontalSection
          listOfItems={upcomingMovieList}
          title="Upcoming Movies"
          type={cardTypes.UPCOMING_MOVIE}
          withDates
        />
        <HorizontalSection
          listOfItems={theaterList}
          title="Explore Theatre"
          type={cardTypes.THEATRE}
          style={{ marginBottom: '20px' }}
        />

        {genreMovieList.map((el) => (
          <HorizontalSection
            listOfItems={el.event}
            title={el.category_name}
            type={cardTypes.MOVIE}
            style={{ marginBottom: '0px' }}
            key="helo"
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
                {genres.map((el) => (
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
                    onClick={() => searchFilterByGenre(el.category_name)}
                  >
                    {el.category_name}
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
