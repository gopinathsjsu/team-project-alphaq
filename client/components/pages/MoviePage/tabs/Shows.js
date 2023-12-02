import React, { useMemo, useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import TheatreScreen from './components/TheatreScreen';
import {
  // dummyNearbyTheatres,
  MAX_BOOKABLE_DAY,
  showStatusLegends,
} from '../../../../constants';
import { getNextNDays } from '../../../../utils/time';
import TimeSlotTag from './components/TimeSlotTag';
import { useGetShowsByMovieIdQuery } from '../../../../store/services/show';
import { useGeolocation } from '../../../../hooks/useGeolocation';

function Button({ children, disabled, ...other }) {
  const extracClasses = disabled
    ? 'text-gray-500 cursor-not-allowed'
    : 'text-gray-800';
  return (
    <button
      type="button"
      className={`outline-none focus:outline-none ${extracClasses}`}
      disabled={disabled}
      {...other}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  disabled: false,
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
};

export default function Shows() {
  const [searchString, setSearchString] = useState('');
  const searchHandler = (e) => setSearchString(e.target.value);
  const { id } = useParams();

  const dateOptions = getNextNDays(new Date(), MAX_BOOKABLE_DAY);
  const [dateIndex, setDateIndex] = useState(0);

  const searchDate = dateOptions[dateIndex];

  const { position } = useGeolocation();

  const { data: nearbyTheatres = [] } = useGetShowsByMovieIdQuery({
    id,
    date: searchDate,
    lat: position?.lat || 0,
    long: position?.long || 0,
  });

  const disableLeft = dateIndex === 0;
  const disableRight = dateIndex === dateOptions.length - 1;

  const filteredTheatres = useMemo(
    () =>
      nearbyTheatres.filter((el) => {
        const searchValue = el.name.toLowerCase();
        return searchValue.includes(searchString);
      }),
    [nearbyTheatres, searchString],
  );

  return (
    <div className="relative flex flex-col md:flex-row min-w-0 break-words w-full mb-6  rounded-lg  border-0">
      <div className="w-full md:w-1/3">
        <ul className="ml-4 mr-4 rounded-lg ">
          <div className="p-4 font-semibold text-lg mx-3 border-b flex flex-row items-center">
            <div>
              <Button
                disabled={disableLeft}
                onClick={() => setDateIndex((index) => index - 1)}
              >
                <i className="fas fa-caret-left icon-lg" />
              </Button>
            </div>
            <div className="flex flex-col items-center flex-grow">
              <div className="text-alpha text-xl font-semibold uppercase pl-1  pt-2">
                {moment(searchDate).format('MMM')}
              </div>
              <div className="text-3xl ">{moment(searchDate).format('DD')}</div>
            </div>
            <div>
              <Button
                disabled={disableRight}
                onClick={() => setDateIndex((index) => index + 1)}
              >
                <i className="fas fa-caret-right icon-lg" />
              </Button>
            </div>
          </div>
          <div className="mt-2 flex flex-col ">
            {showStatusLegends.map(({ name, status }) => (
              <TimeSlotTag key={name} status={status}>
                {name}
              </TimeSlotTag>
            ))}
          </div>
          {/* {this.renderSideMenu()} */}
        </ul>
      </div>
      <div className="bg-white w-full md:w-2/3 rounded px-6  ml-auto">
        <div className="border-l-4 border-red-400 -ml-6 pl-6 flex items-center justify-between my-4">
          <div className="font-semibold text-gray-800">Showtimes</div>
        </div>

        <div className="bg-white w-full shadow  ml-auto mr-8 flex border border-beta rounded-lg my-2">
          <span className="w-auto flex justify-end items-center text-gray-500 p-2">
            <i className="fas fa-search text-beta" />
          </span>
          <input
            className="w-full rounded-lg py-2"
            type="text"
            placeholder="Search"
            value={searchString}
            onChange={searchHandler}
          />
        </div>
        <div className="overflow-y shows-container">
          <ul>
            {filteredTheatres.map((el) => (
              <div key={el._id}>
                <TheatreScreen data={el} />
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
