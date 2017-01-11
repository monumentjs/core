
import Task from '../../../lib/System/Automation/Job';


export interface IFakeTaskCredentials<R, E> {
    result?: R;
    error?: E;
}


export default class FakeTask<R, E> extends Task<R> {
    constructor(credentials: IFakeTaskCredentials<R, E>) {
        super(function (): Promise<R> {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    if (credentials.result) {
                        resolve(credentials.result);
                    } else {
                        reject(credentials.error);
                    }
                }, 1);
            });
        }, {
            description: 'Test task'
        });
    }
}