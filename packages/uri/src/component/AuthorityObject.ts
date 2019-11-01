import { ToJSON } from '@monument/core';
import { EquatableEquals, MultiValueEquals } from '@monument/comparison';
import { Literal, Printable, PrintGroup, PrintCondition, TextPrinter, TextPrinter } from '@monument/text';
import { HostObject } from './HostObject';
import { PortObject } from './PortObject';
import { UserName } from './UserName';
import { Password } from './Password';
import { Authority } from './Authority';

export class AuthorityObject implements Authority, ToJSON<string> {
  private printable: Printable;

  /**
   * Gets host component.
   */
  readonly host: HostObject = new HostObject();
  /**
   * Gets port component.
   */
  readonly port: PortObject = new PortObject();
  /**
   * Gets user name component.
   */
  readonly userName: UserName = new UserName();
  /**
   * Gets password component.
   */
  readonly password: Password = new Password();

  readonly value: string | undefined;
  readonly present: boolean;

  constructor(host: HostObject = new HostObject(), port: PortObject = new PortObject(), userName: UserName = new UserName(), password: Password = new Password()) {
    this.host = host;
    this.port = port;
    this.userName = userName;
    this.password = password;
    this.present = host.present;
    this.printable = new PrintCondition(
      () => host.present,
      new PrintGroup([
        new PrintCondition(
          () => userName.present,
          new PrintGroup([
            userName,
            new PrintCondition(
              () => password.present,
              new PrintGroup([
                new Literal(':'),
                password
              ])
            ),
            new Literal('@')
          ])
        ),
        host,
        new PrintCondition(
          () => port.present,
          new PrintGroup([
            new Literal(':'),
            port
          ])
        )
      ])
    );
  }

  equals(other: Authority): boolean {
    if (this === other) {
      return true;
    }

    return MultiValueEquals([
      [this.host, other.host, EquatableEquals],
      [this.port, other.port, EquatableEquals],
      [this.userName, other.userName, EquatableEquals],
      [this.password, other.password, EquatableEquals]
    ]);
  }

  toJSON(): string {
    return this.toString();
  }

  toString(): string {
    const output = new TextPrinter();

    this.print(output);

    return output.toString();
  }

  print(printer: TextPrinter): void {
    this.printable.print(printer);
  }
}
