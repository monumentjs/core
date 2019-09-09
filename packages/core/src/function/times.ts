import { InvalidArgumentException } from '@monument/exceptions';

export function times(count: number, fn: (index: number) => void) {
  if (count < 0) {
    throw new InvalidArgumentException('Count cannot be negative.');
  }

  for (let index = 0; index < count; index++) {
    fn(index);
  }
}
