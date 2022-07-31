import INPUT_BUFFER_TYPE from '../../input-buffer-type';
import FactAudioContent from './factAudioContent';
import FactTextContent from './factTextContent';

export default class FactContentFactory {
  static createFactContent(input) {
    if (input.type === INPUT_BUFFER_TYPE.text) {
      return new FactTextContent(input.content);
    }

    if (input.type === INPUT_BUFFER_TYPE.audio) {
      return new FactAudioContent(input.content);
    }

    throw new Error('undefined input type ');
  }
}
