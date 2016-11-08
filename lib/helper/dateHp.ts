export namespace dateHp {
    export const format = (t: Date, fmt: string) => {
        try {
            const o: { [k: string]: number } = {
                "M+": t.getMonth() + 1,                 //月份   
                "d+": t.getDate(),                    //日   
                "h+": t.getHours(),                   //小时   
                "m+": t.getMinutes(),                 //分   
                "s+": t.getSeconds(),                 //秒   
                "q+": Math.floor((t.getMonth() + 3) / 3), //季度   
                "S": t.getMilliseconds()             //毫秒   
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
    }
    export const diff = (beginDate: Date, endDate: Date, type: string = 'ms') => {
        let startTime: number, endTime: number, timespan: number = 0;
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
            return timespan
        }
        catch (e) {
            return NaN
        }
    }

    export const nowDateFormat = (fmt?: string) => {
        return format(new Date(), fmt ? fmt : 'yyyy-MM-dd');
    }

    export const getMaxDaysOfDate = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    }

    export enum weekDayTypeEnum {
        en, en_simple, cn_zhou, cn_xingQi
    }

    const weekData = [
        ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'],
        ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
        ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    ];

    export const getWeekDay = (date: Date, type: weekDayTypeEnum = 3) => {
        const weekDay = date.getDay();
        return weekData[type][weekDay];
    }
}
