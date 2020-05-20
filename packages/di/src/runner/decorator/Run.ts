import { Type } from '@monument/core';
import { ApplicationInterface } from '../../application/ApplicationInterface';
import { ApplicationContextSchema } from '../../schema/ContextSchema';
import { DefaultContext } from '../../context/DefaultContext';

export function Run(): ClassDecorator {
  return target => {
    const type = target as unknown as Type<ApplicationInterface>;
    const schema = new ApplicationContextSchema(type);

    console.log(schema);

    const context = DefaultContext.create(schema);

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
