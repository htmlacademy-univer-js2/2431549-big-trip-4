import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const.js';

const sortTemplate = (currentSortType) => `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
<div class="trip-sort__item  trip-sort__item--${SortType.DAY}">
  <input id="sort-${SortType.DAY}" data-sort-type="day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortType.DAY}" ${currentSortType === SortType.DAY ? 'checked' : ''} >
  <label class="trip-sort__btn" for="sort-${SortType.DAY}">Day</label>
</div>

<div class="trip-sort__item  trip-sort__item--${SortType.EVENT}" >
  <input id="sort-${SortType.EVENT}" data-sort-type="event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortType.EVENT}" disabled ${currentSortType === SortType.EVENT ? 'checked' : ''}>
  <label class="trip-sort__btn" for="sort-${SortType.EVENT}">Event</label>
</div>

<div class="trip-sort__item  trip-sort__item--${SortType.TIME}">
  <input id="sort-${SortType.TIME}"  data-sort-type="time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortType.TIME}"  ${currentSortType === SortType.TIME ? 'checked' : ''}>
  <label class="trip-sort__btn" for="sort-${SortType.TIME}">Time</label>
</div>

<div class="trip-sort__item  trip-sort__item--${SortType.PRICE}">
  <input id="sort-${SortType.PRICE}" data-sort-type="price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortType.PRICE}" ${currentSortType === SortType.PRICE ? 'checked' : ''}>
  <label class="trip-sort__btn" for="sort-${SortType.PRICE}">Price</label>
</div>

<div class="trip-sort__item  trip-sort__item--${SortType.OFFERS}">
  <input id="sort-${SortType.OFFERS}"  data-sort-type="offers" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortType.OFFERS}" disabled ${currentSortType === SortType.OFFERS ? 'checked' : ''}>
  <label class="trip-sort__btn" for="sort-${SortType.OFFERS}">Offers</label>
</div>
</form>`;

export default class SortView extends AbstractView {
  #handleSortTypeChange = null;
  #currentSortType = null;

  constructor({ currentSortType, onSortTypeChange }) {
    super();
    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;
    this.element.addEventListener('click', this.#sortTypeChangeHandler, { passive: true });
  }

  get template() {
    return sortTemplate(this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
