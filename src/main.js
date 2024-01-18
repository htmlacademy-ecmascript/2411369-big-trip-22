import PointsModel from './model/points-model.js';
import BoardPresenter from './presenter/board-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';


const headerElement = document.querySelector('.page-header');
const filterElement = headerElement.querySelector('.trip-controls__filters');
const infoTripElement = headerElement.querySelector('.trip-main');
const mainElement = document.querySelector('.page-main');
const eventsTripElement = mainElement.querySelector('.trip-events');

const pointsModel = new PointsModel();
const boardPresenter = new BoardPresenter({
  boardContainer: eventsTripElement,
  filtersContainer: filterElement,
  pointsModel,
});
const tripInfoPresenter = new TripInfoPresenter({
  tripInfoContainer: infoTripElement,
  pointsModel
});

boardPresenter.init();
tripInfoPresenter.init();
