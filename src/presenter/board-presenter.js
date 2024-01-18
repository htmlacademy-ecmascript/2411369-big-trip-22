import PointPresenter from './point-presenter.js';
import PointListView from '../view/point-list-view.js';
import PointListMessageView from '../view/point-list-empty-message-view.js';
import SortView from '../view/sort-view.js';
import { render } from '../framework/render.js';
import { updateItem } from '../utils/common.js';
import { SORT_TYPE } from '../const.js';
import { sortByDay, sortByTime, sortByPrice } from '../utils/point.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;

  #pointListComponent = new PointListView();
  #sortComponent = null;
  #listMessageComponent = new PointListMessageView();

  #boardPoints = [];
  #pointPresenters = new Map();
  #currentSortType = SORT_TYPE.DAY;

  constructor({ boardContainer, pointsModel }) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.points];

    this.#renderBoard();
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointListComponent.element,
      onDateChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderList();
  };

  #sortPoints(sortType) {
    switch (sortType) {
      case SORT_TYPE.PRICE:
        this.#boardPoints.sort(sortByPrice);
        break;
      case SORT_TYPE.TIME:
        this.#boardPoints.sort(sortByTime);
        break;
      default:
        this.#boardPoints.sort(sortByDay);
    }

    this.#currentSortType = sortType;
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#boardContainer, 'afterbegin');
  }

  #renderListMessage() {
    render(this.#listMessageComponent, this.#pointListComponent.element);
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderList() {
    render(this.#pointListComponent, this.#boardContainer);

    if (this.#boardPoints.length) {
      this.#sortPoints(this.#currentSortType);
      for (let i = 0; i < this.#boardPoints.length; i++) {
        this.#renderPoint(this.#boardPoints[i]);
      }
    } else {
      this.#renderListMessage();
    }
  }

  #renderBoard() {
    this.#renderSort();
    this.#renderList();
  }
}
