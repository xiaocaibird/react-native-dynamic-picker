declare namespace tCommon {
    export type anyObject = {
        [k: string]: any,
        [i: number]: any
    }
    export type anyFun = (...param: any[]) => any;
    export type reactProps = anyObject;
    export type reactState = anyObject;
}