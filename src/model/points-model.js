import { createMockPoints } from '../mock/point.js';

const POINTS_COUNT = 5;

export default class PointsModel {
  #points = createMockPoints(POINTS_COUNT);

  get points() {
    return this.#points;
  }
}
