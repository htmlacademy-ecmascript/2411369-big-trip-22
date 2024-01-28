import PointsModel from './model/points-model.js';
import BoardPresenter from './presenter/board-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import FilterModel from './model/filter-model.js';
import NewPointButtonView from './view/new-point-button-view.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsApiService from './points-api-service.js';
import { render } from './framework/render.js';

const AUTHORIZATION = 'Basic 767LoHVNbXvdsg';
const END_POINT = 'https://21.objects.htmlacademy.pro/big-trip';

const tripElement = document.querySelector('.trip-main');
const tripInfoElement = tripElement.querySelector('.trip-controls__filters');
const boardElement = document.querySelector('.page-main');
const eventsTripElement = boardElement.querySelector('.trip-events');

const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
const filterModel = new FilterModel();

const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick
});

const boardPresenter = new BoardPresenter({
  listContainer: eventsTripElement,
  pointsModel,
  filterModel,
  onNewPointDestroy: handleNewPointButtonClose
});

const filterPresenter = new FilterPresenter({
  filterContainer: tripInfoElement,
  filterModel,
  pointsModel
});

const tripInfoPresenter = new TripInfoPresenter({
  tripInfoContainer: tripElement,
  pointsModel
});

function handleNewPointButtonClick() {
  boardPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

function handleNewPointButtonClose() {
  newPointButtonComponent.element.disabled = false;
}

render(newPointButtonComponent, tripElement);

tripInfoPresenter.init();
filterPresenter.init();
boardPresenter.init();
pointsModel.init().finally(() => {
  render(newPointButtonComponent, tripElement);
});
