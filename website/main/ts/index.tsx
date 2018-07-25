import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Boot} from '@monument/core/main/application/decorators/Boot';
import {Application} from '@monument/core/main/stereotype/Application';
import {Init} from '@monument/core/main/stereotype/lifecycle/Init';
import {PageBody, PageHeader, PageLayout, PageMain, PageSidebar} from './presentation/layouts/PageLayout';
import {StackLayout, StackLayoutBlock, StackLayoutBody} from './presentation/layouts/StackLayout';
import {StackLayoutDirection} from './presentation/layouts/StackLayoutDirection';
import {Nav, NavMenu, NavMenuItem} from './presentation/elements/Navigation';
import {Panel} from './presentation/layouts/Panel';
import {Alignment} from './presentation/layouts/Alignment';
import {Value} from '@monument/core/main/observable/Value';
import {ObservableValue} from '@monument/core/main/observable/ObservableValue';
import {TextArea} from './presentation/elements/TextArea';
import {StringPool} from '@monument/core/main/StringPool';
import {TextAreaSizingMode} from './presentation/elements/TextAreaSizingMode';
import {Delegate} from '@monument/core/main/decorators/Delegate';
import {ChatMessageForm} from './presentation/components/ChatMessageForm';
import {Viewport} from './presentation/elements/Viewport';
import {Content} from './presentation/layouts/Content';
import {ChatViewport} from './presentation/elements/ChatViewport';
import {ChatMessage} from './presentation/elements/ChatMessage';


@Boot
@Application({
    modules: []
})
export class Site {

    private readonly messageValue: Value<string> = new ObservableValue(StringPool.BLANK);


    @Init
    public start() {

        ReactDOM.render(
            <PageLayout>
                <StackLayout>
                    <StackLayoutBlock>
                            <PageHeader>
                                <StackLayout direction={StackLayoutDirection.HORIZONTAL}>
                                    <StackLayoutBlock>
                                        <Panel>
                                            Logo
                                        </Panel>
                                    </StackLayoutBlock>
                                    <StackLayoutBody>
                                        <Panel>
                                            <Nav>
                                                <NavMenu>
                                                    <NavMenuItem>Quick Start</NavMenuItem>
                                                    <NavMenuItem>Reference</NavMenuItem>
                                                </NavMenu>
                                            </Nav>
                                        </Panel>
                                    </StackLayoutBody>
                                    <StackLayoutBody>
                                        <Panel horizontal={Alignment.END}>
                                            <Nav>
                                                <NavMenu>
                                                    <NavMenuItem>GitHub</NavMenuItem>
                                                </NavMenu>
                                            </Nav>
                                        </Panel>
                                    </StackLayoutBody>
                                </StackLayout>
                            </PageHeader>
                    </StackLayoutBlock>
                    <StackLayoutBody>
                        <PageBody>
                            <StackLayout direction={StackLayoutDirection.HORIZONTAL}>
                                <StackLayoutBlock>
                                    <PageSidebar>
                                        <Viewport>
                                            <Content>
                                                <div>Lorem ipsum dolor sit.</div>
                                                <div>Corporis cupiditate nisi quidem?</div>
                                                <div>Accusantium beatae provident vero?</div>
                                                <div>Aperiam at debitis molestiae.</div>
                                                <div>Eligendi nesciunt perferendis perspiciatis!</div>
                                                <div>Explicabo modi quaerat quas?</div>
                                                <div>Eligendi explicabo rem voluptas.</div>
                                                <div>Explicabo officia pariatur soluta?</div>
                                                <div>Cupiditate fugiat illum temporibus.</div>
                                                <div>Dolore facilis ipsa similique./</div>
                                            </Content>
                                        </Viewport>
                                    </PageSidebar>
                                </StackLayoutBlock>
                                <StackLayoutBody>
                                    <PageMain>
                                        <StackLayout>
                                            <StackLayoutBody>
                                                <ChatViewport>
                                                    <Panel vertical={Alignment.END} style={{height: 'auto', minHeight: '100%'}}>
                                                        <Content>
                                                            <ChatMessage>
                                                                <ChatMessage.Body>
                                                                    Hello!
                                                                </ChatMessage.Body>
                                                            </ChatMessage>
                                                        </Content>
                                                    </Panel>
                                                </ChatViewport>
                                            </StackLayoutBody>
                                            <StackLayoutBlock>
                                                <ChatMessageForm onSubmit={this.onChatMessageFormSubmit}>
                                                    <Content>
                                                        <TextArea className="ChatMessageForm_MessageInput"
                                                                  placeholder="Message:"
                                                                  rows={1}
                                                                  sizingMode={TextAreaSizingMode.AUTO}
                                                                  valueBinding={this.messageValue}/>
                                                    </Content>
                                                </ChatMessageForm>
                                            </StackLayoutBlock>
                                        </StackLayout>
                                    </PageMain>
                                </StackLayoutBody>
                            </StackLayout>
                        </PageBody>
                    </StackLayoutBody>
                </StackLayout>
            </PageLayout>,
            document.getElementById('app')
        );
    }


    @Delegate
    private onChatMessageFormSubmit() {
        //
    }
}
