import {Assert} from '@monument/test-drive/main/assert/Assert';
import {MockFactory} from '@monument/test-drive/main/mock/MockFactory';
import {Test} from '@monument/test-drive/main/configuration/decorators/Test';
import {BeforeEach} from '@monument/test-drive/main/configuration/decorators/BeforeEach';
import {AfterEach} from '@monument/test-drive/main/configuration/decorators/AfterEach';
import {Init} from '@monument/stereotype/main/Init';
import {Destroy} from '@monument/stereotype/main/Destroy';
import {PreDestroy} from '@monument/stereotype/main/PreDestroy';
import {PostConstruct} from '@monument/stereotype/main/PostConstruct';
import {Injectable} from '@monument/stereotype/main/Injectable';
import {DefaultContext} from '../../../../main/context/support/DefaultContext';


@Injectable
class Example {

    @Init
    public init() {
        // Stub
    }


    @PostConstruct
    public postConstruct() {
        // Stub
    }


    @PreDestroy
    public preDestroy() {
        // Stub
    }


    @Destroy
    public destroy() {
        // Stub
    }
}


export class DefaultContextTest {
    private context!: DefaultContext;


    @BeforeEach
    public async setupContext() {
        this.context = new DefaultContext();

        this.context.scan(Example);

        await this.context.start();
    }


    @AfterEach
    public async destroyContext() {
        await this.context.stop();
    }


    @Test
    public async 'getUnit() instantiates object'(assert: Assert, mockFactory: MockFactory) {
        const a = await this.context.getUnit(Example);
        const b = await this.context.getUnit(Example);

        assert.false(a === b);
    }
}
