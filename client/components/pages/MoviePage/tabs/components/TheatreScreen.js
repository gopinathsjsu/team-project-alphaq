import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { push } from 'redux-first-history';
import TimeSlotTag from './TimeSlotTag';
import { getStatus } from '../../../../../constants';

export default function TheatreScreen({ data }) {
  const { name, showList, addressLine1, addressLine2, city, state, location } =
    data;
  const dispatch = useDispatch();
  const redirectToShowPage = (showId) => {
    dispatch(push(`/show/${showId}`));
  };
  return (
    <div
      className="h-custom rounded-lg shadow p-4 flex ml-2 mt-4 mr-4"
      style={{ width: '97%', cursor: 'pointer', overflow: 'overlay' }}
      //   onClick={() => showEvents(props.data._id)}
    >
      {/* <div className="eventPhoto flex-shrink-0">
        <img
          alt="Event_photo"
          className="card-image rounded-lg"
          src={props.data.photo}
          style={{ width: '200px', height: '140px' }}
        />
      </div> */}
      <div className="w-full">
        <div className="leading-3" style={{ marginLeft: '1.25rem' }}>
          <div className="text-2xl font-bold flex">
            <div>{name}</div>
            <div className="ml-auto flex items-center">
              <a
                className="px-2 py-1 bg-beta rounded-full text-white text-sm "
                // style={{ marginTop: '0.35rem' }}
                href={`https://www.google.com/maps/search/?api=1&query=${location?.coordinates?.[1]},${location?.coordinates?.[0]}`}
                target="_blank"
                type="button"
                rel="noreferrer"
              >
                <i className="fas fa-directions" />
              </a>
            </div>
          </div>
          <div className="tracking-tight text-sm font-semibold text-beta flex flex-wrap w-full">
            <div className="mt-2">
              <i
                className="fas fa-map-marker-alt text-sm "
                style={{ marginRight: '0.6rem' }}
              />
              <span style={{ display: 'inline-table' }}>
                <div>{addressLine1}</div>
                {addressLine2 && <div>{addressLine2}</div>}
                <div>
                  {city}, {state}{' '}
                </div>
              </span>
            </div>{' '}
            {/* <span className="text-gray-800 font-semibold mx-1"> &bull; </span> */}
            {/* <div>
              <span className="text-beta font-semibold">
                {"  "}
                <i className="fas fa-glass-cheers"></i> :{" "}
                {props.data.current_participants} /{" "}
                {props.data.maximum_participants}
              </span>
            </div> */}
          </div>
          {/* <div className=" text-gray-700 text-sm ">
            by{' '}
            <span className="font-semibold text-gray-800">
              {props.data.club_data[0].club_name}
            </span>
          </div> */}
          {/* <div className="text-sm mt-1 font-semibold text-alpha tracking-wider">
            {' '}
            <i className="fas fa-calendar-day mr-1 text-sm" />{' '}
            {moment(props.data.startdate).format('LLL')}
          </div> */}
          {/* <div className="tracking-tight text-sm font-semibold text-beta flex flex-wrap w-full">
            <div>
              <i
                className="fas fa-map-marker-alt text-sm "
                style={{ marginRight: '0.6rem' }}
              />
              <span >
                {props.data.location.slice(0, 18)}
                {props.data.location.length > 18 ? '...' : ''}
              </span>
            </div>{' '}
            , {props.data.city}{' '}
            {/* <span className="text-gray-800 font-semibold mx-1"> &bull; </span> */}
          {/* <div>
              <span className="text-beta font-semibold">
                {"  "}
                <i className="fas fa-glass-cheers"></i> :{" "}
                {props.data.current_participants} /{" "}
                {props.data.maximum_participants}
              </span>
            </div>
          </div> */}

          <div className="mt-2 flex flex-wrap">
            {showList.map(
              ({ startTime, endTime, currentBookingCount, capacity, _id }) => (
                <TimeSlotTag
                  key={data}
                  status={getStatus(currentBookingCount, capacity)}
                  onClick={() => redirectToShowPage(_id)}
                >
                  {moment(startTime).format('LT')} -{' '}
                  {moment(endTime).format('LT')}
                </TimeSlotTag>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

TheatreScreen.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    showList: PropTypes.arrayOf(PropTypes.string).isRequired,
    addressLine1: PropTypes.string.isRequired,
    addressLine2: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    location: PropTypes.shape({
      coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
    }).isRequired,
  }).isRequired,
};
