import {Assert} from '@monument/test-drive/main/assert/Assert';
import {Test} from '@monument/test-drive/main/decorators/Test';
import {BeforeEach} from '@monument/test-drive/main/decorators/BeforeEach';
import {AfterEach} from '@monument/test-drive/main/decorators/AfterEach';
import {ReadOnlyList} from '@monument/core/main/collection/readonly/ReadOnlyList';
import {ArrayList} from '@monument/core/main/collection/mutable/ArrayList';
import {Ignore} from '@monument/test-drive/main/decorators/Ignore';

interface Element {
    readonly name: string;

    setValue(value: string): Promise<void>;

    click(): Promise<void>;
}

interface ElementSelector {
    findElement(document: any): Element | undefined;

    findElements(document: any): ReadOnlyList<Element>;
}

class CssSelector implements ElementSelector {
    private readonly _selector: string;


    public constructor(selector: string) {
        this._selector = selector;
    }

    public findElement(document: any): Element | undefined {
        return undefined;
    }

    public findElements(document: any): ReadOnlyList<Element> {
        return new ArrayList();
    }
}

class Page {

    public async close(): Promise<void> {
        //
    }
}

interface Browser {
    /**
     * @throws ElementNotFoundException
     */
    queryElement(selector: ElementSelector): Element;

    queryElements(selector: ElementSelector): ReadOnlyList<Element>;

    openPage(url: string): Promise<Page>;
}

/**
 * Provides access to browser features.
 * Browser and it's settings specified in BrowserConfiguration
 */
class BrowserManager {
    public get(): Browser {
        return null as any;
    }
}

/**
 * Encapsulates search page interface.
 */
class SearchPage {
    public static readonly PAGE_URL = 'https://test.pages.com/search';

    private readonly _browser: Browser;

    private readonly _searchPhraseInputSelector = new CssSelector('.SearchForm_SearchInput');
    private readonly _submitSearchFormButtonSelector = new CssSelector('.SearchForm_SubmitButton');
    private readonly _searchResultSelector = new CssSelector('.SearchResultsList_Item');

    private _page!: Page;


    public get hasResults(): boolean {
        return this._browser.queryElements(this._searchResultSelector).length > 0;
    }


    public constructor(browserBuilder: BrowserManager) {
        this._browser = browserBuilder.get();
    }


    public async open() {
        this._page = await this._browser.openPage(SearchPage.PAGE_URL);
    }


    public async close() {
        await this._page.close();
    }


    public async setSearchPhrase(text: string) {
        const input = this._browser.queryElement(this._searchPhraseInputSelector);

        await input.setValue(text);
    }


    public async submitSearchForm() {
        const button = this._browser.queryElement(this._submitSearchFormButtonSelector);

        await button.click();
    }
}


enum BrowserId {
    CHROMIUM,
    CHROME,
    FIREFOX,
    OPERA,
    IE,
    EDGE,
    SAFARI
}

@Ignore('This is proof of concept')
export class SearchPageTest {
    private readonly _page: SearchPage;

    public constructor(searchPage: SearchPage) {
        this._page = searchPage;
    }

    @BeforeEach
    public async setup() {
        await this._page.open();
    }

    @AfterEach
    public async cleanup() {
        await this._page.close();
    }

    @Test
    public async 'search form submission'(assert: Assert) {
        await this._page.setSearchPhrase('JavaScript');
        await this._page.submitSearchForm();

        assert.true(this._page.hasResults);
    }
}
