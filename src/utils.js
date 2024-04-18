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
      pointDuration = dayjs(timeDiff).format('DD[D] HH[H] mm[M]');
      break;
    case (timeDiff >= MSEC_IN_HOUR):
      pointDuration = dayjs(timeDiff).format('HH[H] mm[M]');
      break;
    case (timeDiff < MSEC_IN_HOUR):
      pointDuration = dayjs(timeDiff).format('mm[M]');
      break;
  }

  return pointDuration;
};

const isPointInTheFuture = (point) => dayjs(point.dateFrom).isAfter(dayjs());

const isPointInThePast = (point) => {
  const currentDate = dayjs();
  const isStartDateBeforeOrEqual = dayjs(point.dateFrom).isBefore(currentDate) || dayjs(point.dateFrom).isSame(currentDate);
  const isEndDateAfterOrEqual = dayjs(point.dateTo).isAfter(currentDate) || dayjs(point.dateTo).isSame(currentDate);

  return isStartDateBeforeOrEqual && isEndDateAfterOrEqual;
};

const isPointInThePresent = (point) => dayjs(point.dateTo).isBefore(dayjs());

const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);

export {
  getRandomImageURL, getRandomLoremSentence, getRandomInteger, getRandomElement,
  getPointDuration, capitalize, formatStringToShortDate, formatStringToTime,
  isPointInThePresent, isPointInTheFuture, isPointInThePast,
  updateItem
};
