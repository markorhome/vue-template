
const upColor = ['#F7C6CC', '#F55459'];
const downColor = ['#ADDFBB', '#00A622'];
import * as echarts from "echarts";
import {numAbb} from '../utils'

export const bubbleData = [
    [

      [520, 45, 70, 'Canada'], // 中间


      [330, 20, 40, '左最小'], // 左边大小40的最小值 x-[250,350]  y
      [380, 75, 40, '左最大'], // 左边大小40的最大值
      [750, 20, 40, '右最大'], // 右边大小40的最大值 x-[800,900] 
      [720, 70, 40, '右最小'], // 右边大小40的最小值

      [130, 79, 20, '2左最小'], // 左边大小20的最小值 x-[20,150] 
      [240, 50, 20, '2左最大'], // 左边大小20的最大值 

      [60, 10, 20, '3左最小'], // 左边大小20的最小值 x-[250,350]  y
      [50, 40, 20, '3左最大'], // 左边大小20的最大值
      [75, 63, 20, '4左最小'], // 左边大小20的最小值 x-[20,150] 
      [140, 26, 20, '4左最大'], // 左边大小20的最大值 

      [900, 79, 20, '2右最小'], // 右边大小20的最小值 x-[20,150] 
      [1000, 59, 20, '2右最大'], // 右边大小20的最大值 
      [930, 15, 20, '3右最小'], // 右边大小20的最小值 x-[20,150] 
      [830, 39, 20, '3右最大'], // 右边大小20的最大值 
    ]
  ];
export let bubbleOption = {
    backgroundColor: {
        type: 'radial',
        x: 0.5,
        y: 0.5,
        r: 0.4,
        colorStops: [{
            offset: 0.1, color: '#ededfa' // 0% 处的颜色
        }, 
        {
            offset: 0.8, color: '#f4f4fd' // 100% 处的颜色
        },
        {
            offset: 0.9, color: '#f9f9fe' // 100% 处的颜色
        }],
        global: false // 缺省为 false
    },
    grid: {
        left: '2%',
        top: '12%',
        right: '6%',
        bottom: '2%'
    },
    xAxis: {
        axisTick: {
            show: false
        },
        axisLine: {
            show: false
        },
        splitLine: {
            show: false
        }
    },
    yAxis: {
        axisTick: {
            show: false
        },
        axisLine: {
            show: false
        },
        splitLine: {
            show: false
        },
        scale: true
    },
    series: [
        {
            data: [[1000, 80, 0, ''],[1000, 0, 0, '']],
            type: 'scatter',
            symbolSize: 0
        },
        {
            name: '上升',
            data: bubbleData[0],
            type: 'scatter',
            symbolSize: function (data) {
              return data[2];
            },
            label: {
                show: true,
                color: '#333',
                formatter: function(value) {
                    return value.data[3]
                }
            },
            emphasis: {
                focus: 'series',
                label: {
                  show: true,
                  formatter: function (param) {
                    return param.data[4];
                  },
                }
              },
            itemStyle: {
              borderColor: '#F7C6CC',
              borderWidth: '4',
              color: '#F55459'
            }
          },
          {
            name: '下降',
            data: bubbleData[1],
            type: 'scatter',
            symbolSize: function (data) {
              return data[2];
            },
            label: {
                show: true,
                color: '#333',
                formatter: function(value) {
                    return value.data[3]
                }
            },
            emphasis: {
                focus: 'series',
                label: {
                  show: true,
                  formatter: function (param) {
                    return param.data[4];
                  },
                }
              },
            itemStyle: {
              borderColor: 'rgba(0, 166, 34, 0.3)',
              borderWidth: '4',
              color: '#00A622'
            }
          }
    ]
}

