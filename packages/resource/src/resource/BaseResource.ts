import { IResource, REPOSITORY } from './IResource';
import { IRepository } from '../repository/IRepository';

export abstract class BaseResource implements IResource {
  [REPOSITORY]: IRepository;

  constructor(repository: IRepository) {
    this[REPOSITORY] = repository;
  }
}
