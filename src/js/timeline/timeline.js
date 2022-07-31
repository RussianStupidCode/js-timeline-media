import moment from 'moment';
import { coordinateParse } from '../utils';
import INPUT_BUFFER_TYPE from './input-buffer-type';
import InputBlock from './inputBlock';
import InputModal from './modals/inputModal';
import ModalsList from './modals/modalsList';
import SimpleModal from './modals/simpleModal';
import Fact from './timelineFact/fact';
import FactBlock from './timelineFact/factBlock';
import FactContentFactory from './timelineFact/factContent/factContentFactory';
import MARK_POSITIONS from './timelineMarks/mark-position';
import MarksFactory from './timelineMarks/marksFactory';

export default class TimeLine {
  constructor() {
    this.el = document.createElement('div');
    this.el.classList.add('time-line');

    this.nonactiveFilter = document.createElement('div');
    this.nonactiveFilter.classList.add('nonactive-filter');

    this.el.innerHTML = `
      <div class="time-line-content">
      </div>
      <div class="space-block"></div>
    `;

    this.lastInput = {
      type: INPUT_BUFFER_TYPE.none,
      content: '',
    };

    this.contentBlock = this.el.querySelector('.time-line-content');

    this.inputBlock = new InputBlock();
    this.inputBlock.bindToDOM(this.el);

    this.modalsList = new ModalsList();

    this.factList = [];

    const inputGEOModal = new InputModal(
      'Невозможно определить позицию',
      'Возможно эта функция не доступна в вашем браузере либо возникли проблемы при ее получении. Введите данные',
      'Ширина и долгота через запятую [51.50851, -0.12572]'
    );
    this.modalsList.addModal('geo', inputGEOModal);

    const inputAudioModal = new SimpleModal(
      'Началась запись аудио',
      'Нажмите ok, чтобы сохранить запись'
    );
    this.modalsList.addModal('audio', inputAudioModal);

    const errorModal = new SimpleModal('Произошла ошибка');
    this.modalsList.addModal('error', errorModal);

    this.modalsList.hide();
    this.modalsList.bindToDOM(this.el);

    this.setListeners();
  }

  addFact(coordiante, input) {
    const markPosition = !this.factList.length
      ? MARK_POSITIONS.start
      : MARK_POSITIONS.inter;

    const mark = MarksFactory.createMark(markPosition);

    const contentElement = FactContentFactory.createFactContent(input);

    const fact = new Fact(contentElement, moment(), coordiante);
    const factBlock = new FactBlock(mark, fact);
    this.factList.push(factBlock);

    factBlock.bindToDOM(this.contentBlock);

    this.contentBlock.scrollTop += this.contentBlock.scrollHeight;
  }

  setListeners() {
    const erroModal = this.modalsList.getModal('error');
    erroModal.addOKListener(() => {
      this.unblocking();
      this.modalsList.hide();
    });

    erroModal.addCancelListener(() => {
      this.unblocking();
      this.modalsList.hide();
    });

    this.setGeoModalListeners();
    this.setTextInputListeners();
    this.setAudioInputListeners();
  }

  setGeoModalListeners() {
    const geoModal = this.modalsList.getModal('geo');
    geoModal.addOKListener((event) => {
      event.preventDefault();

      const { value } = geoModal;

      if (!value.length) {
        geoModal.showError('координаты не могут быть пустыми');
        return;
      }

      try {
        const coordinate = coordinateParse(value);
        this.addFact(coordinate, this.lastInput);
        this.modalsList.hide();
        this.inputBlock.value = '';
        this.unblocking();
      } catch (error) {
        geoModal.showError('некорректные координаты');
      }
    });

    geoModal.addCancelListener((event) => {
      event.preventDefault();
      this.modalsList.hide();
      this.unblocking();
    });
  }

  setTextInputListeners() {
    this.el.addEventListener('keypress', (event) => {
      if (event.key !== 'Enter') {
        return;
      }

      const { value } = this.inputBlock;

      if (!value.length) {
        return;
      }

      if (!navigator.geolocation) {
        this.blocking();
        this.modalsList.selectModal('geo');
      }

      this.lastInput = {
        type: INPUT_BUFFER_TYPE.text,
        content: value,
      };

      this.getCurrentPosition();
    });
  }

  getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { coords } = position;

        this.addFact([coords.latitude, coords.longitude], this.lastInput);
        this.inputBlock.value = '';
      },
      () => {
        this.blocking();
        this.modalsList.selectModal('geo');
      }
    );
  }

  setAudioInputListeners() {
    const audioModal = this.modalsList.getModal('audio');

    this.inputBlock.addButtonClickListener((event) => {
      event.preventDefault();

      if (!navigator.mediaDevices || !this.inputBlock.recorder) {
        this.blocking();
        const erroModal = this.modalsList.getModal('error');
        erroModal.text = 'Нет доступа к микрофону. Запись аудио невозможна';

        this.modalsList.selectModal('error');
        return;
      }

      this.blocking();
      this.modalsList.selectModal('audio');

      this.inputBlock.startAudioRecord();
    });

    let isCancelingInput = false;

    this.inputBlock.addAudioRecordCallback('stop', () => {
      if (!this.inputBlock.audioChunks.length || isCancelingInput) {
        return;
      }

      const src = URL.createObjectURL(new Blob(this.inputBlock.audioChunks));
      this.lastInput = {
        type: INPUT_BUFFER_TYPE.audio,
        content: src,
      };

      this.getCurrentPosition();
    });

    audioModal.addOKListener((event) => {
      event.preventDefault();

      isCancelingInput = false;

      this.inputBlock.stopAudioRecord();
      this.unblocking();
      this.modalsList.hide();
    });

    audioModal.addCancelListener((event) => {
      event.preventDefault();

      isCancelingInput = true;

      this.inputBlock.stopAudioRecord();
      this.unblocking();
      this.modalsList.hide();
    });
  }

  blocking() {
    this.nonactiveFilter.classList.remove('d-none');
  }

  unblocking() {
    this.nonactiveFilter.classList.add('d-none');
  }

  bindToDOM(parentElement) {
    parentElement.insertAdjacentElement('beforeEnd', this.el);
    parentElement.insertAdjacentElement('beforeEnd', this.nonactiveFilter);
    this.unblocking();
  }
}
