import FactCoordinate from './factCoordinate';
import FactDate from './factDate';

export default class Fact {
  constructor(contentElement, momentDate, coordinate) {
    this.el = document.createElement('div');
    this.el.classList.add('fact');

    this.contentElement = contentElement;
    this.dateElement = new FactDate(momentDate);
    this.coordinateElement = new FactCoordinate(coordinate);

    this.dateElement.bindToDOM(this.el);
    this.contentElement.bindToDOM(this.el);
    this.coordinateElement.bindToDOM(this.el);
  }

  bindToDOM(parentElement) {
    parentElement.insertAdjacentElement('beforeEnd', this.el);
  }
}
