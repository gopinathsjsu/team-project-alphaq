import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SeatStatus } from '../../../../constants';
import { toggleSeatSelection } from '../../../../store/features/booking/booking.slice';

const bgColor = {
  [SeatStatus.AVAILABLE]: 'bg-green-200',
  [SeatStatus.OCCUPIED]: 'bg-gray-400',
  [SeatStatus.SELECTED]: 'bg-blue-500',
  [SeatStatus.OVERFLOW]: 'bg-gray-400',
};

export default function SeatSelection() {
  const dispatch = useDispatch();
  const { seats = [], tickets } = useSelector((state) => state.booking);
  const columnHeaders = seats?.[0]
    ? seats[0].map((seat) => seat.colIndex + 1)
    : [];

  const totalQuantity =
    tickets.adult.quantity + tickets.child.quantity + tickets.senior.quantity;

  const selectedSeatCount = seats.reduce(
    (count, row) =>
      count +
      row.reduce(
        (prev, seat) => prev + Number(seat.status === SeatStatus.SELECTED),
        0,
      ),
    0,
  );

  const disableSelection = selectedSeatCount >= totalQuantity;

  const handleSeatToggle = (rowIndex, colIndex) => {
    dispatch(toggleSeatSelection({ rowIndex, colIndex }));
  };

  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="flex-1" />
        <div className="flex justify-center items-center p-4 flex-1">
          {['Available', 'Occupied', 'Selected'].map((name, index) => (
            <div className="flex items-center mr-4" key={name}>
              <div
                className={`w-6 h-6 m-1 text-center border rounded-lg ${bgColor[index]}`}
              />
              <span className="text-sm">{name}</span>
            </div>
          ))}
        </div>
        <div className="flex-1 text-right">
          {selectedSeatCount} / {totalQuantity} Selected
        </div>
      </div>
      <div className="flex justify-center">
        {/* Render column numbers */}
        <div className="w-8" /> {/* Empty space for row labels */}
        {columnHeaders.map((colNum) => (
          <div key={colNum} className="w-8 text-center m-1 ">
            {colNum}
          </div>
        ))}
      </div>

      {seats.map((row, rowIndex) => (
        <div key={row} className="flex justify-center items-center">
          {/* Render row letter */}
          <div className="w-8 text-center">
            {String.fromCharCode(65 + rowIndex)}
          </div>
          {/* Render seats */}
          {row.map((seat, colIndex) => (
            <div
              key={seat}
              className={`w-8 h-8 m-1 text-center border rounded-lg ${
                bgColor[seat.status]
              }`}
            >
              <button
                type="button"
                className="w-full h-full outline-none focus:outline-none cursor-pointer"
                onClick={() => handleSeatToggle(rowIndex, colIndex)}
                disabled={
                  seat.status === SeatStatus.OVERFLOW ||
                  seat.status === SeatStatus.OCCUPIED ||
                  (seat.status !== SeatStatus.SELECTED && disableSelection)
                }
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
