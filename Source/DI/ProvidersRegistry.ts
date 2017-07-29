import {Provider} from './Provider';
import {Dictionary} from '../Collections/Dictionary';
import {ProviderToken} from './types';
import {ProvidersRegistryException} from './ProvidersRegistryException';


export class ProvidersRegistry extends Dictionary<ProviderToken<any>, Provider<any>> {
    public constructor() {
        super();
    }


    public set<T>(token: ProviderToken<T>, provider: Provider<T>): void {
        if (this.containsKey(token)) {
            let tokenId: string = typeof token === 'function' ? token.name : token;

            throw new ProvidersRegistryException(`Provider with token ${tokenId} already defined.`);
        }

        super.set(token, provider);
    }


    public replace<TBase>(oldToken: ProviderToken<TBase>, provider: Provider<TBase>): void {
        super.set(oldToken, provider);
    }
}
