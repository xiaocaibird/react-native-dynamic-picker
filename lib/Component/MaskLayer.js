import * as React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { baseNativeComponent } from './baseNativeComponent';
export class MaskLayer extends baseNativeComponent {
    render() {
        const styles = getStyles();
        return (React.createElement(View, {style: [styles.opacityBg, this.props.style]}, this.props.onPress ? React.createElement(TouchableOpacity, {onPress: this.props.onPress, style: styles.opacityBgOnPress}) : null));
    }
}
let _styles;
const getStyles = () => {
    if (!_styles) {
        try {
            _styles = StyleSheet.create({
                opacityBg: {
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'black',
                    opacity: 0.4
                },
                opacityBgOnPress: {
                    flex: 1,
                    alignSelf: 'stretch'
                },
            });
        }
        catch (e) {
        }
    }
    return _styles;
};
