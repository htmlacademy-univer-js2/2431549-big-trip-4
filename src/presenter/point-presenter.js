import { render, replace } from '../framework/render.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';

export default class PointPresenter {
  #pointListContainer = null;

  #editPointComponent = null;
  #pointComponent = null;

  #point = null;

  constructor({ pointListContainer }) {
    this.#pointListContainer = pointListContainer;
  }

  init(point) {
    this.#point = point;

    this.#pointComponent = new PointView({
      point: this.#point,
      onEditClick: this.#handleEditClick
    });

    this.#editPointComponent = new EditPointView({
      point: this.#point,
      onFormSubmit: this.#handleFormSubmit
    });

    render(this.#pointComponent, this.#pointListContainer);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #replacePointToForm() {
    replace(this.#editPointComponent, this.#pointComponent);
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#editPointComponent);
  }

  #handleFormSubmit = () => {
    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleEditClick = () => {
    this.#replacePointToForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };
}
