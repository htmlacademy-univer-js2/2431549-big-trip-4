/* eslint-disable no-unused-vars */
import dayjs from 'dayjs';
import { LOREM_SENTENCES, RANDOM_IMG_URL, MSEC_IN_DAY, MSEC_IN_HOUR, Duration } from './const.js';

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

const getRandomImageURL = () => `${RANDOM_IMG_URL}${crypto.randomUUID()}`;

const getRandomLoremSentence = () => getRandomElement(LOREM_SENTENCES);

const formatStringToShortDate = (string) => dayjs(string).format('MMM DD');

const formatStringToTime = (string) => dayjs(string).format('HH:mm');

const capitalize = (string) => `${string[0].toUpperCase()}${string.slice(1)}`;

const getPointDuration = (dateFrom, dateTo) => {
  const timeDiff = dayjs(dateTo).diff(dayjs(dateFrom));

  let pointDuration = 0;

  switch (true) {
    case (timeDiff > MSEC_IN_DAY):
      pointDuration = dayjs.duration(timeDiff).format('DD[D] HH[H] mm[M]');
      break;
    case (timeDiff >= MSEC_IN_HOUR):
      pointDuration = dayjs.duration(timeDiff).format('HH[H] mm[M]');
      break;
    case (timeDiff < MSEC_IN_HOUR):
      pointDuration = dayjs.duration(timeDiff).format('mm[M]');
      break;
  }
};

let date = dayjs().subtract(getRandomInteger(0, Duration.DAY), 'day').toDate();

const getDate = ({ next }) => {
  const minsGap = getRandomInteger(0, Duration.MIN);
  const hoursGap = getRandomInteger(1, Duration.HOUR);
  const daysGap = getRandomInteger(0, Duration.DAY);

  if (next) {
    date = dayjs(date)
      .add(minsGap, 'minute')
      .add(hoursGap, 'hour')
      .add(daysGap, 'day')
      .toDate();
  }

  return date;
};

export {
  getRandomImageURL, getRandomLoremSentence, getRandomInteger, getRandomElement,
  getDate, getPointDuration, capitalize, formatStringToShortDate, formatStringToTime
};
