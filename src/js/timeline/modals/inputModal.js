export default class InputModal {
  constructor(title, textContent, labelText) {
    this.el = document.createElement('div');
    this.el.classList.add(
      'timeline-modal',
      'border-2',
      'border',
      'border-warning'
    );

    this.el.innerHTML = `
      <div class="my-2">${title}</div>
      <div class="my-2">${textContent}</div>
      <label class="my-2">${labelText}</label>
      <div class="input-group">
        <input type="text" class="form-control">
        <div class="input-group-append">
          <button class="btn btn-warning cancel" type="button">Отмена</button>
          <button class="btn btn-success ok" type="button">Ok</button>
        </div>
      </div>
      <span class="badge bg-warning error d-none"></span>
    `;

    this.okButton = this.el.querySelector('button.ok');
    this.cancelButton = this.el.querySelector('button.cancel');
    this.error = this.el.querySelector('.error');
    this.input = this.el.querySelector('input');
  }

  show() {
    this.el.classList.remove('d-none');
    this.input.value = '';
  }

  hide() {
    this.el.classList.add('d-none');
  }

  get value() {
    return this.input.value.trim();
  }

  showError(text) {
    this.error.textContent = text;
    this.error.classList.remove('d-none');
  }

  hideError() {
    this.error.classList.add('d-none');
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
