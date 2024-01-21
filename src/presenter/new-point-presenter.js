import PointEditView from '../view/point-edit-view.js';
import { remove, render } from '../framework/render.js';
import { isEscapeKey } from '../utils/point.js';
import { UpdateType, UserAction } from '../const.js';

export default class NewPointPresenter {
  #offersByTypeModel = null;
  #destinationsModel = null;

  #pointListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;

  #pointEditComponent = null;

  constructor({ offersByTypeModel, destinationsModel, pointListContainer, onDataChange, onDestroy }) {
    this.#offersByTypeModel = offersByTypeModel;
    this.#destinationsModel = destinationsModel;

    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointEditComponent = new PointEditView({
      offersByType: this.#offersByTypeModel.offersByType,
      destinations: this.#destinationsModel.destinations,
      onFormSubmit: this.#handleFormSubmit,
      onResetButtonClick: this.#handleFormCancelButtonClick
    });

    render(this.#pointEditComponent, this.#pointListContainer, 'afterbegin');

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#pointEditComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point
    );
    this.destroy();
  };

  #handleFormCancelButtonClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  };
}


