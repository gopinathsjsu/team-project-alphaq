/* eslint-disable no-unused-vars */
/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
import React from 'react';

import moment from 'moment';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { useDispatch } from 'react-redux';
import { push } from 'redux-first-history';

import { ShareButton } from '_components/elements/PopupButton';

export default function MovieTicketCard({ data }) {
  const {
    seats,
    adult,
    child,
    senior,
    screen,
    price,
    photo,
    startTime,
    _id,
    movieName,
    releaseDate,
    studio,
    description,
    tags,
    liked,
    director,
    theaterName,
  } = data;
  const dispatch = useDispatch();
  // TODO : Make redux store for userInfo

  const redirectToScreeningPage = () => {
    dispatch(push(`/movie/${_id}`));
    // TODO : redirect to Movie page based on movieId
  };
  const dateToShow = moment(startTime).utc();

  return (
    <div
      className="relative"
      style={{
        flex: '1 1 0',
        height: 'auto',
        minWidth: 250,
        maxWidth: 320,
      }}
    >
      <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg">
        <img
          src={photo}
          style={{ height: '210px', width: '100%' }}
          alt="Movie poster"
        />
        <div className="px-4 py-2">
          <div className="text-xs text-gray-600 flex flex-row mt-1 ">
            <div className="truncate max-ch-30 ">
              <i className="fas fa-film mr-1 " />
              {theaterName}
            </div>
          </div>
          <div className="flex">
            <div style={{ width: '200px' }}>
              <div
                className="text-xl mt-1 font-semibold truncate leading-snug cursor-pointer"
                onClick={() => redirectToScreeningPage(_id)}
                onKeyDown={() => redirectToScreeningPage(_id)}
              >
                {movieName}
              </div>
              <div className="text-sm text-gray-600 font-semibold">
                <span className="font-normal">by</span> {director}
              </div>
              <div
                className="text-xs  mt-2  text-beta"
                style={{ fontWeight: 550 }}
              >
                {tags.map((tag, index) => (
                  <span className="capitalize" key="SOMEUNIQ">
                    {tag?.name || tag}
                    {index + 1 < tags.length && (
                      <React.Fragment>&bull;</React.Fragment>
                    )}
                  </span>
                ))}
              </div>
            </div>
            {releaseDate && (
              <div className="flex ml-auto mr-1 mt-1 flex-col fit-content items-center px-3 calendar-date">
                <div className="text-alpha text-xl font-semibold">
                  <Moment format="DD" date={dateToShow} />
                </div>
                <div className="uppercase text-sm font-semibold tracking-lg text-gray-700">
                  <Moment format="MMM" date={dateToShow} />
                </div>
              </div>
            )}
          </div>

          <div className="flex  items-center ">
            <div className=" flex flex-col" />
          </div>

          <div className="text-xs text-gray-600 flex flex-row mb-1 mt-1" />

          <div
            className="absolute top-0 right-0"
            style={{ marginTop: '195px', marginRight: '12px' }}
          >
            <ShareButton
              shareUrl={`${window.location.href}/movie/_id`}
              title={movieName}
              description={description}
              tags={tags}
            />
          </div>
          <div className="text-sm flex items-center">
            <i className="fas fa-calendar-day text-sm mr-2" />
            <p className="leading-none"> Tickets - {seats}</p>
          </div>

          <div className="text-sm flex items-center mt-2">
            <i className="fas fa-desktop text-sm mr-2" />
            <p className="leading-none"> Screen - {screen}</p>
          </div>

          <div className="text-sm flex items-center mt-2 mb-2">
            <i className="fas fa-money-bill text-sm mr-2" />
            <p className="leading-none"> Price - {price * seats}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

MovieTicketCard.propTypes = {
  data: PropTypes.shape({
    seats: PropTypes.number.isRequired,
    adult: PropTypes.number.isRequired,
    child: PropTypes.number.isRequired,
    senior: PropTypes.number.isRequired,
    screen: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    photo: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    movieName: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    startTime: PropTypes.string.isRequired,
    studio: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    liked: PropTypes.bool.isRequired,
    director: PropTypes.string.isRequired,
    theaterName: PropTypes.string.isRequired,
  }).isRequired,
};
