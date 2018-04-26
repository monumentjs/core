import {cpus} from 'os';
import {EqualityComparator} from '@monument/core/main/EqualityComparator';
import {IgnoreCaseComparator} from '@monument/core/main/IgnoreCaseComparator';
import {ListMap} from '@monument/collections/main/ListMap';
import {DeferredObject} from '@monument/async/main/DeferredObject';
import {Boot} from '@monument/application/main/decorators/Boot';
import {Delegate} from '@monument/events/main/decorators/Delegate';
import {FileSystemWalker} from '@monument/system/main/file-system/walker/FileSystemWalker';
import {FileSystemEntry} from '@monument/system/main/file-system/FileSystemEntry';
import {FileInfo} from '@monument/system/main/file-system/FileInfo';
import {Path} from '@monument/system/main/file-system/Path';
import {CurrentProcess} from '@monument/system/main/process/CurrentProcess';
import {ProcessInfo} from '@monument/system/main/process/ProcessInfo';
import {Fork} from '@monument/system/main/process/Fork';
import {Application} from '@monument/stereotype/main/Application';
import {Init} from '@monument/stereotype/main/Init';
import {ClusterMessageType} from '../communication/ClusterMessageType';
import {ClusterMessage} from '../communication/ClusterMessage';
import {Cluster} from './Cluster';


@Boot
@Application()
export class MasterApplication {
    private static readonly SLAVE_APPLICATION_EXECUTABLE: string = Path.resolve([__dirname, '../slave/SlaveApplication']);

    private readonly _process: CurrentProcess = CurrentProcess.instance;
    private readonly _cluster: Cluster = new Cluster(MasterApplication.SLAVE_APPLICATION_EXECUTABLE, cpus().length);
    private readonly _extensionComparator: EqualityComparator<string> = IgnoreCaseComparator.instance;
    private readonly _walker: FileSystemWalker = this.createWalker();
    private readonly _pendingTests: ListMap<number, DeferredObject> = new ListMap();
    private _id: number = 0;


    public constructor() {
        this._cluster.forks.forEach((fork) => {
            fork.messageReceived.subscribe(this.onForkMessage);
        });
    }


    @Init
    public async run() {
        const processInfo: ProcessInfo = await this._process.info;
        const testDirectory: string = processInfo.currentWorkingDirectory + '/test';

        await this._walker.walk(testDirectory, this.onTestFile);

        await this._cluster.dispose();
    }


    private createWalker(): FileSystemWalker {
        const walker: FileSystemWalker = new FileSystemWalker();

        walker.addFilter({
            apply: async (entry: FileSystemEntry): Promise<boolean> => {
                return entry instanceof FileInfo &&
                    entry.path.baseNameWithoutExtension.endsWith('Test') &&
                    this._extensionComparator.equals(entry.path.extension, '.js');
            }
        });

        return walker;
    }


    @Delegate
    private onTestFile(entry: FileSystemEntry): Promise<void> {
        const id: number = this.getNextId();

        return this.runTestFile(id, entry.path.originalPath);
    }


    @Delegate
    private onForkMessage(target: Fork<ClusterMessage>, message: ClusterMessage) {
        switch (message.type) {
            case ClusterMessageType.RUN_TEST_FILE_RESPONSE:
                this.endTestFile(message.id);
                break;

            default:
        }
    }


    private async runTestFile(id: number, filePath: string) {
        const deferred: DeferredObject<void> = new DeferredObject();

        this._pendingTests.put(id, deferred);

        await this._cluster.send({
            type: ClusterMessageType.RUN_TEST_FILE_REQUEST,
            filePath: filePath,
            id: id
        });

        return deferred.promise;
    }


    private endTestFile(id: number) {
        const test = this._pendingTests.remove(id);

        if (test != null) {
            test.resolve();
        }
    }


    private getNextId(): number {
        return this._id++;
    }
}
