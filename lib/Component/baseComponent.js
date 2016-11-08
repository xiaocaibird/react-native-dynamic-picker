import { Component } from 'react';
import { objHp } from '../helper';
export class baseComponent extends Component {
    constructor() {
        super(...arguments);
        this.alwaysUpdate = false;
        this.noUpdate = false;
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (this.alwaysUpdate)
            return true;
        if (this.noUpdate)
            return false;
        return !objHp.isEqual(nextProps, this.props) || !objHp.isEqual(nextState, this.state);
    }
}
