/// <reference types="react" />
import * as React from 'react';
import { Story } from '../../../models/story';
import { Channel } from '../../../models/storybook';
export interface Props extends React.Props<{}> {
    channel: Channel;
    context: Story;
}
export default class InitScreenshotWrapper extends React.Component<Props> {
    componentDidMount(): void;
    emit(type: string): void;
    render(): React.ReactNode;
}
