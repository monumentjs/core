import { UserName } from './UserName';

export class EncodedUserName extends UserName {
  constructor(username?: string) {
    super(username && decodeURIComponent(username));
  }
}
