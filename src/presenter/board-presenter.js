import ListView from '../view/list-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';
import { render, replace } from '../framework/render.js';
import PointListMessageView from '../view/point-list-empty-message-view.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;

  #pointListComponent = new ListView();

  #boardPoints = [];

  constructor({ boardContainer, pointsModel }) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.points];

    render(this.#pointListComponent, this.#boardContainer);

    if (this.#boardPoints.length > 0) {
      for (let i = 0; i < this.#boardPoints.length; i++) {
        this.#renderPoint(this.#boardPoints[i]);
      }
    } else {
      render(new PointListMessageView(), this.#pointListComponent.element);
    }
    // render(this.#sortComponent, this.#boardContainer, 'afterbegin');
    // render(new PointEditView(getRandomArrayElement(this.#boardPoints)), this.#pointListComponent.element, 'afterbegin');
  }

  #renderPoint(point) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointView({
      point,
      onRollupButtonClick: () => {
        replacePointToForm.call(this);
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const pointEditComponent = new PointEditView({
      point,
      onFormSubmit: () => {
        replaceFormToPoint.call(this);
        document.addEventListener('keydown', escKeyDownHandler);
      },
      onRollupButtonClick: () => {
        replaceFormToPoint.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToForm() {
      replace(pointEditComponent, pointComponent);
    }

    function replaceFormToPoint() {
      replace(pointComponent, pointEditComponent);
    }

    render(pointComponent, this.#pointListComponent.element);
  }
}
