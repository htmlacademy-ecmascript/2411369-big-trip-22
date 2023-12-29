import AbstractView from '../framework/view/abstract-view';

const messagesByFilter = {
  everthing: 'Click New Event to create your first point',
  past: 'There are no past events now',
  present: 'There are no present events now',
  future: 'There are no future events now'
};

const createListMessageTemplate = () => `<p class="trip-events__msg">${messagesByFilter.everthing}</p>`;

export default class PointListMessageView extends AbstractView {
  get template() {
    return createListMessageTemplate();
  }
}
