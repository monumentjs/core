import { Password } from './Password';

export class EncodedPassword extends Password {
  constructor(password?: string) {
    super(password && decodeURIComponent(password));
  }
}
