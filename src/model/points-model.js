import { nanoid } from 'nanoid';
import Observable from '../framework/observable.js';
import { createMockPoints } from '../mock/point.js';

const POINTS_COUNT = 5;

export default class PointsModel extends Observable {
  #points = createMockPoints(POINTS_COUNT);

  get points() {
    return this.#points;
  }

  updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (!~index) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addPoint(updatedType, update) {
    update.id = nanoid();
    this.#points = [
      update,
      ...this.#points
    ];

    this._notify(updatedType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (!~index) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1)
    ];

    this._notify(updateType);
  }
}
