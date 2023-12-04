export const scoreTitles = ['Weak', 'Medium', 'Okayish', 'Strong', 'Goku'];

export const MAX_BOOKABLE_DAY = 7;
export const MAX_BOOKABLE_SEATS = 8;
export const MAX_SEATS_PER_ROW = 20;

export const cardTypes = {
  MOVIE: 'movie',
  THEATRE: 'theatre',
  UPCOMING_MOVIE: 'upcoming_movie',
};

export const SeatStatus = {
  AVAILABLE: 0,
  OCCUPIED: 1,
  SELECTED: 2,
  OVERFLOW: 3,
};

export const dummyMovieObj = {
  photo:
    'https://res.cloudinary.com/crossify/image/upload/v1621453716/Event/tonton-revolver-clash-of-code.jpg.jpg',
  _id: 1,
  name: 'Batman',
  releaseDate: '12/12/2003',
  studio: 'DC Studio',
  director: 'Nolan',
  description: 'Gajab',
  tags: [{ name: 'Sci-fi', _id: 123 }],
  liked: false,
  duration: 123,
  imdbRating: 9.5,
};

export const showStatusLegends = [
  { name: 'Available', status: 0 },
  { name: 'Filling fast', status: 1 },
  { name: 'Sold out', status: 2 },
];

export const getStatus = (booked, total) => {
  const available = total - booked;
  if (available === 0) return 2;
  if (available < booked) return 1;
  return 0;
};

export const dummyNearbyTheatres = [
  {
    _id: 1,
    name: 'PVR',
    photo:
      'https://res.cloudinary.com/crossify/image/upload/v1621453716/Event/tonton-revolver-clash-of-code.jpg.jpg',
    location: 'Borivali',
    addressLine1: '101 E Sanfernando',
    addressLine2: 'Apt 101',
    city: 'San Jose',
    state: 'California',
    shows: [
      {
        startMinuteOfTheDay: 720,
        endMinuteOfTheDay: 840,
        status: 0,
        _id: 1,
      },
      {
        startMinuteOfTheDay: 960,
        endMinuteOfTheDay: 1080,
        status: 1,
        _id: 2,
      },
      {
        startMinuteOfTheDay: 1320,
        endMinuteOfTheDay: 1440,
        status: 2,
        _id: 4,
      },
    ],
    distance: 1,
  },
  {
    _id: 2,
    name: 'ABC',
    photo:
      'https://res.cloudinary.com/crossify/image/upload/v1621453716/Event/tonton-revolver-clash-of-code.jpg.jpg',
    location: 'Ranip',
    addressLine1: '101 E Sanfernando',
    addressLine2: 'Apt 101',
    city: 'Ahmedabad',
    state: 'Gujarat',
    shows: [
      {
        startMinuteOfTheDay: 720,
        endMinuteOfTheDay: 840,
        status: 0,
        _id: 1,
      },
      {
        startMinuteOfTheDay: 960,
        endMinuteOfTheDay: 1080,
        status: 1,
        _id: 2,
      },
      {
        startMinuteOfTheDay: 1320,
        endMinuteOfTheDay: 1440,
        status: 2,
        _id: 3,
      },
    ],
    distance: 1.4,
  },
];

export const dummyShowObj = {
  movie: dummyMovieObj,
  theater: dummyNearbyTheatres[0],
  startTime: '2030-07-19T19:30:00.000Z',
  endTime: '2030-07-19T19:30:00.000Z',
};
