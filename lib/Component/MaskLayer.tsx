import * as React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { baseNativeComponent } from './baseNativeComponent';

type props = {
    style?: React.ViewStyle,
    onPress?: tCommon.anyFun
}
type state = tCommon.reactState;

export class MaskLayer extends baseNativeComponent<props, state> {
    render() {
        const styles = getStyles();
        return (
            <View style={[styles.opacityBg, this.props.style]}>
                {this.props.onPress ? <TouchableOpacity onPress={this.props.onPress} style={styles.opacityBgOnPress}>
                </TouchableOpacity> : null}
            </View>
        )
    }
}

type styles = {
    opacityBg: React.ViewStyle,
    opacityBgOnPress: React.ViewStyle
};

let _styles: styles;

const getStyles = () => {
    if (!_styles) {
        try {
            _styles = StyleSheet.create<styles>({
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
    return _styles
}