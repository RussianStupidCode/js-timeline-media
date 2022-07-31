import { coordinateParse } from '../utils';

const COORDINATE_PARSE_TEST_DATA = [
  {
    args: {
      coordinateString: '51.50851, -0.12572',
    },
    expected: [51.50851, -0.12572],
  },
  {
    args: {
      coordinateString: '[51.50851, -0.12572]',
    },
    expected: [51.50851, -0.12572],
  },
  {
    args: {
      coordinateString: '[51, -0.12]',
    },
    expected: [51, -0.12],
  },
  {
    args: {
      coordinateString: '[51.50851, -0,12572]',
    },
    expected: 'Error: uncorrect coordinate',
  },
];

const coordianteParseHandler = test.each(COORDINATE_PARSE_TEST_DATA);

coordianteParseHandler('coordinate parse test', ({ args, expected }) => {
  let actual = 'empty';

  try {
    actual = coordinateParse(args.coordinateString);
  } catch (err) {
    actual = String(err);
  }

  expect(actual).toEqual(expected);
});
