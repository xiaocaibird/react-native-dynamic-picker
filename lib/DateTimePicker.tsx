import * as React from 'react';
import {
    Picker,
} from './Picker';
import { baseNativeComponent } from './Component';
import { componentHp, dateHp, objHp } from './helper';

type props = tNativeComponent.Picker.props & {
    type?: DateTimePickerType,
    minYear?: number,
    maxYear?: number,
    showNowDay?: boolean,
    showWeek?: boolean,
    showSecond?: boolean,
    unitTexts?: string[],
    weekTextType?: dateHp.weekDayTypeEnum,
};
type state = tCommon.reactState;

enum DateTimePickerType {
    datetime,
    date,
    year_month,
    month_day_time,
    month_day,
    day_time,
    time
}

export class DateTimePicker extends baseNativeComponent<props, state>  {
    static type = DateTimePickerType;
    static weekTextType = dateHp.weekDayTypeEnum;

    private yearsData: tNativeComponent.Picker.dynamicData = [];
    private monthsData: tNativeComponent.Picker.dynamicData = [];
    private daysData28: tNativeComponent.Picker.dynamicData = [];
    private daysData29: tNativeComponent.Picker.dynamicData = [];
    private daysData30: tNativeComponent.Picker.dynamicData = [];
    private daysData31: tNativeComponent.Picker.dynamicData = [];
    private hoursData: tNativeComponent.Picker.dynamicData = [];
    private minutesData: tNativeComponent.Picker.dynamicData = [];
    private secondsData: tNativeComponent.Picker.dynamicData = [];

    constructor(props: props) {
        super();
        this.initData(props);
    }

    private initData(props: props) {
        const {minYear = 1980, maxYear = 2050, unitTexts = ['年', '月', '日', '时', '分', '秒']} = props;
        this.yearsData = getYearsData(minYear, maxYear, unitTexts[0]);
        this.monthsData = getMonthsData(unitTexts[1]);

        this.daysData28 = getDaysData(unitTexts[2], 28);
        this.daysData29 = getDaysData(unitTexts[2], 29);
        this.daysData30 = getDaysData(unitTexts[2], 30);
        this.daysData31 = getDaysData(unitTexts[2], 31);

        this.hoursData = getHoursData(unitTexts[3]);
        this.minutesData = getMinutesData(unitTexts[4]);
        this.secondsData = getSecondsData(unitTexts[5]);
    }
    showPicker(show: boolean) {
        (this.refs['Picker'] as Picker).showPicker(show);
    }
    componentWillReceiveProps(nextProps: props) {
        if (objHp.isEqual(this.props, nextProps)) {
            return;
        }
        this.initData(nextProps)
    }
    render() {
        const {type = DateTimePickerType.date, showSecond = false} = this.props;

        let data: tNativeComponent.Picker.dynamicData | tNativeComponent.Picker.branchPickers = [];
        let getChildrenFuns: ((selectItem: tNativeComponent.Picker.dynamicData, index: number) => tNativeComponent.Picker.dynamicData)[] = [];
        let isDynamic = false;
        let colunmMax = 3;

        let timesGetChildrenFuns = showSecond ? [this.getHours, this.getMinutes, this.getSecond] : [this.getHours, this.getMinutes];

        if (type == DateTimePickerType.date) {
            data = this.yearsData;
            getChildrenFuns = [this.getMonths, this.getDays];
            isDynamic = true;
        }
        else if (type == DateTimePickerType.datetime) {
            data = this.yearsData;
            getChildrenFuns = [this.getMonths, this.getDays].concat(timesGetChildrenFuns);
            isDynamic = true;
        }
        else if (type == DateTimePickerType.month_day_time) {
            data = this.monthsData;
            getChildrenFuns = [this.getDays].concat(timesGetChildrenFuns);
            isDynamic = true;

            colunmMax = 2;
        }
        else if (type == DateTimePickerType.month_day) {
            data = this.monthsData;
            getChildrenFuns = [this.getDays];
            isDynamic = true;
        }
        else {
            const times = showSecond ? [this.hoursData, this.minutesData, this.secondsData] : [this.hoursData, this.minutesData];
            switch (type) {
                case DateTimePickerType.year_month:
                    data = [this.yearsData, this.monthsData];
                    break;
                case DateTimePickerType.day_time:
                    data = [this.daysData31].concat(times)
                    break;
                case DateTimePickerType.time:
                    data = times;
                    break;
                default:
                    data = [this.yearsData, this.monthsData];
            }
        }

        const topProps = componentHp.createTopProps({
            topInfoCreateFun: this.topInfoCreateFun,
            getDefaultSelectValuesFun: this.getDefaultSelectValuesFun,
            data: data,
            getChildrenFuns: getChildrenFuns,
            isDynamic: isDynamic,
            colunmMax: colunmMax,
            ref: 'Picker',
            defaultSelectValues: this.getDefaultSelectValuesFun()
        });
        return <Picker {...defaultProps} {...this.props} {...topProps} />
    }

