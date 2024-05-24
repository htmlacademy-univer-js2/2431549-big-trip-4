import AbstractView from '../framework/view/abstract-view.js';

const getOfferTemplate = () => '';

export default class OfferView extends AbstractView {
  #offer = null;

  constructor(offer) {
    super()
    this.#offer = offer;
  }

  getTemplate() {
    return getOfferTemplate();
  }
}
