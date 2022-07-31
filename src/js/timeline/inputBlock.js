export default class InputBlock {
  constructor() {
    this.el = document.createElement('div');
    this.el.classList.add('input-block', 'd-flex', 'flex-row');

    this.el.innerHTML = `
      <input type="text" class="form-control shadow-none">
      <div class="input-group-append d-flex">
        <button class="btn btn-primary audio">🎤</button>
      </div>
    `;

    this.input = this.el.querySelector('input');

    this.stream = navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });

    this.audioChunks = [];

    this.recorder = null;

    this.audioCallback = {
      start: () => {},
      stop: () => {},
      dataavailable: () => {},
    };

    this.stream.then((data) => {
      this.recorder = new MediaRecorder(data);

      this.recorder.addEventListener('start', () => {
        this.audioChunks.splice(0, this.audioChunks.length);
      });

      this.recorder.addEventListener('dataavailable', (event) => {
        this.audioChunks.push(event.data);
      });

      this.recorder.addEventListener('stop', (event) => {
        this.audioCallback.stop(event);
      });
    });
  }

  addButtonClickListener(callback) {
    const button = this.el.querySelector('button');

    button.addEventListener('click', callback);
  }

  addAudioRecordCallback(action, callback) {
    this.audioCallback[action] = callback;
  }

  startAudioRecord() {
    if (!this.recorder || this.recorder.state === 'recodring') {
      return;
    }

    this.recorder.start();
  }

  stopAudioRecord() {
    if (!this.recorder || this.recorder.state !== 'recording') {
      return;
    }
    this.recorder.stop();
  }

  get value() {
    return this.input.value;
  }

  set value(value) {
    this.input.value = value;
  }

  bindToDOM(parentElement) {
    parentElement.insertAdjacentElement('beforeEnd', this.el);
  }
}
