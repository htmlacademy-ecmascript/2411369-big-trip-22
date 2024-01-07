import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const isEscapeKey = (evt) => evt.key === 'Escape';

const isPastEvent = (dateTo) => dayjs(dateTo).isSameOrBefore(dayjs());
const isPresentEvent = (dateFrom, dateTo) => dayjs(dateFrom).isSameOrBefore(dayjs()) && dayjs(dateTo).isSameOrAfter(dayjs());
const isFutureEvent = (dateFrom) => dayjs(dateFrom).isSameOrAfter(dayjs());

export { isEscapeKey, isPastEvent, isPresentEvent, isFutureEvent };
