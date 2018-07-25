import {ListSet} from '@monument/core/main/collection/ListSet';
import {ReadOnlyCollection} from '@monument/core/main/collection/ReadOnlyCollection';


export class Marker {
    private readonly _name: string;
    private readonly _parents: ListSet<Marker>;


    public get name(): string {
        return this._name;
    }


    public get parents(): ReadOnlyCollection<Marker> {
        return this._parents;
    }


    public get hasParents(): boolean {
        return !this.parents.isEmpty;
    }


    public constructor(name: string, ...parents: Marker[]) {
        this._name = name;
        this._parents = new ListSet(parents);
    }


    public isInstanceOf(marker: string | Marker): boolean {
        if (typeof marker === 'string') {
            if (marker === this.name) {
                return true;
            }
        } else {
            if (marker === this) {
                return true;
            }
        }

        for (const parent of this.parents) {
            if (parent.isInstanceOf(marker)) {
                return true;
            }
        }

        return false;
    }
}
