import {ReadOnlyCollection} from '../../../collections/main/ReadOnlyCollection';
import {Key} from '@monument/object-model/main/Key';
import {WithDecorator} from '../../main/decorators/WithDecorator';
import {WithAttribute} from '../../main/decorators/WithAttribute';
import {Class} from '../../main/Class';
import {Field} from '../../main/Field';


const ATTRIBUTE_KEY: Key<string> = new Key();

function TestDecorator() {
    // Stub
}


@WithDecorator(TestDecorator)
@WithAttribute(ATTRIBUTE_KEY, 'Contact')
class Contact {
    @WithDecorator(TestDecorator)
    @WithAttribute(ATTRIBUTE_KEY, '_id')
    private _id: number | undefined;

    @WithDecorator(TestDecorator)
    @WithAttribute(ATTRIBUTE_KEY, '_name')
    private _name: string;

    @WithDecorator(TestDecorator)
    @WithAttribute(ATTRIBUTE_KEY, '_email')
    private _email: string = '';

    @WithDecorator(TestDecorator)
    @WithAttribute(ATTRIBUTE_KEY, '_phone')
    private _phone: string = '';


    @WithDecorator(TestDecorator)
    @WithAttribute(ATTRIBUTE_KEY, 'id')
    public get id(): number | undefined {
        return this._id;
    }


    public set id(value: number | undefined) {
        this._id = value;
    }


    @WithDecorator(TestDecorator)
    @WithAttribute(ATTRIBUTE_KEY, 'name')
    public get name(): string {
        return this._name;
    }


    public set name(value: string) {
        this._name = value;
    }


    @WithDecorator(TestDecorator)
    @WithAttribute(ATTRIBUTE_KEY, 'email')
    public get email(): string {
        return this._email;
    }


    public set email(value: string) {
        this._email = value;
    }


    @WithDecorator(TestDecorator)
    @WithAttribute(ATTRIBUTE_KEY, 'phone')
    public get phone(): string {
        return this._phone;
    }


    public set phone(value: string) {
        this._phone = value;
    }


    public constructor(
        @WithAttribute(ATTRIBUTE_KEY, 'name')
        @WithDecorator(TestDecorator)
            name: string,
    ) {
        this._name = name;
    }
}


class Client extends Contact {
    @WithDecorator(TestDecorator)
    @WithAttribute(ATTRIBUTE_KEY, '_companyName')
    private _companyName: string = '';

    @WithDecorator(TestDecorator)
    @WithAttribute(ATTRIBUTE_KEY, 'companyName')
    public set companyName(value: string) {
        this._companyName = value;
    }


    public get companyName(): string {
        return this._companyName;
    }
}


describe('Class', () => {
    let klass: Class<Client>;

    beforeAll(() => {
        klass = Class.of(Client);
    });

    it(`provides basic class information`, () => {
        expect(klass.type).toBe(Client);
        expect(klass.name).toBe(Client.name);
        expect(klass.prototype).toBe(Client.prototype);
        expect(klass.parent).not.toBeUndefined();
        expect((klass.parent as Class<any>).type).toBe(Contact);
        expect(klass.constructorParameters).toEqual([String]);
    });

    it(`providers information about decorators`, () => {
        expect(klass.isDecoratedWith(TestDecorator)).toBe(true);
        expect(klass.declaredDecorators.length).toBe(0);
        expect(klass.declaredDecorators.contains(TestDecorator)).toBe(false);
        expect(klass.decorators.length).toBe(1);
        expect(klass.decorators.contains(TestDecorator)).toBe(true);
    });

    it(`providers list of declared fields`, () => {
        let declaredFields: ReadOnlyCollection<Field> = klass.declaredFields;
        let declaredFieldKeys: ReadOnlyCollection<string | symbol> = klass.declaredFieldKeys;

        expect(declaredFields.length).toBe(1);
        expect(declaredFieldKeys.length).toBe(1);
        expect(declaredFieldKeys.contains('companyName')).toBe(true);

        let parentFields: ReadOnlyCollection<Field> = (klass.parent as Class<any>).declaredFields;
        let parentFieldKeys: ReadOnlyCollection<string | symbol> = (klass.parent as Class<any>).declaredFieldKeys;

        expect(parentFields.length).toBe(4);
        expect(parentFieldKeys.length).toBe(4);
        expect(parentFieldKeys.contains('id')).toBe(true);
        expect(parentFieldKeys.contains('name')).toBe(true);
        expect(parentFieldKeys.contains('email')).toBe(true);
        expect(parentFieldKeys.contains('phone')).toBe(true);
    });

    it('provides list of own and inherited attributes', () => {
        let clientClass = Class.of(Client);

        expect(clientClass.attributeKeys.length).toBe(1);
        expect(clientClass.attributeKeys).toContain(ATTRIBUTE_KEY);
        expect(clientClass.declaredAttributeKeys.length).toBe(1);
        expect(clientClass.declaredAttributeKeys).toContain(ATTRIBUTE_KEY);
    });

    it(`determines inheritance hierarchy`, () => {
        let contactClass = Class.of(Contact);
        let clientClass = Class.of(Client);
        let objectClass = Class.of(Object);

        expect(objectClass.isSuperClassOf(clientClass)).toBe(true);
        expect(objectClass.isSuperClassOf(contactClass)).toBe(true);

        expect(contactClass.isSuperClassOf(clientClass)).toBe(true);
        expect(clientClass.isSubClassOf(contactClass)).toBe(true);

        expect(contactClass.isSubClassOf(objectClass)).toBe(true);
        expect(clientClass.isSubClassOf(objectClass)).toBe(true);
    });
});

