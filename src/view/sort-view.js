import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const.js';

const sortTemplate = () => `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
<div class="trip-sort__item  trip-sort__item--${SortType.DAY}" data-sort-type="${SortType.DAY}">
  <input id="sort-${SortType.DAY}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortType.DAY}">
  <label class="trip-sort__btn" for="sort-${SortType.DAY}">Day</label>
</div>

<div class="trip-sort__item  trip-sort__item--${SortType.EVENT}" data-sort-type="${SortType.EVENT}">
  <input id="sort-${SortType.EVENT}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortType.EVENT}" disabled>
  <label class="trip-sort__btn" for="sort-${SortType.EVENT}">Event</label>
</div>

<div class="trip-sort__item  trip-sort__item--${SortType.TIME}" data-sort-type="${SortType.TIME}">
  <input id="sort-${SortType.TIME}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortType.TIME}">
  <label class="trip-sort__btn" for="sort-${SortType.TIME}">Time</label>
</div>

<div class="trip-sort__item  trip-sort__item--${SortType.PRICE}" data-sort-type="${SortType.PRICE}">
  <input id="sort-${SortType.PRICE}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortType.PRICE}" checked>
  <label class="trip-sort__btn" for="sort-${SortType.PRICE}">Price</label>
</div>

<div class="trip-sort__item  trip-sort__item--${SortType.OFFERS}" data-sort-type="${SortType.OFFERS}">
  <input id="sort-${SortType.OFFERS}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortType.OFFERS}" disabled>
  <label class="trip-sort__btn" for="sort-${SortType.OFFERS}">Offers</label>
</div>
</form>`;

export default class SortView extends AbstractView {
  get template() {
    return sortTemplate;
  }
}
