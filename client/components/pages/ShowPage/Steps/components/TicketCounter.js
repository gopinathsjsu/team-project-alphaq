import React from 'react';
import PropTypes from 'prop-types';
import { numberToDollar } from '../../../../../constants';

export default function TicketCounter({
  title,
  price,
  count,
  setCount,
  disableIncrement,
}) {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex flex-col">
        <div className="text-xl font-bold text-gray-800">{title}</div>
        <div className="text-sm">{numberToDollar(price)}</div>
      </div>
      <div className="flex items-center">
        <button
          className="text-beta bg-white shadow border border-solid  hover:bg-beta hover:text-white active:bg-blue-600 shadow hover:text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none  ease-linear transition-all duration-150"
          onClick={() => setCount(Math.max(0, count - 1))}
          type="button"
        >
          -
        </button>
        <div className="text-lg text-center" style={{ width: 50 }}>
          {count}
        </div>
        <button
          className="text-beta bg-white shadow border border-solid  hover:bg-beta hover:text-white active:bg-blue-600 shadow hover:text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none  ease-linear transition-all duration-150"
          onClick={() => setCount(count + 1)}
          type="button"
          disabled={disableIncrement}
        >
          +
        </button>
      </div>
    </div>
  );
}

TicketCounter.defaultProps = {
  disableIncrement: false,
};

TicketCounter.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  setCount: PropTypes.func.isRequired,
  disableIncrement: PropTypes.bool,
};
