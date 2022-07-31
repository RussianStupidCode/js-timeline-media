import { dateFormat } from '../../utils';

export default class FactDate {
  constructor(momentDate) {
    this.el = document.createElement('div');
    this.el.classList.add(
      'd-flex',
      'flex-row-reverse',
      'justify-content-start',
      'align-items-center'
    );

    this.el.innerHTML = `
      <span class="fact-date">${dateFormat(momentDate)}</span>
    `;
  }

  bindToDOM(parentElement) {
    parentElement.insertAdjacentElement('beforeEnd', this.el);
  }
}
