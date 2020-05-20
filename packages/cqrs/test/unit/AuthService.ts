/* tslint:disable:no-console */
import { Command, Query } from '../..';
import { Observable } from 'rxjs';

interface User {
  name: string;
}

export class Login implements Command {
  constructor(
    readonly email: string,
    readonly password: string
  ) {
  }
}

export class GetCurrentUser implements Query<User | undefined> {
}

export class AuthService {
  user$: Observable<User>;

  async login(email: string, password: string): Promise<void> {

  }
}

export class UserService {
  getUser(id: string): Observable<User> {
    return User.get({
      params: { id }
    });
  }
}
