export default class FactBlock {
  constructor(markElement, factElement) {
    this.el = document.createElement('div');
    this.el.classList.add('fact-block');

    this.markElement = markElement;
    this.factElement = factElement;

    this.markElement.bindToDOM(this.el);
    this.factElement.bindToDOM(this.el);
  }

  bindToDOM(parentElement) {
    parentElement.insertAdjacentElement('beforeEnd', this.el);
  }
}
