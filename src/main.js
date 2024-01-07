import PointsModel from './model/points-model.js';
import BoardPresenter from './presenter/board-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import { render } from './framework/render.js';
import { generateFilter } from './mock/filter.js';


const headerElement = document.querySelector('.page-header');
const filterElement = headerElement.querySelector('.trip-controls__filters');
const infoTripElement = headerElement.querySelector('.trip-main');
const mainElement = document.querySelector('.page-main');
const eventsTripElement = mainElement.querySelector('.trip-events');

const pointsModel = new PointsModel();
const boardPresenter = new BoardPresenter({
  boardContainer: eventsTripElement,
  pointsModel,
});
const tripInfoPresenter = new TripInfoPresenter({
  tripInfoContainer: infoTripElement,
  pointsModel
});
const filters = generateFilter(pointsModel.points);

render(new FilterView({ filters }), filterElement);
render(new SortView(), eventsTripElement);


boardPresenter.init();
tripInfoPresenter.init();
