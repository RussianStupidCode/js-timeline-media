export default class Mark {
  constructor(markCSSClass) {
    this.el = document.createElement('div');
    this.el.classList.add('mark-block');

    this.el.innerHTML = `<div class="${markCSSClass}"></div><div class="timeline-mark"></div>`;
  }

  bindToDOM(parentElement) {
    parentElement.insertAdjacentElement('beforeEnd', this.el);
  }
}
