import * as React from 'react';


export interface ViewModel<TModel> {
    getModel(): TModel;
    setView(view: React.Component<TModel>): void;
}
