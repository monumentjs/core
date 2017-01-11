import {IFormattable, Pool} from '../../Core/types';
import Collection from '../../Core/Collection/Collection';


export default class ClassList extends Collection<string> implements IFormattable {
    public static concat(...slices: Array<string | Pool<boolean>>): ClassList {
        let list: ClassList = new ClassList();

        slices.forEach((slice: string | Pool<boolean>) => {
            if (typeof slice === 'string') {
                list.add(slice);
            } else if (typeof slice === 'object') {
                Object.keys(slice).forEach((name: string) => {
                    let enabled: boolean = slice[name];

                    list.toggle(name, enabled);
                });
            }
        });

        return list;
    }


    public toggle(names: string, enable?: boolean) {
        names.split(/\s+/).forEach((item: string) => {
            let alreadyInList: boolean = this.has(item);

            if (typeof enable === 'boolean') {
                if (enable && !alreadyInList) {
                    this.add(item);
                } else if (!enable && alreadyInList) {
                    this.remove(item);
                }
            } else {
                if (alreadyInList) {
                    this.remove(item);
                } else {
                    this.add(item);
                }
            }
        });
        // TODO: write tests and ensure that duplicates removal is necessary
        // this.removeDuplicates();
    }


    public toString(): string {
        return this.toJSON().join(' ');
    }


    // private removeDuplicates() {
    //
    // }
}
