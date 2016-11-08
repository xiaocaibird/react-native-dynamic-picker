import { Component } from 'react';
import { objHp } from '../helper';

export abstract class baseComponent<P, S> extends Component<P, S> {
    protected alwaysUpdate = false;
    protected noUpdate = false;
    protected shouldComponentUpdate(nextProps: tCommon.reactProps, nextState: tCommon.reactState) {
        if (this.alwaysUpdate) return true;
        if (this.noUpdate) return false;
        return !objHp.isEqual(nextProps, this.props) || !objHp.isEqual(nextState, this.state)
    }
}