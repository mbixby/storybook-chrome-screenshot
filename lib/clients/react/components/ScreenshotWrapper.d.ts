/// <reference types="react" />
import * as React from 'react';
import { Story } from '../../../models/story';
import { Channel } from '../../../models/storybook';
import { Viewport } from '../../../models/viewport';
export interface Props extends React.Props<{}> {
    channel: Channel;
    context: Story;
    delay: number;
    viewport: Viewport | Viewport[];
    namespace?: string;
}
export default class ScreenshotWrapper extends React.Component<Props> {
    component: HTMLSpanElement;
    constructor(props: Props);
    componentDidMount(): void;
    emit(type: string): void;
    handleRef: (component: HTMLSpanElement) => void;
    render(): JSX.Element;
}
