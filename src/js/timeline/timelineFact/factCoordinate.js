import LOCATION_IMG from '../../../img/location.png';

export default class FactCoordinate {
  constructor(coordinate) {
    this.el = document.createElement('div');
    this.el.classList.add(
      'd-flex',
      'flex-row',
      'justify-content-start',
      'align-items-center',
      'w-100'
    );

    const coordinateString = !coordinate
      ? 'unknown'
      : `[${coordinate[0]}, ${coordinate[1]}]`;

    this.el.innerHTML = `
      <span class="fact-coordinate">${coordinateString}</span>
      <div class="location-img">
        <img src="${LOCATION_IMG}">
      </div>
    `;
  }

  bindToDOM(parentElement) {
    parentElement.insertAdjacentElement('beforeEnd', this.el);
  }
}
