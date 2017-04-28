import {HashSet} from '../../Core/Collections/HashSet';


export class ClassList extends HashSet<string> {
    public static concat(...lists: ClassList[]): ClassList {
        let resultList: ClassList = new ClassList();

        lists.forEach((list: ClassList) => {
            for (let className of list) {
                resultList.add(className);
            }
        });

        return resultList;
    }


    public static collect(obj: {[className: string]: boolean}): ClassList {
        let classList: ClassList = new ClassList();

        Object.keys(obj).forEach((className: string): void => {
            let isEnabled: boolean = obj[className];

            if (isEnabled) {
                classList.add(className);
            }
        });

        return classList;
    }


    public addMany(classNames: Iterable<string>): boolean {
        let allAdded: boolean = true;

        for (let className of classNames) {
            if (!this.add(className)) {
                allAdded = false;
            }
        }

        return allAdded;
    }


    public toggleMany(classNames: Iterable<string>, enable?: boolean) {
        for (let className of classNames) {
            this.toggle(className, enable);
        }
    }


    public toggle(className: string, enable?: boolean) {
        let alreadyInList: boolean = this.contains(className);

        if (typeof enable === 'boolean') {
            if (enable && !alreadyInList) {
                this.add(className);
            } else if (!enable && alreadyInList) {
                this.remove(className);
            }
        } else {
            if (!alreadyInList) {
                this.add(className);
            } else {
                this.remove(className);
            }
        }
    }


    public toString(): string {
        return this.toJSON().join(' ');
    }
}
