import {ReadOnlyCollection} from '@monument/collections/main/ReadOnlyCollection';
import {ListSet} from '@monument/collections/main/ListSet';


/**
 * Markers are objects that are used to add easily filterable information to log messages.
 *
 * Markers can be hierarchical - each Marker may have a parent.
 * This allows for broad categories being subdivided into more specific categories.
 * An example might be a Marker named "Error" with children named "SystemError" and "ApplicationError".
 */
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
