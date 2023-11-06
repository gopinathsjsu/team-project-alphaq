import React from 'react';
import PropTypes from 'prop-types';
import { readableHour } from '../../../../../utils/time';
import TimeSlotTag from './TimeSlotTag';

export default function TheatreScreen({ data }) {
  const { name, shows } = data;
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
      <div style={{ minWidth: '250px' }}>
        <div className="leading-3" style={{ marginLeft: '1.25rem' }}>
          <div
            className="text-2xl font-bold  "
            style={{ lineHeight: '1.8rem' }}
          >
            {name}
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
              <span className="truncate max-ch-10 ">
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
            {shows.map(({ startMinuteOfTheDay, endMinuteOfTheDay, status }) => (
              <TimeSlotTag key={data} status={status}>
                {readableHour(startMinuteOfTheDay)} -{' '}
                {readableHour(endMinuteOfTheDay)}
              </TimeSlotTag>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

TheatreScreen.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    shows: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};
