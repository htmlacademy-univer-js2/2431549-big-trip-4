import { RenderPosition, render } from './framework/render.js';
import TripInfoView from './view/trip-info-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';

const siteHeaderElement = document.querySelector('.trip-main');
const siteFilterElement = document.querySelector('.trip-controls__filters');
const siteContentElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel();

const filterModel = new FilterModel();
const filterPresenter = new FilterPresenter({
  filterContainer: siteFilterElement,
  filterModel,
  pointsModel
});

const boardPresenter = new BoardPresenter(
  {
    container: siteContentElement,
    pointsModel,
    filterModel,
  });


render(new TripInfoView(), siteHeaderElement, RenderPosition.AFTERBEGIN);

filterPresenter.init();
boardPresenter.init();
