/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { MAX_SEATS_PER_ROW, SeatStatus } from '../../../constants';

const initialState = {
  showDetails: {},
  tickets: {
    adult: {
      price: 1,
      quantity: 0,
    },
    senior: {
      price: 1,
      quantity: 0,
    },
    child: {
      price: 1,
      quantity: 0,
    },
  },
  applyRewardPoints: false,
  rewardPoints: 0,
  capacity: 1,
  seats: [],
};

function createSeatMatrix(totalCapacity, seatsPerRow) {
  const numRows = Math.ceil(totalCapacity / seatsPerRow);
  const seatMatrix = [];

  for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
    const row = [];
    for (let colIndex = 0; colIndex < seatsPerRow; colIndex++) {
      const seatIndex = rowIndex * seatsPerRow + colIndex;
      const seatNumber = String.fromCharCode(65 + rowIndex) + (colIndex + 1);
      const seat = {
        rowIndex,
        colIndex,
        seatNumber,
        status:
          seatIndex < totalCapacity
            ? SeatStatus.AVAILABLE
            : SeatStatus.OVERFLOW,
      };
      row.push(seat);
    }
    seatMatrix.push(row);
  }

  return seatMatrix;
}

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setShowDetails: (state, action) => {
      state.showDetails = action.payload;

      if (!state.showDetails) {
        return;
      }

      const seats = createSeatMatrix(
        action.payload?.capacity || 0,
        MAX_SEATS_PER_ROW,
      );

      state?.showDetails?.reservedSeats.forEach(({ rowIndex, colIndex }) => {
        seats[rowIndex][colIndex].status = SeatStatus.OCCUPIED;
      });

      state.seats = seats;
    },

    toggleSeatSelection: (state, action) => {
      const { rowIndex, colIndex } = action.payload;
      state.seats[rowIndex][colIndex].status =
        state.seats[rowIndex][colIndex].status === SeatStatus.AVAILABLE
          ? SeatStatus.SELECTED
          : SeatStatus.AVAILABLE;
    },

    setAdultTicketQuantity: (state, action) => {
      state.tickets.adult.quantity = action.payload;
    },

    // Reducer to set the quantity of senior tickets
    setSeniorTicketQuantity: (state, action) => {
      state.tickets.senior.quantity = action.payload;
    },

    // Reducer to set the quantity of child tickets
    setChildTicketQuantity: (state, action) => {
      state.tickets.child.quantity = action.payload;
    },

    // Reducer to toggle applyRewardPoints
    toggleApplyRewardPoints: (state) => {
      state.applyRewardPoints = !state.applyRewardPoints;
    },
  },
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(loginWithEmailPass.pending, (state) => {
  //         state.isValidatingUser = true;
  //         state.loggedIn = false;
  //       })
  //       .addCase(loginWithEmailPass.fulfilled, (state, action) => {
  //         state.isValidatingUser = false;
  //         state.loggedIn = true;
  //         state.user = action.payload.userInfo;
  //       })
  //       .addCase(loginWithEmailPass.rejected, (state) => {
  //         state.isValidatingUser = false;
  //         state.loggedIn = false;
  //       });
  //   },
});

export const {
  setShowDetails,
  setAdultTicketQuantity,
  setSeniorTicketQuantity,
  setChildTicketQuantity,
  toggleApplyRewardPoints,
  toggleSeatSelection,
} = bookingSlice.actions;

export default bookingSlice.reducer;
