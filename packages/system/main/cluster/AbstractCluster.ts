import {Disposable} from '@monument/core/main/Disposable';
import {ArrayList} from '@monument/collections/main/ArrayList';
import {ReadOnlyList} from '@monument/collections/main/ReadOnlyList';
import {Fork} from '../process/Fork';


export abstract class AbstractCluster<TMessage> implements Disposable {
    private readonly _forks: ArrayList<Fork<TMessage>> = new ArrayList();


    public get forks(): ReadOnlyList<Fork<TMessage>> {
        return this._forks;
    }


    public constructor(modulePath: string, slavesCount: number) {
        for (let id = 0; id < slavesCount; id++) {
            this._forks.add(this.createFork(modulePath, id));
        }
    }


    public async dispose(): Promise<void> {
        await Promise.all(this._forks.toArray().map((fork) => {
            return fork.exit();
        }));
    }


    public send(message: TMessage): Promise<void> {
        const fork: Fork<TMessage> = this.getNextFork();

        return fork.send(message);
    }


    protected abstract createFork(modulePath: string, id: number): Fork<TMessage>;


    /**
     * Returns the next less loaded process.
     */
    protected abstract getNextFork(): Fork<TMessage>;
}
