import {Type} from '@monument/core/main/Type';
import {Class} from '@monument/reflection/main/Class';
import {TestRunner} from '../../TestRunner';
import {JestTestDriver} from '../../JestTestDriver';
import {TestConfiguration} from '../base/TestConfiguration';


export function Test(displayName?: string): ClassDecorator {
    return function (target: Function) {
        let type: Type = target as Type;
        let klass: Class = Class.of(type);

        if (displayName == null) {
            displayName = 'class ' + klass.name.replace(/test|spec$/i, '');
        }

        let test = new TestConfiguration(displayName);

        let runner = new TestRunner(new JestTestDriver());

        runner.run(test);
    };
}
