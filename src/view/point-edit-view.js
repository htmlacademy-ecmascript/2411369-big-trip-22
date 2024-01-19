import dayjs from 'dayjs';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { destinations, offersByType } from '../mock/point';
import { POINT_TYPES } from '../const';

const DATE_FORMAT = 'DD/MM/YY HH:mm';

const createPointEditTemplate = (point) => {
  const { type, dateFrom, dateTo, basePrice, destination, offers } = point;

  const pointTypeOffer = offersByType.find((offer) => offer.type === type);
  const pointDestination = destinations.find((target) => destination === target.id);

  let offersTemplate = '';
  if (pointTypeOffer) {
    offersTemplate = pointTypeOffer.offers
      .map((offer) => `<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.title}-${offer.id}" type="checkbox" name="${offer.title}" data-offer-id="${offer.id}" ${offers.includes(offer.id) ? 'checked' : ''}>
            <label class="event__offer-label" for="event-offer-${offer.title}-${offer.id}">
              <span class="event__offer-title">${offer.title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${offer.price}</span>
            </label>
          </div>`).join('');
  }

  let picturesTemplate = '';
  if (pointDestination.pictures) {
    picturesTemplate = pointDestination.pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('');
  }

  const destinationNameTemplate = destinations.map((element) => `<option value="${element.name}"></option>`).join('');

  const eventTypeTemplate = POINT_TYPES.map((group) =>
    `<div class="event__type-item">
      <input id="event-type-${group}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${group}" ${group === type ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${group}" for="event-type-${group}-1">${group.charAt(0).toUpperCase() + group.slice(1)}</label>
    </div>`
  ).join('');

  const parsDateTo = dayjs(dateTo);
  const parsDateFrom = dayjs(dateFrom);

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>

              ${eventTypeTemplate}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${pointDestination.name}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${destinationNameTemplate};
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${parsDateFrom.format(DATE_FORMAT)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${parsDateTo.format(DATE_FORMAT)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${offersTemplate}
          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${pointDestination.description}</p>
          <div class="event__photos-container">
            <div class="event__photos-tape">
            ${picturesTemplate}
            </div>
          </div>
        </section>
      </section>
    </form>
  </li>`;
};

export default class PointEditView extends AbstractStatefulView {
  #handleFormSubmit = null;
  #handleRollupButtonClick = null;
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor({ point, onFormSubmit, onRollupButtonClick }) {
    super();
    this._setState(PointEditView.parsePointToState(point));
    this.#handleFormSubmit = onFormSubmit;
    this.#handleRollupButtonClick = onRollupButtonClick;

    this._restoreHandlers();
  }

  get template() {
    return createPointEditTemplate(this._state);
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  static parsePointToState = (point) => ({ ...point });

  static parseStateToPoint = (state) => ({ ...state });

  reset(point) {
    this.updateElement(PointEditView.parsePointToState(point));
  }

  _restoreHandlers() {
    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#rollupButtonClickHandler);
    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#eventTypeToggleHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#eventDestinationToggleHandler);
    this.element.querySelector('.event__input--price')
      .addEventListener('input', this.#priceInputHandler);
    this.element.querySelectorAll('.event__offer-selector input')
      .forEach((offer) => offer.addEventListener('change', this.#offersChangeHandler));

    this.#setDatepicker();
  }

  #eventTypeToggleHandler = (evt) => {
    evt.preventDefault();

    this.updateElement({
      type: evt.target.value,
      offers: []
    });
  };

  #eventDestinationToggleHandler = (evt) => {
    evt.preventDefault();

    const selectedDestination = destinations.find((destination) => evt.target.value === destination.name);

    this.updateElement({
      destination: selectedDestination.id
    });
  };

  #priceInputHandler = (evt) => {
    evt.preventDefault();

    this._setState({
      basePrice: evt.target.value
    });
  };

  // #offersChangeHandler = (evt) => {
  //   evt.preventDefault();
  //   evt.target.toggleAttribute('checked');

  //   let selectedOffers = this._state.offers;

  //   if (evt.target.hasAttribute('checked')) {
  //     selectedOffers.push(+(evt.target.dataset.offerId));
  //   } else {
  //     selectedOffers = selectedOffers.filter((id) => id !== +(evt.target.dataset.offerId));
  //   }

  //   this._setState({
  //     offers: selectedOffers
  //   });
  // };

  #offersChangeHandler = (evt) => {
    evt.preventDefault();
    evt.target.toggleAttribute('checked');

    let selectedOffers = this._state.offers;

    if (evt.target.hasAttribute('checked')) {
      selectedOffers.push(+(evt.target.dataset.offerId));
    } else {
      selectedOffers = selectedOffers.filter((id) => id !== +(evt.target.dataset.offerId));
    }

    this._setState({
      offers: selectedOffers
    });
  };

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate
    });
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();

    this.#handleFormSubmit(PointEditView.parseStateToPoint(this._state));
  };

  #rollupButtonClickHandler = (evt) => {
    evt.preventDefault();

    this.#handleRollupButtonClick();
  };

  #setDatepicker() {
    const [dateFromElement, dateToElement] = this.element.querySelectorAll('.event__input--time');

    const commonConfig = {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      locale: {firstDayOfWeek: 1},
      'time_24hr': true
    };

    this.#datepickerFrom = flatpickr(
      dateFromElement,
      {
        ...commonConfig,
        defaultDate: this._state.dateFrom,
        onClose: this.#dateFromChangeHandler,
        maxDate: this._state.dateTo
      }
    );

    this.#datepickerTo = flatpickr(
      dateToElement,
      {
        ...commonConfig,
        defaultDate: this._state.dateTo,
        onClose: this.#dateToChangeHandler,
        minDate: this._state.dateFrom
      }
    );
  }
}
