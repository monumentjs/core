import {MimeTypesDatabase} from './Database/MimeTypesDatabase';
import {MimeTypeDefinition} from './Database/MimeTypeDefinition';
import {GetInstance} from '@monument/core/Language/Decorators/GetInstance';


export class MimeTypeResolver {
    @GetInstance()
    public static readonly instance: MimeTypeResolver;

    private readonly database: MimeTypesDatabase = MimeTypesDatabase.instance;


    private constructor() {
    }


    public isKnownType(mimeType: string): boolean {
        return this.database.typeNames.contains(mimeType);
    }


    public isCompressibleType(mimeType: string): boolean {
        const definition: MimeTypeDefinition = this.database.getTypeDefinition(mimeType);

        return definition.compressible || false;
    }


    public getTypeSource(mimeType: string, defaultValue?: string | undefined): string | undefined {
        const definition: MimeTypeDefinition = this.database.getTypeDefinition(mimeType);

        return definition.source || defaultValue;
    }


    public findTypeByExtension(extension: string, defaultType: string = 'application/octet-stream'): string {
        extension = extension.toLowerCase();

        for (let mimeType of this.database.typeNames) {
            const definition: MimeTypeDefinition = this.database.getTypeDefinition(mimeType);

            if (definition.extensions != null && definition.extensions.includes(extension)) {
                return mimeType;
            }
        }

        return defaultType;
    }
}
