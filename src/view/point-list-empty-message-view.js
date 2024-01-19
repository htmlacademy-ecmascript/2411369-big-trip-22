import AbstractView from '../framework/view/abstract-view';

const messagesByFilter = {
  'everything': 'Click New Event to create your first point',
  'past': 'There are no past events now',
  'present': 'There are no present events now',
  'future': 'There are no future events now'
};

const createListMessageTemplate = (filterType) => `<p class="trip-events__msg">${messagesByFilter[filterType]}</p>`;

export default class PointListMessageView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();

    this.#filterType = filterType;
  }

  get template() {
    return createListMessageTemplate(this.#filterType);
  }
}
