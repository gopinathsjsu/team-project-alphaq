/* eslint-disable indent */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ScaleLoader from 'react-spinners/ScaleLoader';
import EmptyContainer from '../../../sections/EmptyContainer';
import MovieTicketCard from '../../../elements/Card/MovieTicketCard';
import { useGetAllTicketsQuery } from '../../../../store/services/allTickets';

const getSegment = (totalEvents, curIndex, eventPerPage) => {
  const end = curIndex * eventPerPage;
  const start = end - eventPerPage;
  return totalEvents.slice(start, end);
};

export default function MyTicketsPage() {
  const { data, isLoading } = useGetAllTicketsQuery();
  const [tabIndex, toggleTabIndex] = useState(1);
  const [allTickets, setAllTickets] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [allIndex, setAllIndex] = useState(1);
  const [watchedIndex, setWatchedIndex] = useState(1);
  const [upcomingIndex, setUpcomingIndex] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const eventPerPage = 6;
  const handleClickLiked = (event) => {
    setAllIndex(Number(event.target.id));
  };
  const handleClickJoined = (event) => {
    setUpcomingIndex(Number(event.target.id));
  };

  const handleClickManage = (event) => {
    setWatchedIndex(Number(event.target.id));
  };
  const searchHandler = (event) => {
    setSearchQuery(event.target.value);
  };
  const isPresent = (val) => {
    if (val.name.toLowerCase().indexOf(searchQuery) !== -1) {
      return true;
    }
    return false;
  };
  const filteredWatchedMovies = watchedMovies.filter((el) => {
    const search1 = el.movieName.toLowerCase();
    const search3 = el.tags;
    if (search1.indexOf(searchQuery) !== -1 || search3.some(isPresent)) {
      return true;
    }

    return false;
  });
  const filteredUpcomingMovies = upcomingMovies.filter((el) => {
    const search1 = el.movieName.toLowerCase();
    const search3 = el.tags;
    if (search1.indexOf(searchQuery) !== -1 || search3.some(isPresent)) {
      return true;
    }

    return false;
  });
  const filteredAllTickets = allTickets.filter((el) => {
    const search1 = el.movieName.toLowerCase();
    const search3 = el.tags;
    return search1.indexOf(searchQuery) !== -1 || search3.some(isPresent);
  });
  const currentFilteredWatchedMovies = getSegment(
    filteredWatchedMovies,
    watchedIndex,
    eventPerPage,
  );
  const currentUpcomingMovies = getSegment(
    filteredUpcomingMovies,
    upcomingIndex,
    eventPerPage,
  );
  const currentAllTickets = getSegment(
    filteredAllTickets,
    allIndex,
    eventPerPage,
  );

  const renderUpcomingMovies = currentUpcomingMovies.map((el, index) => (
    <MovieTicketCard data={el} key={index} />
  ));
  const renderFilteredWatchedMovies = currentFilteredWatchedMovies.map(
    (el, index) => <MovieTicketCard data={el} key={index} />,
  );
  const renderAllTickets = currentAllTickets.map((el, index) => (
    <MovieTicketCard data={el} key={index} />
  ));

  // Logic for displaying page numbers
  const pagesWatched = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredWatchedMovies.length / eventPerPage);
    i++
  ) {
    pagesWatched.push(i);
  }

  let renderPagesWatched = pagesWatched.map((number) => {
    let classNames =
      'first:ml-0 text-xs cursor-pointer font-semibold text-alpha flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-alpha   m-2';
    if (number === watchedIndex) {
      classNames =
        'first:ml-0 shadow-full cursor-pointer text-xs bg-alpha text-white font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-alpha m-2';
    }
    return (
      <motion.li
        key={number}
        id={number}
        onClick={handleClickManage}
        className={classNames}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.9 }}
      >
        {number}
      </motion.li>
    );
  });
  const pagesUpcoming = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredUpcomingMovies.length / eventPerPage);
    i++
  ) {
    pagesUpcoming.push(i);
  }

  let renderPagesUpcoming = pagesUpcoming.map((number) => {
    let classNames =
      'first:ml-0 text-xs cursor-pointer font-semibold text-alpha flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-alpha   m-2';
    if (number === upcomingIndex) {
      classNames =
        'first:ml-0 shadow-full cursor-pointer text-xs bg-alpha text-white font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-alpha   m-2';
    }
    return (
      <motion.li
        key={number}
        id={number}
        onClick={handleClickJoined}
        className={classNames}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.9 }}
      >
        {number}
      </motion.li>
    );
  });
  const pagesAll = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredAllTickets.length / eventPerPage);
    i++
  ) {
    pagesAll.push(i);
  }

  let renderPagesAll = pagesAll.map((number) => {
    let classNames =
      'first:ml-0 text-xs cursor-pointer font-semibold text-alpha flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-alpha   m-2';
    if (number === allIndex) {
      classNames =
        'first:ml-0 shadow-full cursor-pointer text-xs bg-alpha text-white font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-alpha  m-2';
    }
    return (
      <motion.li
        key={number}
        id={number}
        onClick={handleClickLiked}
        className={classNames}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.9 }}
      >
        {number}
      </motion.li>
    );
  });

  if (pagesWatched.length === 0 && !isLoading) {
    renderPagesWatched =
      watchedMovies.length !== 0 ? (
        <div
          className="flex justify-center content-center"
          style={{ height: 400 }}
        >
          <div className="flex flex-row mt-32">
            {' '}
            <div>
              {' '}
              <i className="far fa-calendar-times text-5xl mr-4 mt-2" />
            </div>
            <div>
              <h1 className="text-2xl text-gray-700 ">
                No result from "{searchQuery}
                ".
              </h1>
              <h2 className="text-gray-600 mr-4">
                Try to search other relevant terms.
              </h2>
            </div>
          </div>
        </div>
      ) : (
        <EmptyContainer />
      );
  }
  if (pagesAll.length === 0 && !isLoading) {
    renderPagesAll =
      allTickets.length !== 0 ? (
        <div
          className="flex justify-center content-center"
          style={{ height: 400 }}
        >
          <div className="flex flex-row mt-32">
            {' '}
            <div>
              {' '}
              <i className="far fa-calendar-times text-5xl mr-4 mt-2" />
            </div>
            <div>
              <h1 className="text-2xl text-gray-700 ">
                No result from "{searchQuery}
                ".
              </h1>
              <h2 className="text-gray-600 mr-4">
                Try to search other relevant terms.
              </h2>
            </div>
          </div>
        </div>
      ) : (
        <EmptyContainer />
      );
  }
  if (pagesUpcoming.length === 0 && !isLoading) {
    renderPagesUpcoming =
      upcomingMovies.length !== 0 ? (
        <div
          className="flex justify-center content-center"
          style={{ height: 400 }}
        >
          <div className="flex flex-row mt-32">
            {' '}
            <div>
              {' '}
              <i className="far fa-calendar-times text-5xl mr-4 mt-2" />
            </div>
            <div>
              <h1 className="text-2xl text-gray-700 ">
                No result from "{searchQuery}
                ".
              </h1>
              <h2 className="text-gray-600 mr-4">
                Try to search other relevant terms.
              </h2>
            </div>
          </div>
        </div>
      ) : (
        <EmptyContainer />
      );
  }
  useEffect(() => {
    async function getData() {
      if (!data) {
        console.log(data);
      } else {
        setAllTickets([...data.watched, ...data.upcoming]);
        setWatchedMovies(data.watched);
        setUpcomingMovies(data.upcoming);
      }
    }

    const getAllTheData = async () => {
      await getData();
    };

    getAllTheData();
  }, [isLoading, data]);

  return (
    <React.Fragment>
      <div className="relative flex justify-center  text-sm -mt-20">
        <div className="ml-6">
          <button
            className={
              tabIndex === 0
                ? 'bg-lightalpha rounded-full py-2 px-4 text-white mr-2 outline-none'
                : 'rounded-full py-2 px-4 text-white mr-2 outline-none'
            }
            onClick={() => toggleTabIndex(0)}
          >
            <i className="fas fa-heart hover:text-offwhite hover:text-offwhite" />
            &nbsp; All Movies
          </button>
          <button
            className={
              tabIndex === 1
                ? 'bg-lightalpha rounded-full py-2 px-4 text-white mr-2 outline-none '
                : 'rounded-full py-2 px-4 text-white mr-2 outline-none hover:text-offwhite'
            }
            onClick={() => toggleTabIndex(1)}
          >
            {' '}
            <i className="fas fa-sliders-h hover:text-offwhite" />
            &nbsp; Watched Movies
          </button>

          <button
            className={
              tabIndex === 2
                ? 'bg-lightalpha rounded-full py-2 px-4 text-white mr-2 outline-none '
                : 'rounded-full py-2 px-4 text-white mr-2 outline-none hover:text-offwhite'
            }
            onClick={() => toggleTabIndex(2)}
          >
            {' '}
            <i className="fab fa-fort-awesome hover:text-offwhite" />
            &nbsp; Upcoming Movies
          </button>
        </div>
        <div className="bg-white shadow  ml-auto mr-8 flex border border-beta rounded-lg">
          <span className="w-auto flex justify-end items-center text-gray-500 p-2">
            <i className="fas fa-search text-beta" />
          </span>
          <input
            className="w-full rounded-lg py-2"
            type="text"
            placeholder="Search Movie..."
            onChange={searchHandler}
          />
        </div>
      </div>
      {isLoading ? (
        <div
          className="flex justify-center items-center"
          style={{ height: '63vh' }}
        >
          <ScaleLoader color="#825ee4" size={60} />
        </div>
      ) : (
        <div>
          <div className="mt-10 bg-gray-200 flex flex-wrap gap-1 ">
            {tabIndex === 2
              ? renderUpcomingMovies
              : tabIndex === 0
              ? renderAllTickets
              : renderFilteredWatchedMovies}
          </div>
        </div>
      )}
      {isLoading || (
        <div className="py-2 justify-center flex">
          <div className="block">
            <ul className="flex pl-0 mt-4 rounded list-none flex-wrap">
              {tabIndex === 1
                ? renderPagesWatched
                : tabIndex === 0
                ? renderPagesAll
                : renderPagesUpcoming}
            </ul>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
