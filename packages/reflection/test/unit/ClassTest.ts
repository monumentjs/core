import {Assert} from '@monument/test-drive/main/modules/assert/Assert';
import {Test} from '@monument/test-drive/main/decorators/Test';
import {Class} from '../../main/Class';
import {Field} from '../../main/Field';
import {Example} from './support/decorators/Example';
import {Employee} from './support/Employee';
import {Department} from './support/Department';


export class ClassTest {
    @Test
    public 'class info'(assert: Assert) {
        const klass: Class<Employee> = Class.of(Employee);

        assert.equals(klass.name, Employee.name);
        assert.equals(klass.type, Employee);
        assert.equals(klass.prototype, Employee.prototype);
        assert.equals(klass.constructorParameters.length, 3);
    }


    @Test
    public 'declared decorators info'(assert: Assert) {
        const klass: Class<Employee> = Class.of(Employee);

        assert.equals(klass.declaredDecorators.length, 1);
        assert.true(klass.declaredDecorators.contains(Example));
        assert.true(klass.isDecoratedWith(Example));
    }


    @Test
    public 'all decorators info'(assert: Assert) {
        const klass: Class<Employee> = Class.of(Employee);

        assert.equals(klass.decorators.length, 1);
        assert.true(klass.decorators.contains(Example));
    }


    @Test
    public 'declared fields info'(assert: Assert) {
        const klass: Class<Employee> = Class.of(Employee);

        assert.equals(klass.declaredFields.length, 3);
        assert.equals(klass.declaredFieldKeys.length, 3);
        assert.true(klass.declaredFieldKeys.contains('name'));
        assert.true(klass.declaredFieldKeys.contains('salary'));
        assert.true(klass.declaredFieldKeys.contains('department'));
        assert.true(klass.hasDeclaredField('name'));
        assert.true(klass.hasDeclaredField('salary'));
        assert.true(klass.hasDeclaredField('department'));
        assert.false(klass.hasDeclaredField('programmingLanguages'));

        assert.equals(klass.getDeclaredField('name').name, 'name');
        assert.equals(klass.getDeclaredField('name').type, String);

        assert.equals(klass.getDeclaredField('salary').name, 'salary');
        assert.equals(klass.getDeclaredField('salary').type, Number);

        assert.equals(klass.getDeclaredField('department').name, 'department');
        assert.equals(klass.getDeclaredField('department').type, Department);
    }


    @Test
    public 'all fields info'(assert: Assert) {
        const klass: Class<Employee> = Class.of(Employee);

        assert.true(klass.fields.length > 3);
        assert.true(klass.hasField('name'));
        assert.true(klass.hasField('salary'));
        assert.true(klass.hasField('department'));
        assert.false(klass.hasField('programmingLanguages'));
    }


    @Test
    public 'declared methods info'(assert: Assert) {
        const klass: Class<Employee> = Class.of(Employee);

        assert.equals(klass.declaredMethods.length, 0);
        assert.false(klass.hasDeclaredMethod('toString'));
    }


    @Test
    public 'all methods info'(assert: Assert) {
        const klass: Class<Employee> = Class.of(Employee);

        assert.true(klass.hasMethod('toString'));
    }


    @Test
    public 'field reflection'(assert: Assert) {
        const klass: Class<Employee> = Class.of(Employee);
        const field: Field = klass.getDeclaredField('name');

        assert.equals(field.name, 'name');
        assert.equals(field.type, String);
        assert.equals(field.declaringClass.type, Employee);
        assert.true(field.isDecoratedWith(Example));
        assert.equals(field.declaredDecorators.length, 1);
        assert.true(field.declaredDecorators.contains(Example));
    }

}
