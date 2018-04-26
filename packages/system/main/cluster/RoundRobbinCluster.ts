import {Fork} from '../process/Fork';
import {AbstractCluster} from './AbstractCluster';


export abstract class RoundRobbinCluster<TMessage> extends AbstractCluster<TMessage> {
    private _nextForkIndex: number = 0;


    protected getNextFork(): Fork<TMessage> {
        const fork: Fork<TMessage> = this.forks.getAt(this._nextForkIndex);

        this._nextForkIndex++;

        if (this._nextForkIndex >= this.forks.length) {
            this._nextForkIndex = 0;
        }

        return fork;
    }
}
