import FakeTask from './helpers/FakeTask';
import TaskRunner from '../../lib/System/Automation/JobsQueue';


describe('Core.JobsQueue', () => {
    // beforeAll(function () {
    //     jest.useFakeTimers();
    // });
    //
    //
    // afterAll(function () {
    //     jest.useRealTimers();
    // });


    describe('#constructor(options)', () => {
        it('can be called without arguments', () => {
            let taskRunner = null;

            expect(function () {
                taskRunner = new TaskRunner();
            }).not.toThrow();

            expect(taskRunner).toBeInstanceOf(TaskRunner);
        });


        it('can be called with arguments', () => {
            let taskRunner = null;

            expect(function () {
                taskRunner = new TaskRunner(true);
            }).not.toThrow();

            expect(taskRunner).toBeInstanceOf(TaskRunner);
        });
    });


    describe('#schedule(task)', () => {
        it('should run tasks in parallel', () => {
            let taskRunner = TaskRunner.concurrent();

            let jobs = Promise.all([
                taskRunner.schedule(new FakeTask({
                    result: 1
                })).then((result) => {
                    expect(result).toEqual(1);
                    expect(taskRunner.scheduledTasks.length).toEqual(0);
                }),

                taskRunner.schedule(new FakeTask({
                    result: 2
                })).then((result) => {
                    expect(result).toEqual(2);
                    expect(taskRunner.scheduledTasks.length).toEqual(0);
                }),

                taskRunner.schedule(new FakeTask({
                    result: 3
                })).then((result) => {
                    expect(result).toEqual(3);
                    expect(taskRunner.scheduledTasks.length).toEqual(0);
                })
            ]);

            expect(taskRunner.isBusy).toEqual(true);
            expect(taskRunner.isEmpty).toEqual(true);
            expect(taskRunner.processingTasks.length).toEqual(3);
            expect(taskRunner.scheduledTasks.length).toEqual(0);

            return jobs;
        });


        it('should run tasks sequentially', () => {
            let results = [];
            let taskRunner = TaskRunner.queue();

            let jobs = Promise.all([
                taskRunner.schedule(new FakeTask({
                    result: 1
                })).then((result) => {
                    results.push(result);
                    expect(result).toEqual(1);
                    expect(taskRunner.isBusy).toEqual(true);
                    expect(taskRunner.isEmpty).toEqual(false);
                    expect(taskRunner.processingTasks.length).toEqual(0);
                    expect(taskRunner.scheduledTasks.length).toEqual(2);
                }),

                taskRunner.schedule(new FakeTask({
                    result: 2
                })).then((result) => {
                    results.push(result);
                    expect(result).toEqual(2);
                    expect(taskRunner.isBusy).toEqual(true);
                    expect(taskRunner.isEmpty).toEqual(false);
                    expect(taskRunner.processingTasks.length).toEqual(0);
                    expect(taskRunner.scheduledTasks.length).toEqual(1);
                }),

                taskRunner.schedule(new FakeTask({
                    result: 3
                })).then((result) => {
                    results.push(result);
                    expect(result).toEqual(3);
                    expect(taskRunner.isBusy).toEqual(false);
                    expect(taskRunner.isEmpty).toEqual(true);
                    expect(taskRunner.processingTasks.length).toEqual(0);
                    expect(taskRunner.scheduledTasks.length).toEqual(0);
                })
            ]).then(() => {
                expect(results).toEqual([1, 2, 3]);
            });

            expect(taskRunner.isBusy).toEqual(true);
            expect(taskRunner.isEmpty).toEqual(false);
            expect(taskRunner.processingTasks.length).toEqual(1);
            expect(taskRunner.scheduledTasks.length).toEqual(2);

            return jobs;
        });


        it('should ignore queue errors when created with respective option', () => {
            let taskRunner = TaskRunner.queue();
            let onError = jest.fn();
            let onResult = jest.fn();
            let error = new Error('Test error');

            let jobs = Promise.all([
                taskRunner.schedule(new FakeTask<any, Error>({
                    error: error
                })).then(onResult, onError),

                taskRunner.schedule(new FakeTask<number, any>({
                    result: 1
                })).then(onResult, onError)
            ]);

            expect(taskRunner.processingTasks.length).toEqual(1);
            expect(taskRunner.scheduledTasks.length).toEqual(1);
            expect(onResult).toHaveBeenCalledTimes(0);
            expect(onError).toHaveBeenCalledTimes(0);
            expect(onError).not.toHaveBeenCalledWith(error);

            return jobs;
        });


        it('should NOT ignore queue errors when created without respective option', () => {
            let taskRunner = TaskRunner.queue(false);
            let onError = jest.fn();
            let onResult = jest.fn();
            let error = new Error('Test error');

            let jobs = Promise.all([
                taskRunner.schedule(new FakeTask<any, Error>({
                    error: error
                })).then(onResult, onError),

                taskRunner.schedule(new FakeTask<number, any>({
                    result: 1
                })).then(onResult, onError)
            ]).then(() => {
                expect(onResult).toHaveBeenCalledTimes(0);
                expect(onError).toHaveBeenCalledTimes(2);
                expect(onError).toHaveBeenCalledWith(error);
            });

            expect(taskRunner.processingTasks.length).toEqual(1);
            expect(taskRunner.scheduledTasks.length).toEqual(1);

            return jobs;
        });
    });


    describe('"empty" event', () => {
        describe('in queue mode', () => {
            it('should be fired when tasks queue become empty', () => {
                let callback;
                let job;
                let taskRunner = TaskRunner.queue();

                job = taskRunner.schedule(new FakeTask({
                    result: 1
                }));
                callback = jest.fn();

                taskRunner.on('empty', callback);

                expect(taskRunner.processingTasks.length).toBe(1);
                expect(taskRunner.scheduledTasks.length).toBe(0);
                expect(taskRunner.isEmpty).toBe(true);

                return job.then(() => {
                    expect(callback).toBeCalled();
                    expect(taskRunner.isEmpty).toBe(true);
                });
            });


            it('should be synchronized with state property', (done) => {
                let taskRunner = TaskRunner.queue();

                taskRunner.on('empty', () => {
                    expect(taskRunner.isEmpty).toBe(true);
                    done();
                });

                taskRunner.schedule(new FakeTask({
                    result: 1
                }));
            });
        });


        describe('in parallel mode', () => {
            it('should NOT be fired when tasks queue become empty', () => {
                let callback;
                let job;
                let taskRunner = TaskRunner.concurrent();

                job = taskRunner.schedule(new FakeTask({
                    result: 1
                }));
                callback = jest.fn();

                taskRunner.on('empty', callback);

                expect(taskRunner.processingTasks.length).toBe(1);
                expect(taskRunner.scheduledTasks.length).toBe(0);
                expect(taskRunner.isEmpty).toBe(true);

                return job.then(() => {
                    expect(callback).not.toBeCalled();
                    expect(taskRunner.isEmpty).toBe(true);
                });
            });


            it('should be synchronized with state property', (done) => {
                let taskRunner = TaskRunner.queue();

                taskRunner.on('empty', () => {
                    expect(taskRunner.isEmpty).toBe(true);
                    done();
                });

                taskRunner.schedule(new FakeTask({
                    result: 1
                }));
            });
        });
    });


    describe('"idle" event', () => {
        describe('in queue mode', () => {
            it('should be fired when all tasks become complete', () => {
                let callback;
                let job;
                let taskRunner = TaskRunner.queue();

                job = taskRunner.schedule(new FakeTask({
                    result: 1
                }));
                callback = jest.fn();

                taskRunner.on('idle', callback);

                expect(taskRunner.isIdle).toBe(false);

                return job.then(() => {
                    expect(callback).toBeCalled();
                    expect(taskRunner.isIdle).toBe(true);
                });
            });


            it('should be synchronized with state property', (done) => {
                let taskRunner = TaskRunner.queue();

                taskRunner.on('idle', () => {
                    expect(taskRunner.isIdle).toBe(true);
                    done();
                });

                taskRunner.schedule(new FakeTask({
                    result: 1
                }));
            });
        });


        describe('in parallel mode', () => {
            it('should NOT be fired when all tasks become complete', () => {
                let callback;
                let job;
                let taskRunner = TaskRunner.concurrent();

                job = taskRunner.schedule(new FakeTask({
                    result: 1
                }));
                callback = jest.fn();

                taskRunner.on('idle', callback);

                expect(taskRunner.isIdle).toBe(false);

                return job.then(() => {
                    expect(callback).not.toBeCalled();
                    expect(taskRunner.isIdle).toBe(true);
                });
            });


            it('should be synchronized with state property', (done) => {
                let taskRunner = TaskRunner.queue();

                taskRunner.on('idle', () => {
                    expect(taskRunner.isIdle).toBe(true);
                    done();
                });

                taskRunner.schedule(new FakeTask({
                    result: 1
                }));
            });
        });
    });


    describe('"busy" event', () => {
        describe('in queue mode', () => {
            it('should be fired when tasks queue become not empty', () => {
                let callback;
                let job;
                let taskRunner = TaskRunner.queue();

                callback = jest.fn();
                taskRunner.on('busy', callback);

                job = taskRunner.schedule(new FakeTask({
                    result: 1
                }));

                expect(taskRunner.isBusy).toBe(true);

                return job.then(() => {
                    expect(callback).toBeCalled();
                    expect(taskRunner.isBusy).toBe(false);
                });
            });


            it('should be synchronized with state property', (done) => {
                let taskRunner = TaskRunner.queue();

                taskRunner.on('busy', () => {
                    expect(taskRunner.isBusy).toBe(true);
                    done();
                });

                taskRunner.schedule(new FakeTask({
                    result: 1
                }));
            });
        });


        describe('in parallel mode', () => {
            it('should NOT be fired when tasks queue become not empty', () => {
                let callback;
                let job;
                let taskRunner = TaskRunner.concurrent();

                callback = jest.fn();
                taskRunner.on('busy', callback);

                job = taskRunner.schedule(new FakeTask({
                    result: 1
                }));

                expect(taskRunner.isBusy).toBe(true);

                return job.then(() => {
                    expect(callback).not.toBeCalled();
                    expect(taskRunner.isBusy).toBe(false);
                });
            });


            it('should be synchronized with state property', (done) => {
                let taskRunner = TaskRunner.queue();

                taskRunner.on('busy', () => {
                    expect(taskRunner.isBusy).toBe(true);
                    done();
                });

                taskRunner.schedule(new FakeTask({
                    result: 1
                }));
            });
        });
    });
});