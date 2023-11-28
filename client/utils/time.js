import moment from 'moment';

const adjustTime = (time) => {
  if (time < 10) {
    return `0${time}`;
  }
  return time;
};

export const readableHour = (minuteOfTheDay) => {
  const hour = Math.floor(minuteOfTheDay / 60);
  const minute = minuteOfTheDay % 60;
  const period = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${adjustTime(formattedHour)}:${adjustTime(minute)} ${period}`;
};

export const getNextNDays = (curDate, n) => {
  const days = [];
  for (let i = 0; i < n; i += 1) {
    const date = moment(curDate).add(i, 'days');
    days.push(date);
  }
  return days;
};