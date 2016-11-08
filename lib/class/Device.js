import { PixelRatio, Dimensions, Platform } from 'react-native';
export class Device {
    constructor() {
    }
    get SystemName() {
        if (!this._systemName) {
            this._systemName = Platform.OS;
        }
        return this._systemName;
    }
    get IsIOS() {
        if (this._isIOS == null) {
            this._isIOS = this.SystemName.toLowerCase() == 'ios' ? true : false;
        }
        return this._isIOS;
    }
    get IsAndroid() {
        if (this._isAndroid == null) {
            this._isAndroid = this.SystemName.toLowerCase() == 'android' ? true : false;
        }
        return this._isAndroid;
    }
    get PxRatio() {
        if (this._pxRatio == null) {
            this._pxRatio = PixelRatio.get();
            if (this._pxRatio >= 2) {
                this._pxRatio = 2;
            }
            else if (this.PxRatio <= 1.5) {
                this._pxRatio = 1.5;
            }
        }
        return this._pxRatio;
    }
    getActualSize(px) {
        return this.PxRatio * px;
    }
    getWindowWidth() {
        return Dimensions.get('window').width;
    }
    getWindowHeight() {
        return Dimensions.get('window').height;
    }
    getScreenWidth() {
        if (this.IsIOS) {
            return this.getWindowWidth();
        }
        return Dimensions.get('screen').width;
    }
    getScreenHeight() {
        if (this.IsIOS) {
            return this.getWindowHeight();
        }
        return Dimensions.get('screen').height;
    }
}
Device.instance = new Device();
