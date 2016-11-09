### react-native-dynamic-picker 
------------
**I am so sorry.Now only the Chinese document.
The English document will be updated in the near future.
Please stay tuned.**
# Introduction
基于 **react-native** 原生组件 **Picker** 。支持多级联动，如 **“省-市-区”** 三级联动。
包内置有 **DateTimePicker**，该组件是 **react-native-dynamic-picker** 的一个扩展，可用于选择 “年-月-日-时-分-秒”。

注：在该文档下面的内容中，除非特别注明，否则 **Picker** 都指代 **react-native-dynamic-picker**

IOS效果图(IOS Demo Screenshot): [点击查看(click)](https://raw.githubusercontent.com/xiaocaibird/react-native-dynamic-picker/master/readme/img/ios.png "点击查看(click)")

Android效果图(Android Demo Screenshot): [点击查看(click)](https://raw.githubusercontent.com/xiaocaibird/react-native-dynamic-picker/master/readme/img/android1.jpeg "点击查看(click)")  [点击查看(click)](https://raw.githubusercontent.com/xiaocaibird/react-native-dynamic-picker/master/readme/img/android2.jpeg "点击查看(click)")

# Install

#### lastest version: 1.0.2

```shell
npm install --save react-native-dynamic-picker
```

# Example


```javascript
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Picker, DateTimePicker } from 'react-native-dynamic-picker';

export default class Example extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Picker data={this.props.list} title='选择' branchTitles={['选项']} />
                <Picker isDynamic={true}  data={this.props.areaList} title='选择地区' branchTitles={['省', '市', '区']} />
                <DateTimePicker title='选择日期' type={DateTimePicker.type.date} />
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    }
	})
```
#### data说明：

------------


######  当 isDynamic 为true时


            data 为一个 "item List"(即[item,item,item...]) ,该 List  是 Picker 第一列要显示的数据，
			
			item的数据结构如下:
            		{
                        value: string, //值
                        lable: string,  //显示的文本
                        children: item[]  //子节点
                        mustGetNewChildrenEveryTime: boolean  //当设置getChildrenFuns(参阅参数说明表)时，是否要每次都更新子节点，默认值false（注：没有 "动态数据绑定" 的开发需求的朋友，可以不用理会该值）
            		}
    		样例数据：[
    			{
    				value:'100',
    				lable:'山东省',
    				children:[
    								{
    									value:'110',
    									lable:'济宁市',
    									children:[
    													{
    														value:'111',
    														lable:'市中区',
    														children:undefined 
    													},
    													{
    														value:'112',
    														lable:'任城区',
    														children:undefined 
    													}
    												]
    								},
    								{
    									value:'120',
    									lable:'德州市',
    									children:...
    								}
    							]
    			},
    			{
    				value: '200',
    				lable: '山西省',
    				children: [
          				...
        				]
      			},
				...
    		]


------------


######  当 isDynamic 为false时


    data 为一个二维数组 [[item,item...],[item,item...],[item,item...],...],其中每一个[item,item,...] 生成一列数据。
	
	item数据结构如下：
    			 {
                        value: string, //值
                        lable: string,  //显示的文本
    			}
    
    样例数据：
    		[
    			[
    			     {
    				 	value:'00',
    					lable:'00时'
    				 },
    				 {
    				 	value:'01',
    					lable:'01时'
    				 },
    				 {
    				 	value:'02',
    					lable:'02时'
    				 },
    				 ...
    			],
    			[
    			     {
    				 	value:'00',
    					lable:'00分'
    				 },
    				 {
    				 	value:'01',
    					lable:'01分'
    				 },
    				 {
    				 	value:'02',
    					lable:'02分'
    				 },
    				 ...
    			]
    		]


####  DateTimePicker 使用说明

    DateTimePicker 是基于 Picker 扩展并封装好的一个 datetime picker。支持 '年-月-日-时-分-秒' 全部或部分选择。具体效果可自己切换不同的  type  来体验。
    
    type的值为  DateTimePicker.type  中的一个，取值如下
     {
        datetime,
        date,
        year_month,
        month_day_time,
        month_day,
        day_time,
        time
    }
    


# Picker Parameters
#### 注： 只有data是必需参数，其它参数都有预设值。但请注意 isDynamic 和  data 的关系

| 参数名  |  作用  |  说明   | 
| :------------: | :------------: | :------------: |
|  isDynamic | 是否联动(boolean)   | 当 isDynamic 为true时为联动。默认为false。建议在使用时总是指定isDynamic   |
| data  | 绑定的数据([item,item,...] 或[[item,item...],[item,item...],...] )  |  根据 isDynamic 的值不同,data要求的格式也不一样。详情请参阅  **Example**  |
|  title |  Picker的标题(string) |   |
| titleStyle  | title的样式(TextStyle)  |   |
|  branchTitles | 每一列的小标题(string List)  | 如[省、市、区]  |
| branchTitleStyle  | 每一列的小标题的样式(TextStyle List 或 TextStyle)  |  传入List可控制每一个列标题的样式，或传入一个 TextStyle 控制所有列标题的样式 |
|branchPickersStyles | 控制每一个 react-native 原生Picker的样式(ViewStyle List 或 ViewStyle) | 传入List可控制每一个react-native 原生Picker，传入一个可统一控制。对于react-native 原生Picker的样式控制请参阅 react-native 的文档 |
|branchPickersItemStyles(only IOS) | 控制每一个 react-native 原生Picker.Item的样式(TextStyle List 或 TextStyle) | 仅适用IOS |
|  topInfoStyle | Picker顶部提示信息的样式(TextStyle) |   |
|  topInfoCreateFun |  Picker顶部提示信息的生成函数(function)  |  每次选项变化时调用该函数，根据当前选择的值生成对应的信息。该函数可获取到一个参数 **selectItems**，是当前所有被选中的项，该函数最后必需返回一个string。生成的值如：***当前日期为2011年1月1日 周五*** 。 |
| buttonStyle | 底部button样式(TextStyle) | |
| okButtonText | 确认按钮的文本(string)| 默认为'确定' |
|cancelButtonText|取消按钮的文本(string)| 默认为'取消' |
|okCallBack|点击确认按钮后的回调函数(function)| 传递两个参数selectValues和selectItems，分别为当前选中的所有值和当前选中的所有选项|
|cancelCallBack|点击取消按钮后的回调函数(function)|传递两个参数selectValues和selectItems，分别为当前选中的所有值和当前选中的所有选项|
|colunmMax|每一行有多少列(number)| 默认值为3。当传入的data使生成的Picker的列数大于colunmMax时，Picker会自动换行。如当传入的data会生成'年-月-日-时-分' 五列数据时，如果colunmMax为3，则 '年-月-日' 会单独显示一行，而 '时-分' 会排列到一下行 |
| defaultSelectValues| 初始化时默认选中的值(string List)||
|defaultValueButtonShow| 是否显示 '默认值' 按钮(boolean) |  点击该按钮可让Picker切换到一个默认值，如果指定了getDefaultSelectValuesFun则调用getDefaultSelectValuesFun，否则切换到 defaultSelectValues 匹配的值 |
|defaultValueButtonText| '默认值' 按钮的文本(string) ||
|getDefaultSelectValuesFun| 当点击'默认值' 按钮时的回调函数(function) | 该函数必需返回一个SelectValues List, 以使 Picker 选择到对应的默认值 |
|pressMaskLayerToHide| 点击半透背景时是否关闭Picker(boolean) | 默认值为false |
|getChildrenFuns| 动态获取children的函数List(function List) | 这是一个函数列表，即[fun,fun,fun...]，其中每一个fun对应Picker的一列。   isDynamic  为true时, 如果设置了getChildrenFuns ，当切换到一个没有 children 的 item时 , Picker会根据该item所在的列，自动调用对应的 getChildrenFun 来获取 children。每一个 getChildrenFun 会得到两个参数,selectItems（当前被选中的所有项）,index(当前选中项所在的列)。getChildrenFun 必需返回一个 item List 。*注：当设置了 getChildrenFuns 并且某个item设置了 mustGetNewChildrenEveryTime 为true，那么每一次选中该item时，item总是会调用对应的 getChildrenFun 动态获取children，如果 mustGetNewChildrenEveryTime 没有设置或为false，则只有当 children 为undefined或null 时才会调用getChildrenFun*  |


# DateTimePicker  Parameters

#### 所有  **Picker** 的 Parameters  在 **DateTimePicker** 中也是有效的，但如果没有特殊需求，请使用默认的  **Picker** 参数。

**注：DateTimePicker 的所有  Parameters 均有预设值。**

| 参数名  |  作用  |  说明   | 
| :------------: | :------------: | :------------: |
|type|设置类型(DateTimePicker.type) |  DateTimePicker.type 的取值有 {    datetime,    date,    year_month,   month_day_time,    month_day,    day_time,    time}   |
| minYear | 最小年份(number) ||
| maxYear| 最大年份(number)||
|showNowDay|是否显示“今天”按钮(boolean)||
|showSecond|是否显示“秒”(boolean)||
|unitTexts|单位列表(string List)| 默认值为：['年', '月', '日', '时', '分', '秒'] |
|showWeek|是否显示“星期X”(boolean)||
|weekTextType|“星期X”的显示类型(DateTimePicker.weekTextType)|  DateTimePicker.weekTextType 的取值{        en, en_simple, cn_zhou, cn_xingQi    } |

# Last

第一次发布开源组件，不足的地方很多，我会加紧完善的。
自己做的小东西也不少，也早就想把一些自己觉得还可以的东西分享给大家。但工作一直挺忙，开源组件的质量把控和文档（尤其是英文的文档，想到就头痛）的维护又确实是一件很费神的事，所以就一拖再拖。最近我终于下定决心，不能再自己闭门造车了，要开始为咱们的开源社区添砖加瓦了，所以把这个我之前用typescript写的react-native组件发布出来。我在开发第一个react-native项目时，遇到了“省-市-区”三级联动的问题，在社区里找了一天也没有很合适的组件，于是我决定自己码一个出来。我自己用起来觉得还行，为了发布出来我又做了一些改进。希望大家能喜欢。

有问题请给我留言。

#### 最后的最后：Enjoy It