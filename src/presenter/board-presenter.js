import { render, RenderPosition } from '../framework/render.js';
import EventListView from '../view/event-list-view.js';
import SortView from '../view/sort-view.js';
import NoPointsView from '../view/no-points-view.js';
import PointPresenter from './point-presenter.js';
import { sortDay, sortPrice, sortTime } from '../utils.js';
import { SortType } from '../const.js';

export default class BoardPresenter {
  #container = null;
  #pointsModel = null;
  #eventListComponent = new EventListView();
  #sortComponent = null;
  #noPointsComponent = new NoPointsView();

  #pointPresenters = new Map();

  #currentSortType = SortType.DAY;


  constructor({ container, pointsModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.DAY:
        return [...this.#pointsModel.points].sort(sortDay);
      case SortType.PRICE:
        return [...this.#pointsModel.points].sort(sortPrice);
      case SortType.TIME:
        return [...this.#pointsModel.points].sort(sortTime);
    }
    return this.#pointsModel.points;
  }

  init() {
    this.#renderBoard();
  }

  #handleViewAction = (actionType, updateType, update) => {
    console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
  };

  #handleModelEvent = (updateType, data) => {
    console.log(updateType, data);
  };

  /*  #handlePointChange = (updatedPoint) => {
     this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
   }; */

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#eventListComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;

    this.#clearPointList();
    this.#renderPointList(this.points);
  };


  #renderSort() {
    this.#sortComponent = new SortView({ onSortTypeChange: this.#handleSortTypeChange });
    render(this.#sortComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  #renderNoPoints() {
    render(this.#noPointsComponent, this.#eventListComponent);
  }

  #renderPointList(points) {
    render(this.#eventListComponent, this.#container);
    points.forEach((point) => this.#renderPoint(point));
  }

  #renderBoard() {
    this.#renderSort();

    if (this.#pointsModel.points.length === 0) {
      this.#renderNoPoints();
    }
    this.#renderPointList(this.points);
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }
}
