import { RenderPosition, render } from './framework/render.js';
import FilterView from './view/filter-view.js';
import TripInfoView from './view/trip-info-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import { generateFilter } from './mock/filter.js';
import { FilterType } from './const.js';

const siteHeaderElement = document.querySelector('.trip-main');
const siteFilterElement = document.querySelector('.trip-controls__filters');
const siteContentElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel();

const filterModel = new FilterModel();
const filters = generateFilter(pointsModel.points);

render(new FilterView({
  filters,
  currentFilterType: 'all',
  onFilterTypeChange: () => { }
}), siteFilterElement);

const boardPresenter = new BoardPresenter(
  {
    container: siteContentElement,
    pointsModel
  });


render(new TripInfoView(), siteHeaderElement, RenderPosition.AFTERBEGIN);

boardPresenter.init();
