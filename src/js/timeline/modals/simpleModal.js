export default class SimpleModal {
  constructor(title, textContent) {
    this.el = document.createElement('div');
    this.el.classList.add(
      'timeline-modal',
      'border-2',
      'border',
      'border-warning'
    );

    this.el.innerHTML = `
      <div class="title my-2">${title}</div>
      <div class="text my-2">${textContent}</div>
      <div class="input-group">
        <div class="input-group-append">
          <button class="btn btn-warning cancel" type="button">Отмена</button>
          <button class="btn btn-success ok" type="button">Ok</button>
        </div>
      </div>
    `;

    this.titleElement = this.el.querySelector('div.title');
    this.textElement = this.el.querySelector('div.text');

    this.okButton = this.el.querySelector('button.ok');
    this.cancelButton = this.el.querySelector('button.cancel');
  }

  set title(title) {
    this.titleElement.textContent = title;
  }

  set text(text) {
    this.textElement.textContent = text;
  }

  show() {
    this.el.classList.remove('d-none');
  }

  hide() {
    this.el.classList.add('d-none');
  }

  addOKListener(callback) {
    this.okButton.addEventListener('click', callback);
  }

  addCancelListener(callback) {
    this.cancelButton.addEventListener('click', callback);
  }

  bindToDOM(parentElement) {
    parentElement.insertAdjacentElement('beforeEnd', this.el);
  }
}
