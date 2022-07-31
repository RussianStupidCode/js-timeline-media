export default class ModalsList {
  constructor() {
    this.el = document.createElement('div');
    this.el.classList.add('modals-list');

    this.modals = {};
  }

  addModal(name, modal) {
    this.modals[name] = modal;

    modal.bindToDOM(this.el);
  }

  selectModal(name) {
    this.show();
    Object.entries(this.modals).forEach(([key, value]) => {
      if (key === name) {
        value.show();
        return;
      }
      value.hide();
    });
  }

  show() {
    this.el.classList.remove('d-none');
  }

  hide() {
    this.el.classList.add('d-none');
  }

  getModal(name) {
    return this.modals[name];
  }

  bindToDOM(parentElement) {
    parentElement.insertAdjacentElement('beforeEnd', this.el);
  }
}
