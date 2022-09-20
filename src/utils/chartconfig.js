/**
 * hqchart 后台计算指标数据格式 @see https://blog.csdn.net/jones2000/article/details/109760530
 * 
 {
    Period              // 周期 0=日线 1=周线 2=月线 3=年线 9=季线 4=1分钟 5=5分钟 6=15分钟 7=30分钟 8=60分钟 11=120分钟 12=240分钟
    Right               // 复权 0 不复权 1 前复权 2 后复权
    Symbol              // 品种代码
    Date                // 指标数据日期数组, 数值型 格式YYYYMMDD
    Time                // 指标数据时间数组, 数值型 格式 HHMM
    OutVar:{            // 输出变量数组
        Name            // 变量名
        Data            // 变量数据 type=0
        Type            // 0=一般数据 1=绘图函数数据
        Attribute[]     // 1: 格式为COLOR+“BBGGRR”：BB、GG、RR表示蓝色、绿色和红色的分量，每种颜色的取值范围是00-FF，采用了16进制。
                                例如：MA5:MA(CLOSE,5)，COLOR00FFFF表示纯红色与纯绿色的混合色：COLOR808000表示淡蓝色和淡绿色的混合色。 
                        // 2: COLORBLACK 黑 色 COLORBLUE 蓝 色 COLORGREEN 绿 色 COLORCYAN 青 色 COLORYELLOW 黄 色 COLORWHITE 白 色 COLORBROWN 棕 色
                            COLORRED 红 色 COLORMAGENTA 洋 红 色 COLORLIGHTGRAY 淡 灰 色   COLORDARKGRAY 深 灰 色 COLORLIGHTBLUE 淡 蓝 色
                            COLORLIGHTGREEN 淡 绿 色 COLORLIGHTCYAN 淡 青 色 COLORLIGHTRED 淡 红 色 COLORLIGHTMAGENTA 淡洋红色
                        // 3: 格式“LINETHICK+(1-9)” 参数的取值范围在1—9之间，“LINETHICK1”表示最细的线，而“LINETHICK9”表示最粗的线
                        // 4: COLORSTICK 画上下柱子
                        // 5: CIRCLEDOT 画小圆圈点
                        // 6: DOTLINE 小圆点线
                        // 7: LINESTICK 同时画出柱状线和指标线
                        // 8: STICK 画柱状图
                        // 9: VOLSTICK 成交量柱状线 成交量柱状线。当股价上涨时显示红色空心柱，反之则显示绿色实心柱
                        // 10: NODRAW 不画该线
                        // 11: POINTDOT 
                        // 12: NONE_OUT_NAME  //不显示标题
        DrawType        //  绘图函数名 如果使用了绘图函数输出的数据
        Draw:{          // // 绘图函数数据
            DrawType
            DrawData
        }            
    }              
 }



*/

/** 
func
    1 -  画线   *
    2 -  绘制数字 *       
    3 -  绘制红绿柱状图 *
    4 -  绘制柱线 *
    5 -  是否输出左上角标题
    6 -  绘制垂直线 *
    7 -  绘制图标
    9 -  绘制文字 *
*/

var drawConfig = {
    formula_id: 22, // 公式Id
    graph: 1, // 主图为2 副图是1
    name: "MACD", // 指标名称
    period: 7, // 周期
    draw_items: [ // 绘图项目
        {
            color: 0, // 颜色
            end: "", // 结束标记
            field: "MACD", // 对应字段
            func: 3, // 绘图函数类型
            start: "", // 开始标记
            width: 1, // 宽度
        }
    ]
}
var outputs = ["DIFF", "DEA", "MACD"]
var getColor = function (number) {
    const alpha = number >> 24 & 0xff;
    const red = number >> 16 & 0xff;
    const green = number >> 8 & 0xff;
    const blue = number & 0xff;
    return `rgb(${red}, ${green}, ${blue})`;
}
var data = [{
        field: {
            DIFF: 68.25,
            DEA: 9,
            MACD: 0
        },
        time: 0,
        date: 20220510
    },
    {
        field: {
            DIFF: 71.945999,
            DEA: 8,
            MACD: 0
        },
        time: 0,
        date: 20220509
    },
    {
        field: {
            DIFF: 67.514999,
            DEA: 7,
            MACD: 0
        },
        time: 0,
        date: 20220506
    },
    {
        field: {
            DIFF: 63.4305,
            DEA: 6,
            MACD: 0
        },
        time: 0,
        date: 20220505
    },
    {
        field: {
            DIFF: 52.856998,
            DEA: 5,
            MACD: 0
        },
        time: 0,
        date: 20220429
    },
    {
        field: {
            DIFF: 44.047501,
            DEA: 4,
            MACD: 0
        },
        time: 0,
        date: 20220428
    },
    {
        field: {
            DIFF: 37.642502,
            DEA: 3,
            MACD: 0
        },
        time: 0,
        date: 20220427
    },
    {
        field: {
            DIFF: 35.563499,
            DEA: 2,
            MACD: 0
        },
        time: 0,
        date: 20220426
    },
    {
        field: {
            DIFF: 37.59,
            DEA: 1,
            MACD: 0
        },
        time: 0,
        date: 20220425
    }
]

