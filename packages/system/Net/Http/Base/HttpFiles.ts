import {LinkedMultiValueMap} from '@monument/collections-specialized/main/LinkedMultiValueMap';
import {KeyValuePair} from '../../../../collections-core/main/KeyValuePair';
import {List} from '../../../../collections-core/main/List';
import {FileInputStream} from '../../../FileSystem/FileInputStream';


export class HttpFiles extends LinkedMultiValueMap<string, FileInputStream> {
    public constructor(files?: Iterable<KeyValuePair<string, List<FileInputStream>>>) {
        super(files);
    }
}
