import dayjs from 'dayjs';
import AbstractView from '../framework/view/abstract-view';

const DATE_FORMAT = 'DD MMM';

const createTripDatesTemplate = (dateFrom) => {
  const startDate = dayjs(dateFrom[0]);
  const endDate = dayjs(dateFrom[dateFrom.length - 1]);

  let startDateFormat = DATE_FORMAT;

  if (startDate.isSame(endDate, 'month')) {
    startDateFormat = 'DD';
  }

  return `<p class="trip-info__dates">${startDate.format(startDateFormat)}&nbsp;—&nbsp;${endDate.format(DATE_FORMAT)}</p>`;
};

export default class TripDatesView extends AbstractView {
  #dateFrom = null;

  constructor(dateFrom) {
    super();

    this.#dateFrom = dateFrom;
  }

  get template() {
    return createTripDatesTemplate(this.#dateFrom);
  }
}
