import * as _ from 'lodash';

export namespace objHp {
    export const cloneDeep = _.cloneDeep;

    export const assign = _.assign;

    export const assignNewObj = (...objs: (Object | undefined | null)[]) => {
        return assign({}, ...objs);
    }

    export const isEqual = _.isEqual;

    export const omit = _.omit;

    export const pick = _.pick;
}
