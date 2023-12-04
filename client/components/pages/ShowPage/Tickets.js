import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Checkout, SeatSelection, TicketTypeSelection } from './Steps';
import { setShowDetails } from '../../../store/features/booking/booking.slice';
import { SeatStatus } from '../../../constants';

const steps = [
  {
    id: 0,
    name: 'Shop',
    component: TicketTypeSelection,
  },
  {
    id: 1,
    name: 'Seat Selection',
    component: SeatSelection,
  },
  {
    id: 2,
    name: 'Payment',
    component: Checkout,
  },
];

const css = {
  COMPLETED:
    'flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700',
  CURRENT:
    'flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2',
  INCOMLETE:
    'flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white',
};

const getStateOfStep = (index, activeStep) => {
  if (index < activeStep) {
    return 'COMPLETED';
  }
  if (index === activeStep) {
    return 'CURRENT';
  }
  return 'INCOMLETE';
};

export default function Tickets({ showData }) {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);

  const seats = useSelector((state) => state.booking.seats);
  const tickets = useSelector((state) => state.booking.tickets);

  useEffect(() => {
    dispatch(setShowDetails(showData));
  }, [dispatch, showData]);

  const calculateSelectedCount = () =>
    seats.reduce(
      (count, row) =>
        count +
        row.reduce(
          (prev, seat) => prev + Number(seat.status === SeatStatus.SELECTED),
          0,
        ),
      0,
    );

  const book = () => {
    // do all the booking stuff here
  };

  const totalQuantity =
    tickets.adult.quantity + tickets.child.quantity + tickets.senior.quantity;
  const isNextDisabled =
    (activeStep === 0 && totalQuantity === 0) ||
    (activeStep === 1 && calculateSelectedCount() !== totalQuantity);

  const curStep = steps[activeStep];

  return (
    <div className=" bg-white rounded-lg max-w-md mx-auto">
      <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
        <div className="relative">
          <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                  <a
                    className={css[getStateOfStep(index, activeStep)]}
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
                  <span
                    className={`font-semibold ${
                      getStateOfStep(index, activeStep) === 'INCOMLETE'
                        ? 'text-gray-500'
                        : 'text-gray-900'
                    }`}
                  >
                    {step.name}
                  </span>
                </li>
                {index !== steps.length - 1 && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-600"
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
                )}
              </React.Fragment>
            ))}
          </ul>
        </div>
      </div>
      <div className="p-4">
        <div>
          <curStep.component />
        </div>
        <div className="flex mt-4">
          <button type="button" onClick={() => setActiveStep(activeStep - 1)}>
            {' '}
            Prev{' '}
          </button>
          <div className="ml-auto">
            <button
              type="button"
              onClick={() =>
                activeStep === steps.length - 1
                  ? book()
                  : setActiveStep(activeStep + 1)
              }
              disabled={isNextDisabled}
              className="text-white bg-beta text-sm rounded-lg mx-2 px-4 py-1 font-semibold uppercase outline-none focus:outline-none hover:bg-beta-dark transition duration-200 ease-in-out"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

Tickets.propTypes = {
  showData: PropTypes.shape({
    name: PropTypes.string,
    studio: PropTypes.string,
    duration: PropTypes.number,
    tags: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.string,
    poster: PropTypes.string,
    trailer: PropTypes.string,
    releaseDate: PropTypes.string,
    endDate: PropTypes.string,
    genre: PropTypes.string,
    language: PropTypes.string,
    censor: PropTypes.string,
    format: PropTypes.string,
    price: PropTypes.number,
    availableSeats: PropTypes.number,
    totalSeats: PropTypes.number,
    showTime: PropTypes.string,
    showDate: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};
