import { render } from './render.js';
import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';

/* const siteHeader = document.querySelector('.page-header'); */
const siteFilterElement = document.querySelector('.trip-controls__filters');
const siteContentElement = document.querySelector('.trip-events');

render(new FilterView(), siteFilterElement);
render(new SortView(), siteContentElement);

