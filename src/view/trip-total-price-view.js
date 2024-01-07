import AbstractView from '../framework/view/abstract-view';

const createTripTotalPriceTemplate = (price) =>
  `<p class="trip-info__cost">
    Total: €&nbsp;<span class="trip-info__cost-value">${price}</span>
  </p>`;

export default class TripTotalPriceView extends AbstractView {
  #price = null;

  constructor(price) {
    super();

    this.#price = price;
  }

  get template() {
    return createTripTotalPriceTemplate(this.#price);
  }
}
