import {Property} from '../../../../Language/Reflection/Property';
import {Class} from '../../../../Language/Reflection/Class';
import {Key} from '../../../../Language/Reflection/Key';
import {GetInstance} from '../../../../Language/Decorators/GetInstance';
import {Test} from '../../../../../test-drive/Decorators/TestConfiguration';
import {BeforeEach} from '@monument/test-drive/Decorators/BeforeEach';
import {Case} from '../../../../../test-drive/Decorators/Case';


class Parent {
    private _parent: string = 'parent';

    public get parent(): string {
        return this._parent;
    }


    public set parent(value: string) {
        this._parent = value;
    }


    public toString(): string {
        return this.parent;
    }
}


class Child extends Parent {
    @GetInstance()
    public static readonly instance: Child;

    private _child: string = 'child';

    public get child(): string {
        return this._child;
    }


    public set child(value: string) {
        this._child = value;
    }


    public toString(): string {
        return [this.parent, this.child].join(' -> ');
    }
}


@Test()
export class PropertySpec {
    protected child: Property;
    protected parent: Property;
    protected toStringChild: Property;
    protected toStringParent: Property;
    protected staticProperty: Property;

    protected extraAttribute1: Key = new Key();
    protected extraAttribute2: Key = new Key();


    @BeforeEach()
    public setUpTest() {
        this.child = Class.of(Child).getOwnInstanceProperty('child');
        this.parent = Class.of(Parent).getOwnInstanceProperty('parent');
        this.toStringChild = Class.of(Child).getOwnInstanceProperty('toString');
        this.toStringParent = Class.of(Parent).getOwnInstanceProperty('toString');
        this.staticProperty = Class.of(Child).getOwnStaticProperty('instance');
    }


    @Case()
    public 'key, isAccessor'() {
        expect(this.child.name).toBe('child');
        expect(this.child.isAccessor).toBe(true);

        expect(this.parent.name).toBe('parent');
        expect(this.parent.isAccessor).toBe(true);

        expect(this.staticProperty.name).toBe('instance');
        expect(this.staticProperty.isStatic).toBe(true);
        expect(this.staticProperty.isAccessor).toBe(true);
    }


    @Case()
    public 'attributes lookup'() {
        expect(this.toStringParent.getAttribute(this.extraAttribute1)).toBeUndefined();
        expect(this.toStringChild.getAttribute(this.extraAttribute1)).toBeUndefined();
        expect(this.toStringChild.getOwnOrInheritedAttribute(this.extraAttribute1)).toBeUndefined();

        this.toStringParent.setAttribute(this.extraAttribute1, 'Extra Value - Parent');

        expect(this.toStringParent.getAttribute(this.extraAttribute1)).toBe('Extra Value - Parent');
        expect(this.toStringChild.getAttribute(this.extraAttribute1)).toBeUndefined();
        expect(this.toStringChild.getOwnOrInheritedAttribute(this.extraAttribute1)).toBeUndefined();

        this.toStringChild.setAttribute(this.extraAttribute1, 'Extra Value - Child');

        expect(this.toStringParent.getAttribute(this.extraAttribute1)).toBe('Extra Value - Parent');
        expect(this.toStringChild.getAttribute(this.extraAttribute1)).toBe('Extra Value - Child');
        expect(this.toStringChild.getOwnOrInheritedAttribute(this.extraAttribute1)).toBe('Extra Value - Child');

        expect(this.toStringParent.getAttribute(this.extraAttribute2)).toBeUndefined();
        expect(this.toStringChild.getAttribute(this.extraAttribute2)).toBeUndefined();
        expect(this.toStringChild.getOwnOrInheritedAttribute(this.extraAttribute2)).toBeUndefined();

        this.toStringChild.setAttribute(this.extraAttribute2, 'Extra Value - Child');

        expect(this.toStringParent.getAttribute(this.extraAttribute2)).toBeUndefined();
        expect(this.toStringChild.getAttribute(this.extraAttribute2)).toBe('Extra Value - Child');
        expect(this.toStringChild.getOwnOrInheritedAttribute(this.extraAttribute2)).toBe('Extra Value - Child');

        this.toStringParent.setAttribute(this.extraAttribute2, 'Extra Value - Parent');

        expect(this.toStringParent.getAttribute(this.extraAttribute2)).toBe('Extra Value - Parent');
        expect(this.toStringChild.getAttribute(this.extraAttribute2)).toBe('Extra Value - Child');
        expect(this.toStringChild.getOwnOrInheritedAttribute(this.extraAttribute2)).toBe('Extra Value - Child');
    }
}
