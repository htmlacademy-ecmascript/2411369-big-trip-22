import PointEditView from '../view/point-edit-view.js';
import { remove, render } from '../framework/render.js';
import { isEscapeKey } from '../utils/point.js';
import { UpdateType, UserAction } from '../const.js';

export default class NewPointPresenter {
  #pointsModel = null;

  #pointListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;

  #pointEditComponent = null;

  constructor({ pointsModel, pointListContainer, onDataChange, onDestroy }) {
    this.#pointsModel = pointsModel;

    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointEditComponent = new PointEditView({
      offersByType: this.#pointsModel.offers,
      destinations: this.#pointsModel.destinations,
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

  setSaving() {
    this.#pointEditComponent.updateElement({
      isDisabled: true,
      isSaving: true
    });
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point
    );
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


