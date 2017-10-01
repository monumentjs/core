import {Property} from '../../../../Source/Language/Reflection/Property';
import {Class} from '../../../../Source/Language/Reflection/Class';
import {Key} from '../../../../Source/Language/Reflection/Key';
import {GetInstance} from '../../../../Source/Language/Decorators/GetInstance';


/* tslint:disable:max-classes-per-file */
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
/* tslint:enable:max-classes-per-file */


describe(`Property`, () => {
    let child: Property;
    let parent: Property;
    let toStringChild: Property;
    let toStringParent: Property;
    let staticProperty: Property;

    const extraAttribute1: Key = new Key();
    const extraAttribute2: Key = new Key();


    beforeEach(() => {
        child = Class.of(Child).getOwnInstanceProperty('child');
        parent = Class.of(Parent).getOwnInstanceProperty('parent');
        toStringChild = Class.of(Child).getOwnInstanceProperty('toString');
        toStringParent = Class.of(Parent).getOwnInstanceProperty('toString');
        staticProperty = Class.of(Child).getOwnStaticProperty('instance');
    });


    test(`key, isAccessor`, () => {
        expect(child.key).toBe('child');
        expect(child.isAccessor).toBe(true);

        expect(staticProperty.key).toBe('instance');
        expect(staticProperty.isStatic).toBe(true);
        expect(staticProperty.isAccessor).toBe(true);
    });


    test(`attributes lookup`, () => {
        expect(toStringParent.getAttribute(extraAttribute1)).toBeUndefined();
        expect(toStringChild.getAttribute(extraAttribute1)).toBeUndefined();
        expect(toStringChild.getOwnOrInheritedAttribute(extraAttribute1)).toBeUndefined();

        toStringParent.setAttribute(extraAttribute1, 'Extra Value - Parent');

        expect(toStringParent.getAttribute(extraAttribute1)).toBe('Extra Value - Parent');
        expect(toStringChild.getAttribute(extraAttribute1)).toBeUndefined();
        expect(toStringChild.getOwnOrInheritedAttribute(extraAttribute1)).toBeUndefined();

        toStringChild.setAttribute(extraAttribute1, 'Extra Value - Child');

        expect(toStringParent.getAttribute(extraAttribute1)).toBe('Extra Value - Parent');
        expect(toStringChild.getAttribute(extraAttribute1)).toBe('Extra Value - Child');
        expect(toStringChild.getOwnOrInheritedAttribute(extraAttribute1)).toBe('Extra Value - Child');


        expect(toStringParent.getAttribute(extraAttribute2)).toBeUndefined();
        expect(toStringChild.getAttribute(extraAttribute2)).toBeUndefined();
        expect(toStringChild.getOwnOrInheritedAttribute(extraAttribute2)).toBeUndefined();

        toStringChild.setAttribute(extraAttribute2, 'Extra Value - Child');

        expect(toStringParent.getAttribute(extraAttribute2)).toBeUndefined();
        expect(toStringChild.getAttribute(extraAttribute2)).toBe('Extra Value - Child');
        expect(toStringChild.getOwnOrInheritedAttribute(extraAttribute2)).toBe('Extra Value - Child');

        toStringParent.setAttribute(extraAttribute2, 'Extra Value - Parent');

        expect(toStringParent.getAttribute(extraAttribute2)).toBe('Extra Value - Parent');
        expect(toStringChild.getAttribute(extraAttribute2)).toBe('Extra Value - Child');
        expect(toStringChild.getOwnOrInheritedAttribute(extraAttribute2)).toBe('Extra Value - Child');
    });
});
