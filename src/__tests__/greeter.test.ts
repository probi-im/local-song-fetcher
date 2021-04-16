import { Greeter } from '../index';

test('my greeter', () => {
  expect(Greeter('Carl')).toBe('Hello Carl');
});