/**
 * 画线
 * @param {string} fieldname 字段名称
 * @param {Array<Number>} data 数据
 * @description type = 1
 */

export var drawLine = function (fieldConfig, data) {
    if(!data||data.length==0) return
    var vdata = []
    data.forEach(item => {
        vdata.push(item.field[fieldConfig.field])
    })

    return {
        name: fieldConfig.field,
        type: 0,
        data: vdata,
        color: getColor(fieldConfig.color),
        linewidth: 'LINETHICK1'
    };
}
/**
 * 绘制数字和文字
 * @description type = 7
 * @param {string} fieldname 字段名称
 * @param {Array<Number>} data {
 *                Date: 20220623,
                  Time: 945,
                  Value: 14.5,
                  Text: "测试文字1",
                  Color: "rgb(0,255,50)"
                }
 */
export var drawText = function (fieldConfig, data) {
    var textdata = []
    console.log(fieldConfig.field,'fieldConfig.field');
    data.forEach(item => {
        if (item.field[fieldConfig.field] > 0) {
            textdata.push({
                Date: item.date,
                Time: item.time,
                Value: item.field[fieldConfig.start] != null ? item.field[fieldConfig.start] : 0,
                Text: fieldConfig.text,
                Color:getColor(fieldConfig.color) 
            })
        }else{
            textdata.push({
                Date: 0,
                Time: 0,
                Value: 0,
                Text: 0,
                Color:0,
            })
        }
    })

    return {
        name: "MULTI_TEXT",
        type: 1,
        Draw: {
            DrawType: "MULTI_TEXT",
            DrawData: textdata
        }
    }
}

export var drawNumber = function (fieldConfig, data) {
    var textdata = []
    data.forEach(item => {
        if (item.field[fieldConfig.field] > 0) {
            textdata.push({
                Date: item.date,
                Time: item.time,
                Value: item.field[fieldConfig.start],
                Text: item.field[fieldConfig.field],
                Color: getColor(fieldConfig.color)
            })
        }else{
            textdata.push({
                Date: 0,
                Time: 0,
                Value: 0,
                Text: 0,
                Color:0,
            })
        }
    })
    
    return {
        name: "MULTI_TEXT",
        type: 1,
        Draw: {
            DrawType: "MULTI_TEXT",
            DrawData: textdata
        }
    }
}
/**
 * 绘制图标
 * @description type = 2 | 9
 * @param {string} fieldname 字段名称
 * @param {Array<Number>} data {
 *                Date: 20220623,
                  Time: 945,
                  Value: 14.5,
                  Icon: "icon1"
                }
 */
export var drawIcon = function (fieldConfig, data) {
    console.log(data,fieldConfig.field,'drawIcon');
    var textdata = []
    data.forEach(item => {
        if (item.field[fieldConfig.field] > 0) {
            textdata.push({
                Date: item.date,
                Time: item.time,
                Value: item.field[fieldConfig.field],
                Text: fieldConfig.text,
                Color: fieldConfig.color
            })
        }
    })
    return {
        name: "ICON",
        type: 1,
        Draw: {
            DrawType: "ICON",
            DrawData: textdata
        }
    }
}

/**
 * 绘制红绿柱状图
 * @description type = 3
 * @param {string} fieldname 字段名称
 * @param {Array<Number>} data 数据
 */
