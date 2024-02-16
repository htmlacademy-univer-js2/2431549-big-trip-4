import { createElement } from '../render.js';

const editPointTemplate = `s<"'>`;

export default class EditPointView {
  getTemplate() {
    return editPointTemplate;
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
