import { Device } from './Device';
class _Factory {
    constructor() {
        this.Device = Device.instance;
    }
}
export const NativeFactory = new _Factory();
