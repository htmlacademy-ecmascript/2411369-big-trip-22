import AbstractView from '../framework/view/abstract-view';

const MULTIPLE_SYMBOL = '...';
const MAX_CITIES_VISIBLE_COUNT = 3;

const createTripRouteTemplate = (waypoints) => {
  const startPoint = waypoints[0];
  const endPoint = waypoints[waypoints.length - 1];

  let middlePoint = waypoints[1];
  let routeString = '';

  if (waypoints.length > MAX_CITIES_VISIBLE_COUNT) {
    middlePoint = MULTIPLE_SYMBOL;
  }

  switch (waypoints.length) {
    case 1:
      routeString = startPoint;
      break;
    case 2:
      routeString = `${startPoint} —&nbsp;${endPoint}`;
      break;
    default:
      routeString = `${startPoint} —&nbsp;${middlePoint} —&nbsp;${endPoint}`;
  }

  return `<h1 class="trip-info__title">${routeString}</h1>`;
};

export default class TripRouteView extends AbstractView {
  #waypoints = null;

  constructor(waypoints) {
    super();

    this.#waypoints = waypoints;
  }

  get template() {
    return createTripRouteTemplate(this.#waypoints);
  }
}
