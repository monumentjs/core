import {RunTestFileRequestClusterMessage} from './RunTestFileRequestClusterMessage';
import {RunTestFileResponseClusterMessage} from './RunTestFileResponseClusterMessage';


export type ClusterMessage = RunTestFileRequestClusterMessage | RunTestFileResponseClusterMessage;
