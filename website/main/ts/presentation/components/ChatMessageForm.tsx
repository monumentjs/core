import * as React from 'react';


export class ChatMessageForm extends React.Component {
    @Property
    public onSubmit?: React.FormEventHandler<HTMLFormElement>;

    public render(): JSX.Element {
        return (
            <form className="ChatMessageForm" onSubmit={this.onSubmit}>
                {this.props.children}
            </form>
        );
    }
}
