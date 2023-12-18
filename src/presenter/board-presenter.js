import SortView from '../view/sort-view.js';
import ListView from '../view/list-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';
import { render } from '../render.js';
import { getRandomArrayElement } from '../utils.js';

export default class BoardPresenter {
  sortComponent = new SortView();
  pointListComponent = new ListView();

  constructor({ boardContainer, pointsModel }) {
    this.boardContainer = boardContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.boardPoints = [...this.pointsModel.getPoints()];

    render(this.pointListComponent, this.boardContainer);
    render(this.sortComponent, this.boardContainer, 'afterbegin');
    render(new PointEditView(getRandomArrayElement(this.boardPoints)), this.pointListComponent.getElement(), 'afterbegin');

    for (let i = 0; i < this.boardPoints.length; i++) {
      render(new PointView({ point: this.boardPoints[i] }), this.pointListComponent.getElement());
    }
  }
}
