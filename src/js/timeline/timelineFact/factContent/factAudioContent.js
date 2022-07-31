export default class FactAudioContent {
  constructor(src) {
    this.el = document.createElement('div');
    this.el.classList.add('fact-content');

    this.el.innerHTML = `<audio controls src=${src}></audio>`;

    this.audio = this.el.querySelector('audio');
  }

  bindToDOM(parentElement) {
    parentElement.insertAdjacentElement('beforeEnd', this.el);
  }
}
