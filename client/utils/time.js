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
    const date = moment(curDate)
      .startOf('day')
      .add(i, 'days')
      .format('YYYY-MM-DD');
    days.push(date);
  }
  return days;
};

export const durationToWatchTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  let formattedTime = '';

  if (hours > 0) {
    formattedTime += `${hours}h `;
  }
  if (remainingMinutes > 0 || hours === 0) {
    formattedTime += `${remainingMinutes}m`;
  }

  return formattedTime;
};