    private topInfoCreateFun = (selectItems: tNativeComponent.Picker.dynamicData) => {
        try {
            const {type = DateTimePickerType.date, weekTextType = dateHp.weekDayTypeEnum.cn_xingQi, showWeek = false } = this.props;

            let text = ''
            selectItems.forEach(
                (v, i) => {
                    text += v.lable;
                    if (showWeek && i == 2) {
                        if (type == DateTimePicker.type.datetime) {
                            text += '(' + dateHp.getWeekDay(new Date(parseInt(selectItems[0].value), parseInt(selectItems[1].value), parseInt(selectItems[2].value)), weekTextType) + ') ';
                        }
                        else if (type == DateTimePicker.type.date) {
                            text += '(' + dateHp.getWeekDay(new Date(parseInt(selectItems[0].value), parseInt(selectItems[1].value), parseInt(selectItems[2].value)), weekTextType) + ')';
                        }
                    }
                }
            );
            return text;

        }
        catch (e) {
            return null
        }
    }

    private getDefaultSelectValuesFun = () => {
        const {type = DateTimePickerType.date, showSecond = false} = this.props;
        const date = new Date();

        const times = showSecond ? [date.getHours().toString(), date.getMinutes().toString(), date.getSeconds().toString()] : [date.getHours().toString(), date.getMinutes().toString()];

        switch (type) {
            case DateTimePicker.type.date:
                return [date.getFullYear().toString(), date.getMonth().toString(), date.getDate().toString()]
            case DateTimePicker.type.datetime:
                return [date.getFullYear().toString(), date.getMonth().toString(), date.getDate().toString()].concat(times);
            case DateTimePickerType.year_month:
                return [date.getFullYear().toString(), date.getMonth().toString()]
            case DateTimePickerType.month_day_time:
                return [date.getMonth().toString(), date.getDate().toString()].concat(times);
            case DateTimePickerType.month_day:
                return [date.getMonth().toString(), date.getDate().toString()]
            case DateTimePickerType.day_time:
                return [date.getDate().toString()].concat(times);
            case DateTimePickerType.time:
                return times;
            default:
                return [date.getFullYear().toString(), date.getMonth().toString()]
        }
    }

    private getMonths = () => {
        return this.monthsData
    }
    private getDays = (selectItems: tNativeComponent.Picker.dynamicData = [], index: number = 0) => {
        try {
            const yearItem = selectItems[index - 1];
            let year = 2008;
            if (yearItem) {
                year = parseInt(yearItem.value);
            }
            if (isNaN(year)) {
                year = 2008;
            }

            const monthItem = selectItems[index];
            let month = 0;
            if (monthItem) {
                month = parseInt(monthItem.value);
            }
            if (isNaN(month)) {
                month = 0;
            }

            const maxDay = dateHp.getMaxDaysOfDate(new Date(year, month, 1));

            switch (maxDay) {
                case 28:
                    return this.daysData28;
                case 29:
                    return this.daysData29;
                case 30:
                    return this.daysData30;
                case 31:
                default:
                    return this.daysData31;
            }
        }
        catch (e) {
            return this.daysData31;
        }
    }
    private getHours = () => {
        return this.hoursData
    }
    private getMinutes = () => {
        return this.minutesData
    }
    private getSecond = () => {
        return this.secondsData
    }
}

const getYearsData = (minYear: number = 1980, maxYear: number = 2050, yearText = '年') => {
    const data: tNativeComponent.Picker.dynamicData = [];

    for (let i = minYear; i <= maxYear; i++) {
        data.push(
            {
                value: i.toString(),
                lable: i + yearText,
                mustGetNewChildrenEveryTime: true
            }
        );
    }

    return data;
}

const getMonthsData = (monthText = '月') => {
    const data: tNativeComponent.Picker.dynamicData = [];

    for (let i = 1; i <= 12; i++) {
        data.push(
            {
                value: (i - 1).toString(),
                lable: i + monthText,
                mustGetNewChildrenEveryTime: true
            }
        );
    }

    return data;
}


const getDaysData = (dayText = '日', maxDay: number) => {
    const data: tNativeComponent.Picker.dynamicData = [];
    for (let i = 1; i <= maxDay; i++) {
        data.push(
            {
                value: i.toString(),
                lable: i + dayText,
                mustGetNewChildrenEveryTime: true
            }
        );
    }

    return data;
}

const getHoursData = (hourText = '时') => {
    const data: tNativeComponent.Picker.dynamicData = [];

    for (let i = 0; i <= 23; i++) {
        const v = (i < 10 ? '0' + i : i.toString()) + hourText;
        data.push(
            {
                value: i.toString(),
                lable: v,
                mustGetNewChildrenEveryTime: true
            }
        );
    }

    return data;
}

const getMinutesData = (minuteText = '分') => {
    const data: tNativeComponent.Picker.dynamicData = [];

    for (let i = 0; i <= 59; i++) {
        const v = (i < 10 ? '0' + i : i.toString()) + minuteText;
        data.push(
            {
                value: i.toString(),
                lable: v,
                mustGetNewChildrenEveryTime: true
            }
        );
    }

    return data;
}

const getSecondsData = (secondText = '秒') => {
    const data: tNativeComponent.Picker.dynamicData = [];

    for (let i = 0; i <= 59; i++) {
        const v = (i < 10 ? '0' + i : i.toString()) + secondText;
        data.push(
            {
                value: i.toString(),
                lable: v
            }
        );
    }

    return data;
}

const defaultProps: tNativeComponent.Picker.props = {
    title: '时间选择',
    isDynamic: true,
    defaultValueButtonText: '现在',
    defaultValueButtonShow: true
}
