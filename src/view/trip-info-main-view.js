import AbstractView from '../framework/view/abstract-view';

const createTripInfoMainTemplate = () => '<div class="trip-info__main"></div>';

export default class TripInfoMainView extends AbstractView {
  get template() {
    return createTripInfoMainTemplate();
  }
}
