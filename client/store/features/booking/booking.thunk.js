import { createAsyncThunk } from '@reduxjs/toolkit';
import AxiosConfig from '../../../constants/axiosConfig';
import { SeatStatus } from '../../../constants';

export const viewPrice = createAsyncThunk(
  'booking/viewPrice',
  async (_, { rejectWithValue, getState }) => {
    const { auth, booking } = getState();
    try {
      const { data } = await AxiosConfig.post('/api/bookings/viewPrice', {
        userId: auth?.user?._id,
        showId: booking.showDetails._id,
        child: booking.tickets.child.quantity,
        adult: booking.tickets.adult.quantity,
        senior: booking.tickets.senior.quantity,
        applyRewardPoints: booking.applyRewardPoints,
      });
      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);

export const bookTickets = createAsyncThunk(
  'booking/bookTickets',
  async (_, { rejectWithValue, getState }) => {
    const { auth, booking } = getState();
    try {
      const userSeats = booking.seats
        .flat()
        .filter((seat) => seat.status === SeatStatus.SELECTED);

      const { data } = await AxiosConfig.post('/api/bookings/bookTickets', {
        userId: auth?.user?._id,
        showId: booking.showDetails._id,
        seats: userSeats,
        child: booking.tickets.child.quantity,
        adult: booking.tickets.adult.quantity,
        senior: booking.tickets.senior.quantity,
        applyRewardPoints: booking.applyRewardPoints,
      });
      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);
