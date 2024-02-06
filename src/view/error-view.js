import AbstractView from '../framework/view/abstract-view.js';

const createErrorTemplate = () => '<p class="trip-events__msg">Failed to load latest route information. Please try again later.</p>';

export default class ErrorView extends AbstractView {

  get template() {
    return createErrorTemplate();
  }
}
