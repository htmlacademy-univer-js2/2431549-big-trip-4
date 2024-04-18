import { render } from '../framework/render.js';
import EventListView from '../view/event-list-view.js';
import SortView from '../view/sort-view.js';
import NoPointsView from '../view/no-points-view.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils.js';

export default class BoardPresenter {
  #container = null;
  #pointsModel = null;
  #eventListComponent = new EventListView();
  #sortComponent = new SortView();
  #noPointsComponent = new NoPointsView();

  #boardPoints = [];
  #pointPresenters = new Map();

  constructor({ container, pointsModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.points];

    this.#renderBoard();
  }

  #handleTaskChange = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({ pointListContainer: this.#eventListComponent.element });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
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

  #clearTaskList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }
}
