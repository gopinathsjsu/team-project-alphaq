/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { MAX_SEATS_PER_ROW, SeatStatus } from '../../../constants';
import { bookTickets, viewPrice } from './booking.thunk';

const initialState = {
  showDetails: {},
  viewPriceResponse: {},
  bookTicketsResponse: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    data: {},
  },
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
        row: rowIndex,
        column: colIndex,
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

      state.tickets.adult.price = state.showDetails?.price || 0;
      state.tickets.senior.price = state.showDetails?.price || 0;
      state.tickets.child.price = state.showDetails?.price || 0;

      const seats = createSeatMatrix(
        action.payload?.capacity || 0,
        MAX_SEATS_PER_ROW,
      );

      state?.showDetails?.reservedSeats.forEach(({ row, column }) => {
        seats[row][column].status = SeatStatus.OCCUPIED;
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
  extraReducers: (builder) => {
    builder
      .addCase(viewPrice.pending, (state) => {
        state.viewPriceResponse = {};
      })
      .addCase(viewPrice.fulfilled, (state, action) => {
        state.viewPriceResponse = action.payload;
      })
      .addCase(viewPrice.rejected, (state) => {
        state.viewPriceResponse = {};
      })
      .addCase(bookTickets.pending, (state) => {
        state.bookTicketsResponse = initialState.bookTicketsResponse;
      })
      .addCase(bookTickets.fulfilled, (state, action) => {
        state.bookTicketsResponse.data = action.payload;
        state.bookTicketsResponse.isSuccess = true;
        state.bookTicketsResponse.isLoading = false;
        state.bookTicketsResponse.isError = false;
        state.bookTicketsResponse.errorMessage = '';
      })
      .addCase(bookTickets.rejected, (state) => {
        state.bookTicketsResponse = initialState.bookTicketsResponse;
        state.bookTicketsResponse.isError = true;
        state.bookTicketsResponse.errorMessage = 'Something went wrong';
      });
  },
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
