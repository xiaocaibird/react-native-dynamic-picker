import * as _ from 'lodash';
export namespace arrayHp {
    export const isArray = (obj: any) => {
        return obj instanceof Array;
    }
    export const findIndex = _.findIndex;

    export const find = _.find;

    export const findLast = _.findLast;

    export const groupBy = _.groupBy;

    export const sum = _.sum;

    export const filter = _.filter;

    export const remove = _.remove;

    export const pullAt = _.pullAt
}