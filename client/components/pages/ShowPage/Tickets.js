import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MAX_BOOKABLE_SEATS } from '../../../constants';

function TicketCounter({ title, price, count, setCount, disableIncrement }) {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex flex-col">
        <div className="text-xl font-bold text-gray-800">{title}</div>
        <div className="text-sm">${price}</div>
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

export default function Tickets() {
  const [adultTickets, setAdultTickets] = useState(4);
  const [seniorTickets, setSeniorTickets] = useState(0);
  const [childTickets, setChildTickets] = useState(0);

  const adultPrice = 15.67;
  const seniorPrice = 14.67;
  const childPrice = 13.67;

  const disableIncrement =
    adultTickets + seniorTickets + childTickets >= MAX_BOOKABLE_SEATS;

  return (
    <div className="p-4 bg-white shadow-md rounded-lg max-w-md mx-auto">
      <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
        <div className="relative">
          <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
            <li className="flex items-center space-x-3 text-left sm:space-x-4">
              <a
                className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                href="#"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </a>
              <span className="font-semibold text-gray-900">Shop</span>
            </li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
            <li className="flex items-center space-x-3 text-left sm:space-x-4">
              <a
                className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                href="#"
              >
                2
              </a>
              <span className="font-semibold text-gray-900">Shipping</span>
            </li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
            <li className="flex items-center space-x-3 text-left sm:space-x-4">
              <a
                className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                href="#"
              >
                3
              </a>
              <span className="font-semibold text-gray-500">Payment</span>
            </li>
          </ul>
        </div>
      </div>
      <TicketCounter
        title="Adult"
        price={adultPrice}
        count={adultTickets}
        setCount={setAdultTickets}
        disableIncrement={disableIncrement}
      />
      <TicketCounter
        title="Senior"
        price={seniorPrice}
        count={seniorTickets}
        setCount={setSeniorTickets}
        disableIncrement={disableIncrement}
      />
      <TicketCounter
        title="Child"
        price={childPrice}
        count={childTickets}
        setCount={setChildTickets}
        disableIncrement={disableIncrement}
      />
    </div>
  );
}
