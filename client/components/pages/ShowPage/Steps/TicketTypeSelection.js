import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MAX_BOOKABLE_SEATS } from '../../../../constants';
import {
  setAdultTicketQuantity,
  setChildTicketQuantity,
  setSeniorTicketQuantity,
  toggleApplyRewardPoints,
} from '../../../../store/features/booking/booking.slice';
import TicketCounter from './components/TicketCounter';

export default function TicketTypeSelection() {
  const dispatch = useDispatch();
  const { adult, senior, child, applyRewardPoints } = useSelector(
    (state) => state.booking.tickets,
  );

  const handleAdultTicketQuantityChange = (quantity) => {
    dispatch(setAdultTicketQuantity(quantity));
  };

  const handleSeniorTicketQuantityChange = (quantity) => {
    dispatch(setSeniorTicketQuantity(quantity));
  };

  const handleChildTicketQuantityChange = (quantity) => {
    dispatch(setChildTicketQuantity(quantity));
  };

  const handleToggleApplyRewards = () => {
    dispatch(toggleApplyRewardPoints());
  };

  const disableIncrement =
    adult.quantity + senior.quantity + child.quantity >= MAX_BOOKABLE_SEATS;
  return (
    <div>
      {' '}
      <TicketCounter
        title="Adult"
        price={adult.price}
        count={adult.quantity}
        setCount={handleAdultTicketQuantityChange}
        disableIncrement={disableIncrement}
      />
      <TicketCounter
        title="Senior"
        price={senior.price}
        count={senior.quantity}
        setCount={handleSeniorTicketQuantityChange}
        disableIncrement={disableIncrement}
      />
      <TicketCounter
        title="Child"
        price={child.price}
        count={child.quantity}
        setCount={handleChildTicketQuantityChange}
        disableIncrement={disableIncrement}
      />
      <div className="flex">
        <div className="text-sm">
          Maximum of {MAX_BOOKABLE_SEATS} Tickets: Please note that you can
          select up to {MAX_BOOKABLE_SEATS} tickets per transaction.
        </div>
        <div className="ml-auto">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              onChange={handleToggleApplyRewards}
              checked={applyRewardPoints}
            />
            <span className="ml-2 text-gray-700 text-sm">Use my rewards</span>
          </label>
        </div>
      </div>
    </div>
  );
}