export var drawColorStick = function (redfieldConfig, greenfieldConfig, data) {

    var fieldName = redfieldConfig.field
    var type = redfieldConfig.func
    if (type != 3) {
        console.error('当前不是红绿柱指标')
        return
    }

    var reddata = []
    var greendata = []
    data.forEach(item => {
        if (item.field[fieldName] >= 0) {
            reddata.push({
                value: item.field[fieldName],
                time: item.time,
                date: item.date
            })
        } else {
            reddata.push({
                value: 0,
                time: item.time,
                date: item.date
            })
        }
    })

    data.forEach(item => {
        if (item.field[fieldName] < 0) {
            greendata.push({
                value: item.field[fieldName],
                time: item.time,
                date: item.date
            })
        } else {
            greendata.push({
                value: 0,
                time: item.time,
                date: item.date
            })
        }
    })
    var redStick = []
    var greenStick = []
    redStick.push(this._drawStick(redfieldConfig, reddata))
    greenStick.push(this._drawStick(greenfieldConfig, greendata))


    var Stick = [...redStick, ...greenStick]
    console.log(Stick, '颜色');

    return Stick
}

/** 
 * 画柱状线
 * @description type = 4
 * @param {string} fieldname 字段名称
 * @param {Array<Number>} data {
              Date: item.Date,
              Value: item.Open,
              Value2: item.Close,
            }
 */

export var drawStick = function (fieldConfig, data) {
    // var type = fieldConfig.func
    // if (type != 4) {
    //     console.error('当前不是柱状线指标')
    //     return
    // }
    console.log(data,'drawStick');
    var stickdata = data.map(item => {
        if (item.field[fieldConfig.field] > 0) {
            return {
                Date: item.date,
                Value: item.field[fieldConfig.start] != null ? item.field[fieldConfig.start] : 0,
                Value2: item.field[fieldConfig.end] != null ? item.field[fieldConfig.end] : 0,
            }
        } else  {
            return {
                Date: 0,
                Value:  0,
                Value2:  0,
            }
        }
       
    })

    var stickline = {
        name: fieldConfig.name,
        type: 1,
        Draw: {
            Name: fieldConfig.name,
            Width: fieldConfig.width, //柱子宽度 0=1 3,50=k线宽度 101=K线宽度+间距宽度
            Type: 1, //柱子类型 0=实心 1=空心 -1=画虚线空心柱
            LineDotted: [3, 3], //  虚线设置
            DrawType: "STICKLINE",
            DrawData: stickdata,
        },
        color: getColor(fieldConfig.color)
    };
    data.forEach(item => {

    })
    return stickline
}


export var drawBS = function (fieldConfig, data) {
    console.log(data,'drawBS');
    var textdata = []
    data.forEach(item => {
        if (item.field[fieldConfig.field] > 0) {
            textdata.push({
                Date: item.date,
                Time: item.time,
                Value: item.field.DP,
                Text: fieldConfig.text,
                Color:getColor(fieldConfig.color) 
            })
        }else{
            textdata.push({
                Date: 0,
                Time: 0,
                Value: 0,
                Text: 0,
                Color:0,
            })
        }
    })

    return {
        name: "MULTI_TEXT",
        type: 1,
        Draw: {
            DrawType: "MULTI_TEXT",
            DrawData: textdata
        }
    }
}
export var _drawStick = function (fieldConfig, data) {
    var stickdata = data.map(item => {
        return {
            Date: item.date,
            Value: 0,
            Value2: item.value,
        }
    })

    var stickline = {
        name: fieldConfig.name,
        type: 1,
        Draw: {
            Name: fieldConfig.name,
            Width: 0, //柱子宽度 0=1 3,50=k线宽度 101=K线宽度+间距宽度
            Type: 1, //柱子类型 0=实心 1=空心 -1=画虚线空心柱
            LineDotted: [3, 3], //  虚线设置
            DrawType: "STICKLINE",
            DrawData: stickdata,
        },
        color: getColor(fieldConfig.color)
    };

    return stickline
}

/**
 * 画垂直线
 * @description type = 6
 * @param {string} fieldname 字段名称
 * @param {Array<Number>} data {
              Date: item.Date,
              Value: item.Open,
              Value2: item.Close,
            }
 */
export var drawVerticalLine = function (fieldConfig, data) {
    var type = fieldConfig.func
    if (type != 6) {
        console.error('当前不是垂直线指标')
        return
    }
    var drawInfo = this.drawStick(fieldConfig, data)
    drawInfo.Draw.Type = 0
    drawInfo.Draw.Width = 1

    return drawInfo
}