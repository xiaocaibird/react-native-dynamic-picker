import * as _ from 'lodash';
export var objHp;
(function (objHp) {
    objHp.cloneDeep = _.cloneDeep;
    objHp.assign = _.assign;
    objHp.assignNewObj = (...objs) => {
        return objHp.assign({}, ...objs);
    };
    objHp.isEqual = _.isEqual;
    objHp.omit = _.omit;
    objHp.pick = _.pick;
})(objHp || (objHp = {}));
