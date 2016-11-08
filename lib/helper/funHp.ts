export namespace funHp {
    export const noop = () => { };
    export const isFun = (fn: any) => {
        return (typeof fn === 'function')
    }

    export const isExtendsClass = (sonClass: Function, fatherClass: Function) => {
        try {
            return fatherClass.prototype.isPrototypeOf(sonClass.prototype);
        }
        catch (e) {
            return false
        }
    }
}