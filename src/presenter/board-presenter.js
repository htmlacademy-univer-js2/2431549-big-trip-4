import { render, RenderPosition, replace } from '../framework/render.js';
import EventListView from '../view/event-list-view.js';
import SortView from '../view/sort-view.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import NoPointsView from '../view/no-points-view.js';

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
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointView({
      point, onEditClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const editPointComponent = new EditPointView({
      point,
      onFormSubmit: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToForm() {
      replace(editPointComponent, pointComponent);
    }

    function replaceFormToPoint() {
      replace(pointComponent, editPointComponent);
    }

    render(pointComponent, this.#eventListComponent.element);
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
