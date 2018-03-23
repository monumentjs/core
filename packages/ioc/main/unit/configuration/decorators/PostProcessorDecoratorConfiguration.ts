import {ReadOnlyCollection} from '@monument/collections-core/main/ReadOnlyCollection';
import {ListSet} from '@monument/collections/main/ListSet';
import {Key} from '@monument/object-model/main/Key';
import {PostProcessorTarget} from './PostProcessorTarget';
import {PostProcessorConfiguration} from './PostProcessorConfiguration';


export class PostProcessorDecoratorConfiguration extends PostProcessorConfiguration {
    public static readonly ATTRIBUTE_KEY: Key<PostProcessorDecoratorConfiguration> = new Key();


    private readonly _targets: ReadOnlyCollection<PostProcessorTarget>;


    public get targets(): ReadOnlyCollection<PostProcessorTarget> {
        return this._targets;
    }


    public constructor(targets: Iterable<PostProcessorTarget>, order?: number) {
        super(order);

        this._targets = new ListSet(targets);
    }
}
