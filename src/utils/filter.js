import { FILTER_TYPE } from '../const';
import { isPastEvent, isPresentEvent, isFutureEvent } from './point.js';

const filter = {
  [FILTER_TYPE.EVERYTHING]: (points) => points,
  [FILTER_TYPE.FUTURE]: (points) => points.filter(isFutureEvent),
  [FILTER_TYPE.PRESENT]: (points) => points.filter(isPresentEvent),
  [FILTER_TYPE.PAST]: (points) => points.filter(isPastEvent),
};

export { filter };
