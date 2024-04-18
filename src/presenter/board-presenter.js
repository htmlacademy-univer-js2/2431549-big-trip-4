import { render } from '../framework/render.js';
import EventListView from '../view/event-list-view.js';
import SortView from '../view/sort-view.js';
import NoPointsView from '../view/no-points-view.js';
import PointPresenter from './point-presenter.js';

export default class BoardPresenter {
  #container = null;
  #pointsModel = null;
  #eventListComponent = new EventListView();
  #sortComponent = new SortView();
  #noPointsComponent = new NoPointsView();

  #boardPoints = [];

  constructor({ container, pointsModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.points];

    this.#renderBoard();
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({ pointListContainer: this.#eventListComponent.element });
    pointPresenter.init(point);
  }

  #renderSort() {
    render(this.#sortComponent, this.#container);
  }

  #renderNoPoints() {
    render(this.#noPointsComponent, this.#eventListComponent);
  }

  #renderPointList() {
    render(this.#eventListComponent, this.#container);
  }

  #renderBoard() {
    this.#renderSort();
    this.#renderPointList();

    if (this.#boardPoints.length === 0) {
      this.#renderNoPoints();
    } else {
      this.#boardPoints.forEach((point) => this.#renderPoint(point));
    }
  }
}
