import {ClusterMessageType} from './ClusterMessageType';


export interface RunTestFileResponseClusterMessage {
    readonly type: ClusterMessageType.RUN_TEST_FILE_RESPONSE;
    readonly id: number;
}
