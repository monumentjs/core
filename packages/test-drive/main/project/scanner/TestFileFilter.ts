import {IgnoreCaseComparator} from '@monument/core/main/IgnoreCaseComparator';
import {Component} from '@monument/stereotype/main/Component';
import {FileSystemEntryFilter} from '@monument/node/main/file-system/walker/FileSystemEntryFilter';
import {FileSystemEntry} from '@monument/node/main/file-system/FileSystemEntry';
import {File} from '@monument/node/main/file-system/File';


@Component
export class TestFileFilter implements FileSystemEntryFilter {
    private static readonly TEST_FILE_NAME_SUFFIX = 'Test';
    private static readonly TEST_FILE_EXTENSION = '.js';

    private readonly _extensionComparator: IgnoreCaseComparator = IgnoreCaseComparator.instance;


    public async decide(entry: FileSystemEntry): Promise<boolean> {
        const fileExtension: string = entry.path.extension;
        const className: string = entry.path.baseNameWithoutExtension;

        const isFile: boolean = entry instanceof File;
        const hasNameSuffix: boolean = className.endsWith(TestFileFilter.TEST_FILE_NAME_SUFFIX);
        const hasExtension: boolean = this._extensionComparator.equals(fileExtension, TestFileFilter.TEST_FILE_EXTENSION);

        return isFile && hasNameSuffix && hasExtension;
    }
}
