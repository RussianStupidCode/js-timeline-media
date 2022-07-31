export default class FactTextContent {
  constructor(text) {
    this.el = document.createElement('div');
    this.el.classList.add('fact-content');

    this.el.textContent = text;
  }

  bindToDOM(parentElement) {
    parentElement.insertAdjacentElement('beforeEnd', this.el);
  }
}
