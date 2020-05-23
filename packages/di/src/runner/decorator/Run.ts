import { Type } from '@monument/core';
import { ApplicationInterface } from '../../application/ApplicationInterface';
import { DefaultContext } from '../../context/DefaultContext';

export function Run(): ClassDecorator {
  return target => {
    const type = target as unknown as Type<ApplicationInterface>;
    const context = DefaultContext.create(type);

    context.get(type)!.subscribe(application => {
      console.log('Application:', application);
      application.main();
    }, error => {
      console.error(error);
    }, () => {
      console.log('COMPLETE');
    });
    context.start();
  };
}
