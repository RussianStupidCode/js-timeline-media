import TimeLine from './timeline/timeline';

const root = document.querySelector('.root');

const timeLine = new TimeLine();

timeLine.bindToDOM(root);
