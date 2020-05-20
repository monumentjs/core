import { ResourceConfiguration } from './ResourceConfiguration';

export function Resource(configuration: ResourceConfiguration): ClassDecorator {
  return target => {
    Reflect.defineMetadata(Resource, configuration, target);
  };
}
