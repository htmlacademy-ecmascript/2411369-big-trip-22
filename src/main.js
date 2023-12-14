import FilterView from './view/filter-view.js';
import InfoTripView from './view/info-trip-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import { render } from './render';

const headerElement = document.querySelector('.page-header');
const filterElement = headerElement.querySelector('.trip-controls__filters');
const infoTripElement = headerElement.querySelector('.trip-main');
const mainElement = document.querySelector('.page-main');
const eventsTripElement = mainElement.querySelector('.trip-events');

const boardPresenter = new BoardPresenter({container: eventsTripElement});

render(new InfoTripView(), infoTripElement, 'afterbegin');
render(new FilterView(), filterElement);

boardPresenter.init();
