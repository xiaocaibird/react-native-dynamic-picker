import { Device } from './Device'

class _Factory {
    readonly Device = Device.instance
}

export const NativeFactory = new _Factory();