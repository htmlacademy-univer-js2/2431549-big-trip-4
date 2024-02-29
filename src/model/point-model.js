import { generatePoint } from '../mock/point.js';


export default class PointModel {
  point = generatePoint();

  getPoints() {
    return this.point;
  }
}
