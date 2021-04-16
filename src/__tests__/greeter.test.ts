import { Greeter } from '../index';

test('my greeter', () => {
  expect(Greeter('Crl')).toBe('Hello Carl');
});
