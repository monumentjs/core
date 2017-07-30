import {Application} from '../../../Source/Application/Application';
import {TestApplication} from './_Mocks/TestApplication';
import {TestApplicationConfiguration} from './_Mocks/TestApplicationConfiguration';
import {ArgumentNullException} from '../../../Source/Exceptions/ArgumentNullException';
import {TestApplicationContext} from './_Mocks/TestApplicationContext';


describe(`Application`, () => {
    let configuration: TestApplicationConfiguration;
    let application: TestApplication;


    beforeEach(() => {
        configuration = new TestApplicationConfiguration();
        application = new TestApplication(configuration);
    });


    describe(`#constructor()`, () => {
        it(`throws if 'configuration' argument is not defined`, () => {
            expect(() => {
                application = new TestApplication(null);
            }).toThrow(ArgumentNullException);

            expect(() => {
                application = new TestApplication(undefined);
            }).toThrow(ArgumentNullException);
        });

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


    describe(`#bootstrap()`, () => {
        it(`throws if 'contextType' argument is not defined`, () => {
            expect(() => {
                Application.bootstrap(null);
            }).toThrow(ArgumentNullException);

            expect(() => {
                Application.bootstrap(undefined);
            }).toThrow(ArgumentNullException);
        });

        it(`launches application inside specified context`, async () => {
            let spy = jest.spyOn(TestApplicationConfiguration.prototype, 'activate');

            spy.mockReturnValueOnce(true);

            expect(spy).toHaveBeenCalledTimes(0);

            await Application.bootstrap(TestApplicationContext)(TestApplication);

            expect(spy).toHaveBeenCalledTimes(1);
            expect(Application.context).toBeInstanceOf(TestApplicationContext);
            expect(Application.context.application).toBeInstanceOf(TestApplication);
        });

        it(`catches application bootstrap exception`, async () => {
            let spy = jest.spyOn(TestApplicationConfiguration.prototype, 'activate');

            spy.mockReturnValueOnce(false);

            expect(spy).toHaveBeenCalledTimes(0);

            await expect((Application.bootstrap(TestApplicationContext)(TestApplication))).rejects.toMatchObject({
                message: 'Application failed'
            });

            expect(spy).toHaveBeenCalledTimes(1);
        });
    });

});
