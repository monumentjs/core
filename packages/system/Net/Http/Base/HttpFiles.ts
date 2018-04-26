import {LinkedMultiValueMap} from '@monument/collections/main/LinkedMultiValueMap';
import {KeyValuePair} from '../../../../collections/main/KeyValuePair';
import {List} from '../../../../collections/main/List';
import {FileInputStream} from '../../../file-system/FileInputStream';


export class HttpFiles extends LinkedMultiValueMap<string, FileInputStream> {
    public constructor(files?: Iterable<KeyValuePair<string, List<FileInputStream>>>) {
        super(files);
    }
}
