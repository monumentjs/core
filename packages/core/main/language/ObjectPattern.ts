import {Sequence} from '../collection/readonly/Sequence';
import {Pattern} from './Pattern';
import {FieldPattern} from './FieldPattern';
import {MethodPattern} from './MethodPattern';
import {NullPointerException} from '../exceptions/NullPointerException';


export abstract class ObjectPattern implements Pattern {
    public readonly fields: Sequence<FieldPattern>;
    public readonly methods: Sequence<MethodPattern>;

    protected constructor(fields: Sequence<FieldPattern>, methods: Sequence<MethodPattern>) {
        this.fields = fields;
        this.methods = methods;
    }

    public test(instance: any): boolean {
        if (instance == null) {
            throw new NullPointerException('Class instance is not defined.');
        }

        for (const field of this.fields) {
            if (field.test(instance) === false) {
                return false;
            }
        }

        for (const method of this.methods) {
            if (method.test(instance) === false) {
                return false;
            }
        }

        return true;
    }
}
