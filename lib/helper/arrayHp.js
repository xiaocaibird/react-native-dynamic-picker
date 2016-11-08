import * as _ from 'lodash';
export var arrayHp;
(function (arrayHp) {
    arrayHp.isArray = (obj) => {
        return obj instanceof Array;
    };
    arrayHp.findIndex = _.findIndex;
    arrayHp.find = _.find;
    arrayHp.findLast = _.findLast;
    arrayHp.groupBy = _.groupBy;
    arrayHp.sum = _.sum;
    arrayHp.filter = _.filter;
    arrayHp.remove = _.remove;
    arrayHp.pullAt = _.pullAt;
})(arrayHp || (arrayHp = {}));
