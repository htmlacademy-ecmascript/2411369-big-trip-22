import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import FormEditView from '../view/form-edit-view.js';
import PointView from '../view/point-view.js';
import { render } from '../render.js';

const LIMIT_POINT = 3;

export default class BoardPresenter {
  sortComponent = new SortView();
  editListComponent = new EventListView();

  constructor({container}) {
    this.container = container;
  }

  init() {
    render(this.sortComponent, this.container);
    render(this.editListComponent, this.container);
    render(new FormEditView(), this.editListComponent.getElement());

    for (let i = 0; i < LIMIT_POINT; i++) {
      render (new PointView, this.editListComponent.getElement());
    }
  }
}
