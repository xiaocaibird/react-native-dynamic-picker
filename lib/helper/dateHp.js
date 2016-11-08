export var dateHp;
(function (dateHp) {
    dateHp.format = (t, fmt) => {
        try {
            const o = {
                "M+": t.getMonth() + 1,
                "d+": t.getDate(),
                "h+": t.getHours(),
                "m+": t.getMinutes(),
                "s+": t.getSeconds(),
                "q+": Math.floor((t.getMonth() + 3) / 3),
                "S": t.getMilliseconds()
            };
            if (/(y+)/.test(fmt))
                fmt = fmt.replace(RegExp.$1, (t.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (let k in o)
                if (new RegExp("(" + k + ")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k].toString()) : (("00" + o[k]).substr(o[k].toString().length)));
            return fmt;
        }
        catch (e) {
            return t.toString();
        }
    };
    dateHp.diff = (beginDate, endDate, type = 'ms') => {
        let startTime, endTime, timespan = 0;
        try {
            startTime = beginDate.getTime();
            endTime = endDate.getTime();
            if (type == 'd') {
                timespan = (endTime - startTime) / (1000 * 60 * 60 * 24);
            }
            else if (type == 'h') {
                timespan = (endTime - startTime) / (1000 * 60 * 60);
            }
            else if (type == 'm') {
                timespan = (endTime - startTime) / (1000 * 60);
            }
            else if (type == 's') {
                timespan = (endTime - startTime) / (1000);
            }
            else if (type == 'ms') {
                timespan = endTime - startTime;
            }
            return timespan;
        }
        catch (e) {
            return NaN;
        }
    };
    dateHp.nowDateFormat = (fmt) => {
        return dateHp.format(new Date(), fmt ? fmt : 'yyyy-MM-dd');
    };
    dateHp.getMaxDaysOfDate = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };
    (function (weekDayTypeEnum) {
        weekDayTypeEnum[weekDayTypeEnum["en"] = 0] = "en";
        weekDayTypeEnum[weekDayTypeEnum["en_simple"] = 1] = "en_simple";
        weekDayTypeEnum[weekDayTypeEnum["cn_zhou"] = 2] = "cn_zhou";
        weekDayTypeEnum[weekDayTypeEnum["cn_xingQi"] = 3] = "cn_xingQi";
    })(dateHp.weekDayTypeEnum || (dateHp.weekDayTypeEnum = {}));
    var weekDayTypeEnum = dateHp.weekDayTypeEnum;
    const weekData = [
        ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'],
        ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
        ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    ];
    dateHp.getWeekDay = (date, type = 3) => {
        const weekDay = date.getDay();
        return weekData[type][weekDay];
    };
})(dateHp || (dateHp = {}));
