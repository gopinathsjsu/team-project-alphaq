/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
import React from 'react';

import { motion } from 'framer-motion';
import moment from 'moment';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { useDispatch } from 'react-redux';
import { push } from 'redux-first-history';

import { ShareButton } from '_components/elements/PopupButton';

export default function InfoCard({ data }) {
  const {
    photo,
    _id,
    name,
    releaseDate,
    studio,
    description,
    director,
    tags = [],
    liked = false,
  } = data;
  const dispatch = useDispatch();
  // TODO : Make redux store for userInfo
  const { loggenIn } = {};
  const redirectToScreeningPage = () => {
    dispatch(push(`/movie/${_id}`));
    // TODO : redirect to Movie page based on movieId
  };
  const dateToShow = moment(releaseDate).utc();

  const addlike = async () => {};

  const deletelike = async () => {};

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
          alt="eventPic"
        />
        <div className="px-4 py-2">
          <div className="text-xs text-gray-600 flex flex-row mt-1 ">
            <div className="truncate max-ch-30 ">
              <i className="fas fa-film mr-1 " />
              {studio}
            </div>
          </div>
          <div className="flex">
            <div>
              <div
                className="text-xl  mt-1 font-semibold truncate leading-snug cursor-pointer"
                onClick={() => redirectToScreeningPage(_id)}
                onKeyDown={() => redirectToScreeningPage(_id)}
              >
                {name}
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
                    {tag}
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
            <motion.button
              className={
                !liked
                  ? 'text-likealpha bg-white shadow border border-solid  hover:bg-alpha hover:text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                  : 'text-white bg-brightalpha shadow  hover:bg-white border border-solid hover:text-alpha active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
              }
              type="button"
              style={!loggenIn ? { cursor: 'not-allowed' } : {}}
              onClick={liked ? (e) => deletelike(e) : (e) => addlike(e)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className="fas fa-heart" />
            </motion.button>
            <ShareButton
              shareUrl={`${window.location.href}/movie/_id`}
              title={name}
              description={description}
              tags={tags}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

InfoCard.propTypes = {
  data: PropTypes.shape({
    photo: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    studio: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    liked: PropTypes.bool.isRequired,
    director: PropTypes.string.isRequired,
  }).isRequired,
};
