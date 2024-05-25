import { CITIES } from '../const.js';
import { getRandomElement, getRandomImageURL, getRandomLoremSentence } from '../utils.js';

const PICTURE_COUNT = 4;

const generatePicture = (city) => {
  const picture = {
    src: getRandomImageURL(),
    description: `${city}`
  };

  return picture;
};

const generateDestination = () => {
  const city = getRandomElement(CITIES);

  return {
    id: crypto.randomUUID(),
    name: city,
    description: getRandomLoremSentence(),
    pictures: Array.from({ length: PICTURE_COUNT }, () => generatePicture(city))
  };
};

export { generateDestination };
