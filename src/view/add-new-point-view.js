import { createElement } from '../render.js';

const newPointTemplate = ``;

export default class AddNewPointView {
  getTemplate() {
    return newPointTemplate;
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
