import {DeepEqualityComparator} from '@monument/core/main/utils/DeepEqualityComparator';
import {Module} from '@monument/decorators/main/stereotype/Module';
import {Assert} from './Assert';


@Module({
    components: [
        Assert,
        DeepEqualityComparator
    ]
})
export class AssertionModule {

}
