import FilterView from './view/filter-view.js';
import InfoTripView from './view/info-trip-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';
import SortView from './view/sort-view.js';
import { render } from './framework/render.js';


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

render(new InfoTripView(), infoTripElement, 'afterbegin');
render(new FilterView(), filterElement);
render(new SortView(), eventsTripElement);


boardPresenter.init();
