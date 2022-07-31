import Mark from './mark';
import MARK_POSITIONS from './mark-position';

export default class MarksFactory {
  static createMark(position = MARK_POSITIONS.start) {
    if (position === MARK_POSITIONS.start) {
      return new Mark('mark-start-line');
    }

    if (position === MARK_POSITIONS.inter) {
      return new Mark('mark-intermediate-line');
    }

    if (position === MARK_POSITIONS.end) {
      return new Mark('mark-end-line');
    }

    throw new Error('uncorrect position mark');
  }
}