export let hotLineOption = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        },
        formatter: function(param, ticket, callback){

            return `<div class="tipbox" style="font-size:0.28rem">
                <div style="color: #636777;margin-bottom: 0.12rem">${param[0].axisValue}</div>
                <div style="color: #0886FF">
                    <span  style="display: inline-block;width: 0.84rem; margin-right: 0.63rem;">${param[0].seriesName}</span>
                    <span>${param[0].value ? param[0].value:''}</span>
                </div>
                <div  style="color: #FF1626">
                    <span style="display: inline-block;width: 0.84rem; margin-right: 0.63rem;">${param[1] ? param[1].seriesName: ''}</span>
                    <span>${param[1].value ? param[1].value + (param[1].seriesName!='上证指数'&&param[1].seriesName!='融券余额'?'%':'') : ''}</span>
                </div>
            </div>`
        }
    },
    grid: {
        left: '13%',
        top: '26%',
        right: '13%',
        bottom: '12%'
    },
    legend: {
        data: ['两融余额', '日变动'],
        show: true,
        itemGap: 85,
        itemWidth: 16,
        itemHeight: 2,
        icon: "rect",
        textStyle: {
            fontSize: 14,
            color: '#636777',
            fontFamily: 'PingFangSC-Medium, PingFang SC'
        }
    },
    xAxis:{
        type: 'category',
        // 坐标轴刻度
        axisTick: {
            show: false
        },
        data: [],
        axisLine: {
            show: false
        },
        splitLine: {
            show: false
        },
        axisLabel: {
            margin: 18,
            interval: 5
        }
    }, 
    yAxis: [
        {
            type: 'value',
            position: 'left',
            axisPointer: {
                show: false
            },
            scale: true,
            splitNumber: 4,
        },
        {
            type: 'value',
            position: 'right',
            axisTick: {
                show: false
            },
            scale: true,
            splitNumber: 3,
            splitLine: {
                show: false
            },
            axisLabel: {
                formatter: '{value}'
            }
        }
    ],
    series: [
        {
            name: '两融余额',
            type: 'line',
            color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [{
                    offset: 0, color: '#47CAFF ' // 0% 处的颜色
                }, {
                    offset: 1, color: '#007DFF ' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              },
            yAxisIndex: 0,
            smooth: true,
            symbol: 'none',
            data: [],
        },
        {
            name: '上证指数',
            type: 'line',
            color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [{
                    offset: 0, color: '#FFB000 ' // 0% 处的颜色
                }, {
                    offset: 1, color: '#FF022A ' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              },
            yAxisIndex: 1,
            smooth: true,
            symbol: 'none',
            data: [],
        },
    ]
}

export let bubbleLineOpt = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        },
        formatter: function(param, ticket, callback){

            if(param.seriesType == 'scatter') {
                return `<div style="font-size:0.28rem">
                <span style="color: #F55459">对策: </span>
                <span>LP老师针对行情预判，提前布局<span>
                <span style="color: #F55459">XX股票<span>
                <span style="color: #F55459">+7%<span>
                </div>`
            } else {

                return `<div class="tipbox" style="font-size:0.28rem">
                    <div style="color: #636777;margin-bottom: 0.12rem">${param[0].axisValue}</div>
                    <div style="color: #FF1626">
                        <span  style="display: inline-block;width: 0.84rem; margin-right: 0.63rem;">${param[0].seriesName}</span>
                        <span>${param[0].value.toFixed(2)}</span>
                    </div>
                    <div  style="color: #0886FF">
                        <span style="display: inline-block;width: 0.84rem; margin-right: 0.63rem;">${param[1] ? param[1].seriesName: ''}</span>
                        <span>${param[1] ? param[1].value : ''}</span>
                    </div>
                </div>`
            }

        }
    },
    legend: {
        data: ['收盘价', '热度'],
        itemGap: 85,
        itemWidth: 16,
        itemHeight: 2,
        icon: "rect",
        textStyle: {
            fontSize: 14,
            color: '#636777',
            fontFamily: 'PingFangSC-Medium, PingFang SC'
        }
    },
    grid: [
        {
          left: '12%',
          right: '8%',
          top: 20,
          height: 50
        },
        {
            left: '12%',
            top: '24%',
            right: '8%',
            bottom: '12%'
        }
      ],
    xAxis: [
        {
            type: 'category',
            gridIndex: 1,
            // 坐标轴刻度
            axisTick: {
                show: false
            },
            data: [],
            axisLine: {
                show: false
            },
            splitLine: {
                show: false
            },
            axisLabel: {
                margin: 18,
                interval: 5
            }
        },
        {
            type: 'category',
            gridIndex: 0,
            boundaryGap: false,
            splitLine: { show: false },
            axisLabel: { show: false },
            axisTick: { show: false },
            axisLine: { show: false },
            min: 'dataMin',
            max: 'dataMax',
          }
    ],
    yAxis: [
        {
            type: 'value',
            position: 'left',
            // axisLabel: {
            //     formatter: function (value, index) {
            //         return numAbb(value);
            //     }
            // },
            axisPointer: {
                show: false
            },
            scale: true,
            splitNumber: 4,
            gridIndex: 1,
        },
        {
            type: 'value',
            position: 'right',
            // axisLabel: {
            //     formatter: '{value}'
            // },
            axisTick: {
                show: false
            },
            scale: true,
            splitNumber: 4,
            splitLine: {
                show: false
              },
              gridIndex: 1,
        },
        {
            scale: true,
            gridIndex: 0,
            splitNumber: 2,
            axisLabel: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: false }
          }
    ],
    series: [
        {
            name: '收盘价',
            type: 'line',
            color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [{
                    offset: 0, color: '#FFB000 ' // 0% 处的颜色
                }, {
                    offset: 1, color: '#FF022A ' // 100% 处的颜色
                }],
                global: false // 缺省为 false
            },
            yAxisIndex: 0,
            xAxisIndex: 0,
            smooth: true,
            symbol: 'none',
            data: [],
            markPoint: {
                symbolSize: 0,
                data: []
            }
        },
        {
            name: '热度',
            type: 'line',
            color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                    offset: 0, color: '#47CAFF ' // 0% 处的颜色
                }, {
                    offset: 1, color: '#007DFF ' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              },
            yAxisIndex: 1,
            xAxisIndex: 0,
            smooth: true,
            symbol: 'none',
            data: [],
        },
        {
            symbolSize: 8,
            color: '#F55459',
            data: [380,'','','','',380,380],
            type: 'scatter',
            xAxisIndex: 1,
            yAxisIndex: 2,
            tooltip: {
                trigger: 'item',
                position: [6, -10]
            }
        }
    ]
}