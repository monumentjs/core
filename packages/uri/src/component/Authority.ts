import { Equatable } from '@monument/comparison';
import { ToJSON } from '@monument/core';
import { Component } from '../base/Component';
import { Host } from './Host';
import { PortObject } from './PortObject';
import { UserName } from './UserName';
import { Password } from './Password';

export interface Authority extends Component, Equatable<Authority>, ToJSON<string> {
  readonly host: Host;
  readonly port: PortObject;
  readonly userName: UserName;
  readonly password: Password;
}
