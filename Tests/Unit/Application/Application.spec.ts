import {Application} from '../../../Source/Application/Application';
import {TestApplication} from './_Implementations/TestApplication';
import {TestApplicationConfiguration} from './_Implementations/TestApplicationConfiguration';


describe(`Application`, () => {
    let configuration: TestApplicationConfiguration;
    let application: TestApplication;


    beforeEach(() => {
        configuration = new TestApplicationConfiguration();
        application = new TestApplication(configuration);
    });


    describe(`#constructor()`, () => {
        it(`creates new instance of Application`, () => {
            expect(application).toBeInstanceOf(Application);
        });
    });


    describe(`#configuration`, () => {
        it(`saves reference to provided configuration object`, () => {
            expect(application.configuration).toBe(configuration);
        });
    });


    describe(`#main()`, () => {
        it(`launches end-point logic`, () => {
            expect(application.configuration).toBe(configuration);
        });
    });

});
