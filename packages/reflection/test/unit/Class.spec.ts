import {ReadOnlyCollection} from '@monument/collections-core/main/ReadOnlyCollection';
import {List} from '@monument/collections-core/main/List';
import {ArrayList} from '@monument/collections/main/ArrayList';
import {Key} from '@monument/object-model/main/Key';
import {Class} from '../../main/Class';
import {Field} from '../../main/Field';


type ColumnMetadata = {
    name: string;
};
//
// function Component(): ClassDecorator {
//     return (target: Function) => {
//         let klass: Class = Class.of(target);
//
//         klass.setDecoratorMetadata(Component, {});
//     };
// }

function Entity(): ClassDecorator {
    return (target: Function) => {
        let klass: Class = Class.of(target);

        klass.decorate(Entity);
    };
}

const COLUMNS_LIST_ATTRIBUTE_KEY: Key<List<ColumnMetadata>> = new Key();

function Column(): PropertyDecorator {
    return (target: object, name: string) => {
        let klass: Class = Class.of(target.constructor);
        let columns: List<ColumnMetadata> | undefined = klass.getAttribute(COLUMNS_LIST_ATTRIBUTE_KEY);

        if (columns == null) {
            columns = new ArrayList();

            klass.setAttribute(COLUMNS_LIST_ATTRIBUTE_KEY, columns);
        }

        columns.add({
            name: name
        });
    };
}


@Entity()
class Contact {
    @Column()
    private _id: number | undefined;

    @Column()
    private _name: string;

    @Column()
    private _email: string = '';

    @Column()
    private _phone: string = '';


    public get id(): number | undefined {
        return this._id;
    }


    public set id(value: number | undefined) {
        this._id = value;
    }


    public get name(): string {
        return this._name;
    }


    public set name(value: string) {
        this._name = value;
    }


    public get email(): string {
        return this._email;
    }


    public set email(value: string) {
        this._email = value;
    }


    public get phone(): string {
        return this._phone;
    }


    public set phone(value: string) {
        this._phone = value;
    }


    public constructor(name: string) {
        this._name = name;
    }
}


class Client extends Contact {
    @Column()
    private _companyName: string = '';

    public set companyName(value: string) {
        this._companyName = value;
    }


    public get companyName(): string {
        return this._companyName;
    }
}


describe('Class', () => {
    let klass: Class;

    beforeAll(() => {
        klass = Class.of(Client);
    });

    it(`provides basic class information`, () => {
        expect(klass.type).toBe(Client);
        expect(klass.name).toBe(Client.name);
        expect(klass.prototype).toBe(Client.prototype);
        expect(klass.parent).not.toBeUndefined();
        expect((klass.parent as Class).type).toBe(Contact);
        expect(klass.constructorParameters).toEqual([String]);
    });

    it(`providers information about decorators`, () => {
        expect(klass.isDecoratedWith(Entity)).toBe(true);
        expect(klass.declaredDecorators.length).toBe(0);
        expect(klass.declaredDecorators.contains(Entity)).toBe(false);
        expect(klass.decorators.length).toBe(1);
        expect(klass.decorators.contains(Entity)).toBe(true);
    });

    it(`provides information about attributes`, () => {
        let allColumns: ReadOnlyCollection<List<ColumnMetadata>> = klass.getAttributeValues(COLUMNS_LIST_ATTRIBUTE_KEY);

        expect(allColumns.length).toBe(2);

        let ownColumns = allColumns.toArray()[0];

        expect(ownColumns.length).toBe(1);
        expect(ownColumns).toContainEqual({
            name: '_companyName'
        });

        let parentColumns = allColumns.toArray()[1];

        expect(parentColumns.length).toBe(4);
        expect(parentColumns).toContainEqual({
            name: '_id'
        });
        expect(parentColumns).toContainEqual({
            name: '_name'
        });
        expect(parentColumns).toContainEqual({
            name: '_email'
        });
        expect(parentColumns).toContainEqual({
            name: '_phone'
        });
    });

    it(`providers list of declared fields`, () => {
        let declaredFields: ReadOnlyCollection<Field> = klass.declaredFields;
        let declaredFieldKeys: ReadOnlyCollection<string | symbol> = klass.declaredFieldKeys;

        expect(declaredFields.length).toBe(1);
        expect(declaredFieldKeys.length).toBe(1);
        expect(declaredFieldKeys.contains('companyName')).toBe(true);

        let parentFields: ReadOnlyCollection<Field> = (klass.parent as Class).declaredFields;
        let parentFieldKeys: ReadOnlyCollection<string | symbol> = (klass.parent as Class).declaredFieldKeys;

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
        expect(clientClass.attributeKeys).toContain(COLUMNS_LIST_ATTRIBUTE_KEY);
        expect(clientClass.declaredAttributeKeys.length).toBe(1);
        expect(clientClass.declaredAttributeKeys).toContain(COLUMNS_LIST_ATTRIBUTE_KEY);
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

