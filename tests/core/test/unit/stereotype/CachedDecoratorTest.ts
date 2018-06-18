import {BeforeEach} from '@monument/test-drive/main/decorators/BeforeEach';
import {Test} from '@monument/test-drive/main/decorators/Test';
import {Assert} from '@monument/test-drive/main/assert/Assert';
import {Cached} from '@monument/core/main/decorators/Cached';


class Example {

    @Cached
    public get value(): object {
        return {};
    }
}


export class CachedDecoratorTest {
    private example!: Example;


    @BeforeEach
    public setup() {
        this.example = new Example();
    }


    @Test
    public 'getter called once'(assert: Assert) {
        const a = this.example.value;
        const b = this.example.value;

        assert.equals(a, b);
    }
}
