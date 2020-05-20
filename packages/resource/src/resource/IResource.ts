import { IRepository } from '../repository/IRepository';

export const REPOSITORY = Symbol();

export interface IResource {
  [REPOSITORY]?: IRepository;
}
