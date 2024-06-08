import { RenderPosition, render } from './framework/render.js';
import TripInfoView from './view/trip-info-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsApiService from './points-api-service.js';
import OfferModel from './model/offer-model.js';
import DestinationModel from './model/destination-model.js';

const AUTHORIZATION = 'Basic hS2sfS44wcl1sa2j';
const END_POINT = 'https://21.objects.htmlacademy.pro/big-trip';

const siteHeaderElement = document.querySelector('.trip-main');
const siteFilterElement = document.querySelector('.trip-controls__filters');
const siteContentElement = document.querySelector('.trip-events');
const newEventButton = siteHeaderElement.querySelector('.trip-main__event-add-btn');
const pointsApiService = new PointsApiService(END_POINT, AUTHORIZATION);

const offerModel = new OfferModel(pointsApiService);
const destinationModel = new DestinationModel(pointsApiService);
const pointsModel = new PointsModel({
  pointsApiService: pointsApiService
});

const filterModel = new FilterModel();
const filterPresenter = new FilterPresenter({
  filterContainer: siteFilterElement,
  filterModel,
  pointsModel
});

const onAddFormClose = () => {
  newEventButton.disabled = false;
};

const boardPresenter = new BoardPresenter(
  {
    container: siteContentElement,
    pointsModel,
    offerModel,
    destinationModel,
    filterModel,
    onAddFormClose,
  });


const onNewEventButtonClick = () => {
  boardPresenter.createPoint();
  newEventButton.disabled = true;
};

newEventButton.addEventListener('click', onNewEventButtonClick);
render(new TripInfoView(), siteHeaderElement, RenderPosition.AFTERBEGIN);

destinationModel.init();
offerModel.init();
filterPresenter.init();
boardPresenter.init();
pointsModel.init();
