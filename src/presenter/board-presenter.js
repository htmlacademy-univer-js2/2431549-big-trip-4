import { render } from '../framework/render.js';
import EditPointView from '../view/edit-point-view.js';
import EventListView from '../view/event-list-view.js';
import SortView from '../view/sort-view.js';
import PointView from '../view/point-view.js';
import { generatePoint } from '../mock/point.js';

export default class BoardPresenter {
  #container = null;
  #pointsModel = null;
  eventListComponent = new EventListView();

  #boardPoints = [];

  constructor({ container, pointsModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.points];

    render(new SortView(), this.#container);
    render(this.eventListComponent, this.#container);

    render(new EditPointView(generatePoint()), this.eventListComponent.element);

    this.#boardPoints.forEach((point) => this.#renderPoint(point));
  }

  #renderPoint(point) {
    const newPoint = new PointView(point);
    render(newPoint, this.eventListComponent.element);
  }
}
