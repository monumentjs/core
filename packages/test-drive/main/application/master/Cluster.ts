import {RoundRobbinCluster} from '@monument/system/main/cluster/RoundRobbinCluster';
import {Fork} from '@monument/system/main/process/Fork';
import {ClusterMessage} from '../communication/ClusterMessage';


export class Cluster extends RoundRobbinCluster<ClusterMessage> {
    protected createFork(modulePath: string, id: number): Fork<ClusterMessage> {
        return new Fork<ClusterMessage>(modulePath);
    }
}
