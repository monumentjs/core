import {ClusterMessageType} from './ClusterMessageType';


export interface RunTestFileRequestClusterMessage {
    readonly type: ClusterMessageType.RUN_TEST_FILE_REQUEST;
    readonly id: number;
    readonly filePath: string;
}
