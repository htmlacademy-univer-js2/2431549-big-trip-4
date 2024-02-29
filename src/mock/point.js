import { getDate, getRandomInteger } from '../utils.js';
import { Price } from '../const.js';

const generatePoint = (type, destinationId, offersId) => ({
  id: crypto.randomUUID(),
  basePrice: getRandomInteger(Price.MIN, Price.MAX),
  dateFrom: getDate({ next: false }),
  dateTo: getDate({ next: true }),
  destination: destinationId,
  isFavorite: getRandomInteger(0, 1),
  offers: offersId,
  type
});

export { generatePoint };
