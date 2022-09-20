<template>
  <div class="chart-wrapper">
    <ul class="chart-btn-box">
        <li v-for="(item,index) of btnList" :key="index" :class="['chart_item',{chart_after: btnId==index}]" @click="checkKline(index,item.label)">{{item.label}}</li>
    </ul>
    <div class="Minte-box" v-show="minteShow">
        <div v-for="(item,index) of minteList" :key="index" class="border_1px" :class="{minteacite: minteId == item}" @click="checkKline(1000,item)">{{item}}</div>
    </div>
    <div class="chart-container">
        <div class="canvas" ref="minute" v-show="Minute.IsShow" style="height: 6rem"></div>
        <div class="canvas" ref="kline" v-show="Kline.IsShow" style="height: 6rem"></div>
        <div class="right-detail" v-if="btnId==0||btnId==3&&minteShow">
            <div class="detail-btn">
                <span :style="{color: hawkingIndex==0?'red':'none'}">五档</span>
                <span :style="{color: hawkingIndex==1?'red':'none'}">明细</span>
            </div>
            <ul class="right-list">
                <li v-for="(item,index) of list" :key="index" class="minte-item">
                    <template v-if="hawkingIndex==0">
                        <span>{{item.iTime|formatDate}}</span><span>{{item.fNowPrice|fixed2}}</span><span>{{item.uiNowVol}}</span>
                    </template>
                    <template v-else>
                        <span>{{item.iTime|formatDate}}</span><span>{{item.fNowPrice|fixed2}}</span><span>{{item.uiNowVol}}</span>
                    </template>
                </li>
            </ul>
        </div>
    </div>
    <div class="vbtns">
        <div v-for="(item,index) of iconList" :key="index" class="btn-item">
            <img :src="item" alt="">
        </div>
    </div>
    <van-button type="primary" @click="checkIndex('MACD')">MACD指标</van-button>
    <van-button type="primary" @click="checkIndex('KDJ')">KDJ指标</van-button>
    <van-button type="primary" @click="checkIndex('VOL')">VOL指标</van-button>
  </div>
</template>

<script>
import back from '../../assets/image/godetail.png'
var that
import $ from 'jquery'
import { DefaultData, NetworkFilter } from './chart'
import HQChart from 'hqchart'
import 'hqchart/src/jscommon/umychart.resource/css/tools.css'
import 'hqchart/src/jscommon/umychart.resource/font/iconfont.css'

import bus from '../../common/bueEvent'

// HQChart.Chart.JSChart.SetDomain('https://prx.upchina.com/json/hq_marketdata/tickData');
// HQChart.Chart.JSComplier.SetDomain('https://prx.upchina.com/json/hq_marketdata/tickData');

// HQChart.Chart.MARKET_SUFFIX_NAME.GetMarketStatus = function (symbol) 
// {
//      return 2; //一直交易
//  }
var resource=HQChart.Chart.HQChartStyle.GetStyleConfig(HQChart.Chart.STYLE_TYPE_ID.BLACK_ID); //黑色风格
HQChart.Chart.JSChart.SetStyle(resource);
import {time_range} from '../../utils'

var Idx_Trans = require('../../utils/chartconfig')



export default {
    data() {
        return {
            btnId: 0,
            hawkingIndex: 0,
            list: [],
            iconList: [back,back,back,back,back],
            Symbol:'605577.sh',
            Minute:{
                JSChart:null,
                IsShow:true,
                Option:DefaultData.GetMinuteOption(),             
            },
            Kline:{
                JSChart:null,
                IsShow:false,
                Option: DefaultData.GetKLineOption()
            },
            sell: [],
            buy: [],
            indicatorsList:[],
            figureIndicatorsList: [],
            DivIndexTitle: [],
            minteList: ['5分钟','15分钟','30分钟','60分钟'],
            minteId: '',
            minteShow: false,
            btnList: [
                {
                    label: '分时',
                    type: 'Minute'
                },
                {
                    label: '日线',
                    type: 'KLine'
                },
                {
                    label: '周线',
                    type: 'KLine'
                },
                {
                    label: '分钟',
                    type: 'KLine'
                }
            ]
        }
    },
    created() {},
    mounted() {

        this.ChangeMinutePeriod(1)

        this.timer = setInterval(this.getTickData,2000)
   
        this.getTickData()
        this.getIndexList()
    },
    methods: {
        ChangeKLinePeriod(period) {
            
            if (!this.Kline.JSChart) {
                this.Kline.Option.KLine.Period=period;
                this.CreateKLineChart();
            } else {
                this.Kline.JSChart.ChangePeriod(period);
            }
        },
        ChangeMinutePeriod(period)
            {
              if (!this.Minute.JSChart)   //不存在创建
              {
                this.Minute.Option.DayCount=period;
                this.CreateMinuteChart();
              }
              else
              {
                this.Minute.JSChart.ChangeDayCount(period);
              }
            },
        chartone() {
            switch(this.btnId) {
                case 0: this.ChangeMinutePeriod(1)
                    break
                case 1: this.ChangeKLinePeriod()
                    break
                case 2: this.ChangeKLinePeriod()
                    break
                case 3: this.ChangeKLinePeriod()
                    break
                case 4: this.ChangeKLinePeriod()
                    break
            }
        },
        ClearHQChart() {
            if (this.Minute.JSChart) {
                console.log('qingchu')
                this.Minute.JSChart.StopAutoUpdate();
                this.Minute.JSChart = null;
                clearInterval(this.timer)
            }
        },
        CreateMinuteChart() {
            if (this.Minute.JSChart) return;
        
            HQChart.Chart.JSChart.SetStyle({
                // Minute:{                  
                //     VolBarColor: null,
                //     PriceColor: "rgb(25,180,231)",
                //     AvPriceColor: "rgb(255,236,0)"
                // },
                // FrameBorderPen:'rgba(236,236,236,0.13)',
                // MultiDayBorderPen:'rgba(236,236,236,0.13)',
                // FrameSplitPen:'rgba(236,236,236,0.13)',
                // FrameDotSplitPen:'rgba(236,236,236,0.13)',
                // FrameSplitTextFont: "22px 微软雅黑",
            }) // 均线
            this.Minute.Option.NetworkFilter = (data, callback) => {
                        // data.period = period
                this.NetworkFilter(data, callback);
            };
            HQChart.Chart.JSChart.GetResource().FrameLogo.Text=null;

             var canvas=this.$refs.minute;
            canvas.style.width=canvas.clientWidth+'px';
            canvas.style.height=canvas.clientHeight+'px';

            this.Minute.Option.Symbol=this.Symbol;
            let chart=HQChart.Chart.JSChart.Init(this.$refs.minute);
            chart.SetOption(this.Minute.Option);
            this.Minute.JSChart=chart;

            // this.webSocket()
                
        },
        CreateKLineChart() {
  
            if (this.Kline.JSChart) return;

            this.Kline.Option.NetworkFilter = (data, callback) => {
                        // data.period = period
                this.NetworkFilter(data, callback);
            };
            var canvas=this.$refs.kline;
            var box = document.querySelector('.chart-container');
            canvas.style.width=box.clientWidth+'px';
            canvas.style.height=box.clientHeight+'px';

            var resource=HQChart.Chart.JSChart.GetResource();
            console.log(resource)

            resource.Title.VolColor='rgb(0,0,255)';
	resource.Title.AmountColor='rgb(255,193,37)';
	resource.Title.SettingColor='rgb(139,69,19)';
	resource.Title.NameColor='rgb(255, 0, 255)';
	resource.Title.DateTimeColor='rgb(178,34,34)';
	resource.Title.TurnoverRateColor='rgb(250,128,114)';
	resource.Title.PositionColor='rgb(70,130,180)';


            this.Kline.Option.Symbol=this.Symbol;
            let chart=HQChart.Chart.JSChart.Init(this.$refs.kline);
            chart.SetOption(this.Kline.Option);
            this.Kline.JSChart=chart;

             chart.AddEventCallback(
                {
                    event:HQChart.Chart.JSCHART_EVENT_ID.ON_INDEXTITLE_DRAW,
                    callback:(event, data, obj)=>{ this.OnIndexTitleDraw(event, data, obj); }
                }
            );

            // dom=document.createElement("div");
            //     dom.style.position = "absolute";
            //     dom.style.background='rgba(255,228,181,0.8)';

        },
         OnIndexTitleDraw(event, data, obj)
            {
                console.log('[KLineChart::OnIndexTitleDraw] event, data', event , data);

                var frameID=data.FrameID;
                var value = ''
              
                if (!this.DivIndexTitle[frameID])
                {
                    var dom=document.createElement("div");
                    dom.style.position = "absolute";
                    dom.style.background='rgba(255,228,181,0.3)';
                    dom.className="indexTitle";
                    dom.style["pointer-events"]="none";
                    this.$refs.kline.appendChild(dom);
                    this.DivIndexTitle[frameID]=dom;
                }
                else
                {
                    var dom=this.DivIndexTitle[frameID];
                }

                dom.style.left =data.Left + "px";
                dom.style.top=data.Top+"px";
                var log=`${data.Title},`;
                for(var i in data.Data)
                {
                    var item=data.Data[i];
                    if (!item || !item.Data || !item.Data.Data) continue;
                    if (item.Data.Data.length<=0) continue;

                    var dataIndex=item.Data.DataOffset+data.Index;
                    if (dataIndex>=item.Data.Data.length) dataIndex=item.Data.Data.length-1;
                    if (dataIndex<0) continue;
                    value=item.Data.Data[dataIndex];
                    if (value==null) continue;

                    log+=`${item.Name}=${value.toFixed(2)} `;
                }

                var mainIndex=`<span>${log}</span>`;
                console.log("[KLineChart::OnIndexTitleDraw] ",mainIndex);
                var htmlContent=mainIndex;
                if (data.OverlayIndex.size>0)   //叠加指标
                {
                    for(var overlayIndexItem of data.OverlayIndex)
                    {
                        var indexItem=overlayIndexItem[1];
                        var log=`叠加指标:${indexItem.Title}`;
                        for(var i in indexItem.Data)
                        {
                            var item=indexItem.Data[i];
                            if (!item || !item.Data || !item.Data.Data) continue;
                            if (item.Data.Data.length<=0) continue;

                            var dataIndex=item.Data.DataOffset+data.Index;
                            if (dataIndex>=item.Data.Data.length) dataIndex=item.Data.Data.length-1;
                            if (dataIndex<0) continue;
                            value=item.Data.Data[dataIndex];
                            if (value==null) continue;

                            log+=`${item.Name}=${value.toFixed(2)} `;
                        }

                        var overlayIndexTitle=`<br><span>${log}</span>`;
                        console.log("[KLineChart::OnIndexTitleDraw] ",overlayIndexTitle);
                        htmlContent+=overlayIndexTitle
                    }
                }

                dom.innerHTML=htmlContent;
                dom.style.display = "block";
                //dom.style.display="none";
            },
        getTickData() {
            if(!time_range()) clearInterval(this.timer)
            let param = {
                    "stReq": {
                        "stHeader": {
                            "shtMarket": 1
                        },
                        "sCode": "605577",
                        "shtStartxh": 0,
                        "shtWantNum": 10
                    }
                }
            this.$POST('json/hq_marketdata/tickData',param).then(res=>{
                this.list = res.stRsp.vTickData
            })
        },
        webSocket() {
            var ws = new WebSocket("wss://xcxhq.upchinaproduct.com");

             ws.addEventListener('message',(res)=>{
                console.log(res, 10000)
            })

            ws.onopen = function(evt) { 
                
            console.log("Connection open ..."); 
                ws.send({
                    data: `{"packet":{"iRequestId":89,"sFuncName":"stockHqSimple"},"stReq":{"stHeader":{"stClientInfo":{"vGuid":[0,0,0,3,0,16,83,57,0,37,89,77,60,9,85,64]}},"vStock":[{"shtSetcode":1,"sCode":"605577"}],"ePushFlag":1,"vBitmap":[254,1,238,137,128]}}`
                })
            };


            ws.onmessage = function(res) {
                // debugger
                // NewfiveList[17] = NewfiveList[17].reverse()
                // NewfiveList[18] = NewfiveList[18].reverse()

                // self.setData({
                //     headList: JSON.parse(res.data).data.stRsp.vStockHq[0].m1,
                //     fiveList: NewfiveList,
                //     // tradingList: tradingList
                // })
                console.log(JSON.parse(res.data).data.stRsp.vStockHq[0].m1)
            };
   
        },
        checkKline(index,name) {
            
            if(index!=1000) {

                this.btnId = index
                if(index!=3){
                    this.minteId = ''
                    this.btnList[3].label = '分钟'
                }
                
            } else {
                this.minteId = name
                this.btnList[3].label = name
            }
            this.minteShow = false
            if(index == 3) {
                this.minteShow = true
                return
            }

            var period=DefaultData.GetPeriodData(name);
             
            this.Kline.IsShow=period.KLineShow;
            this.Minute.IsShow=period.MinuteShow; 

            if (!period) return;
            if (period.KLineShow) this.ChangeKLinePeriod(period.Value);
            this.Kline.IsShow=period.KLineShow;
            if (period.MinuteShow) this.ChangeMinutePeriod(period.Value);
            this.Minute.IsShow=period.MinuteShow; 

            // this.chartone(index)
        },
        getIndexList() {
            var self = this

            this.$POST('ic_index_data_pre/getIndexList',{
                "stReq": {
                        "period": 7
                    }
            }).then(res=>{

                var newIndicatorsList = []
                var figure = []
                console.log(res, '指标列表');
                res.stRsp.vData.filter( (item)=> {
                    if (item.graph == 1) {
                        newIndicatorsList.push(item.name)
                        this.indicatorsList.push(item)
                    } else {
                        figure.push(item.name)
                        this.figureIndicatorsList.push(item)
                    }
                })        
            })
        },
        NetworkFilter(data,callback) {

            data.PreventDefault = true; //设置hqchart不请求数据
            var KLineData


            switch (data.Name) {
                case 'KLineChartContainer::ReqeustHistoryMinuteData': //分钟全量数据下载
                    //通过data.Request里的数据 对应到第3方数据
                    
                    var eLineType = ''
                    if (data.Request.Data.period == 5) {
                        eLineType = 2
                    } else if (data.Request.Data.period == 6) {
                        eLineType = 3
                    } else if (data.Request.Data.period == 7) {
                        eLineType = 4
                    } else if (data.Request.Data.period == 8) {
                        eLineType = 5
                    }
                    let param = {
                            "stReq": {
                                "stHeader": {
                                    "shtMarket": 1
                                },
                                "sCode": '605577',
                                "eLineType": eLineType,
                                "shtStartxh": 0,
                                "shtWantNum": 100,
                                "bXRXDFlag": false,
                                "bSameUnit": false,
                                "eQxMode": 0,
                                "lDate": 0,
                                "shtTypeRsp": 1
                            }
                        }
                    this.$POST('json/hq_marketdata/kLineData',param).then (res=> {
                        var hqchartData = res.stRsp.vAnalyData //把第3方数据data转成 hqchart数据
                        var newhqchartData = {
                            code: 0,
                            count: 0,
                            data: [],
                            name: '',
                            symbol: ''
                        }
                        newhqchartData.name = '龙版传媒'
                        newhqchartData.count = res.stRsp.vAnalyData.length + 1
                        hqchartData.filter(function (e, i) {
                            // e.sttDateTime.iDate= formatTime(e.sttDateTime.iDate+''+e.sttDateTime.shtTime)
                            if (i == 0) {
                                newhqchartData.data.push([e.sttDateTime.iDate, e.fClose, e.fOpen, e.fHigh, e.fLow, e.fClose, e.lVolume, e.fAmount, e.sttDateTime.shtTime])
                            } else {
                                newhqchartData.data.push([e.sttDateTime.iDate, hqchartData[i - 1].fClose, e.fOpen, e.fHigh, e.fLow, e.fClose, e.lVolume, e.fAmount, e.sttDateTime.shtTime])

                            }
                        })
                        console.log(newhqchartData, '第3方数据data');

                        callback(newhqchartData); //把数据传回hqchart
                        
                    })

                    break;
                case 'KLineChartContainer::RequestMinuteRealtimeData': //分钟增量数据更新
                    break;
                case "MinuteChartContainer::RequestMinuteData": //分时数据
                    this.$POST('json/hq_marketdata/rtMinData',{
                        "stReq": {
                            "stHeader": {
                                "shtMarket": 1
                            },
                            "sCode": '605577',
                            "iStartPos": 0,
                            "bAuction": false
                        }
                    }).then(res=>{
                        var newhqchartData = {
                                        code: 0,
                                        count: 1,
                                        "stock": [{                                    
                                            name: '',
                                            date: '',
                                            minute: [],
                                            symbol: "605577.sh",
                                        }]
        
                                    }
                                    
                                    newhqchartData.stock[0].name = '龙版传媒'
                                    newhqchartData.stock[0].date = res.stRsp.iDate
                                    newhqchartData.stock[0].yclose = res.stRsp.dClose
        
                                    var aa = 0.45289855072463769
                                    res.stRsp.vRTMinData.filter(function (e, i) {
                                        newhqchartData.stock[0].minute.push({
                                            price: e.fNow,
                                            amount: e.dAmount,
                                            date: res.stRsp.vRTMinData[0].iDate,
                                            vol: e.uiNowVol,
                                            avprice: e.fAverage,
                                            lead: e.fLead,
                                            time: e.shtMinute,
                                            increase: aa,
                                            risefall: (res.stRsp.dClose - e.fNow),
                                            // open: '',
                                            // high: '',
                                            // low: ''
                                        })
                                    })

                                    
                                    var headList
                                    if (res.stRsp.vRTMinData.length > 0) {
                                        headList = newhqchartData.stock[0].minute[newhqchartData.stock[0].minute.length - 1].price
        
                                    }
                                   
    

                                    bus.$emit('changeData', headList)
                                    callback(newhqchartData)
                    })
                    break;
                case 'KLineChartContainer::RequestMinuteRealtimeData': //分钟增量数据更新
                    break;
                case 'KLineChartContainer::RequestRealtimeData': //日线实时数据更新
                    break;
                case 'KLineChartContainer::RequestHistoryData': //日线全量数据下载
                    var newData = {
                        "stReq": {
                            "stHeader": {
                                "shtMarket": 1
                            },
                            "sCode": '605577',
                            "eLineType": 0,
                            "shtStartxh": 1,
                            "bXRXDFlag": false,
                            "bSameUnit": false,
                            "eQxMode": 0,
                            "lDate": 0,
                            "shtTypeRsp": 1
                        }
                    }
                    this.$POST('json/hq_marketdata/kLineData',newData).then(res=>{
            
                            var hqchartData = res.stRsp.vAnalyData //把第3方数据data转成 hqchart数据
                            KLineData = res //把第3方数据data转成 hqchart数据
                            // that.setData({
                            //     KLineData: res.stRsp.vAnalyData
                            // })
                            var newhqchartData = {
                                code: 0,
                                count: 0,
                                data: [],
                                name: '',
                                symbol: ''
                            }
                            newhqchartData.name = '龙版创美'
                            hqchartData.filter(function (e, i) {
                                if (i == 0) {
                                    newhqchartData.data.push([e.sttDateTime.iDate, e.fClose, e.fOpen, e.fHigh, e.fLow, e.fClose, e.lVolume, e.fAmount])
                                } else {
                                    newhqchartData.data.push([e.sttDateTime.iDate, hqchartData[i - 1].fClose, e.fOpen, e.fHigh, e.fLow, e.fClose, e.lVolume, e.fAmount])
                                }
                            })
                            callback(newhqchartData); //把数据传回hqchart
                        
                    })
                    break;
                case 'APIScriptIndex::ExecuteScript': //指标执行
                    // var indexOf = data.Request.Data.indexname.indexOf("主")
                    // console.log();
                    // var hisData = data.HQChart.Frame.Data
                    // var aData = new Date();
                    // var value = aData.getFullYear() + "" + ((aData.getMonth() + 1) < 10 ? '0' + (aData.getMonth() + 1) : (aData.getMonth() + 1)) + "" + (aData.getDate() < 10 ? '0' + aData.getDate() : aData.getDate());
                    // var kLineDataStart = hisData.Data[0].Date
                    // var kLineDataEnd = hisData.Data[hisData.Data.length - 1].Date
                    // var hqchart = data.HQChart;
                    // var kData = hqchart.ChartPaint[0].Data;

                    //         this.$POST('ic_index_data_pre/getStockIndexJson',{
                    //             "stReq": {
                    //                 "eBusType": 2,
                    //                 "iType": 22,
                    //                 "stock": {
                    //                     "shtMarket": 1,
                    //                     "sCode": '605577'
                    //                 },
                    //                 "iStartDate": '20220324',
                    //                 "iEndDate": '20220818'
                    //             }
                    //         }).then(res=>{
                  
                    //         var newindicators = this.disposal_index_data(kData, res.stRsp.data)
                    //         // 数据格式转换
                    //         var apiData = {
                    //             code: 0,
                    //             stock: {
                    //                 name: '龙版传媒',
                    //                 symbol: '605577.SH'
                    //             },
                    //             outdata: {
                    //                 date: kData.GetDate(),
                    //                 outvar: []
                    //             },
                    //         };
                    //         var redfieldConfig = {
                    //             color: 16711680,
                    //             end: "",
                    //             field: "MACD",
                    //             func: 3,
                    //             start: "",
                    //             text: "",
                    //             type: 0,
                    //             width: 1,
                    //         }
                    //         var greenfieldConfig = {
                    //             color: 2330147,
                    //             end: "",
                    //             field: "MACD",
                    //             func: 3,
                    //             start: "",
                    //             text: "",
                    //             type: 0,
                    //             width: 1,
                    //         }
                    //         if (indexOf !== -1) {
                    //             that.data.figureIndicatorsList[that.data.figureListindex].vItem.forEach(function (item, key) {
                    //                 if (item.func == 1) {
                    //                     apiData.outdata.outvar.push(Idx_Trans.drawLine(that.data.figureIndicatorsList[that.data.figureListindex].vItem[Number(key)], newindicators))
                    //                 } else if (item.func == 3) {
                    //                     redfieldConfig.field = item.field
                    //                     greenfieldConfig.field = item.field
                    //                     apiData.outdata.outvar.push(...Idx_Trans.drawColorStick(redfieldConfig, greenfieldConfig, newindicators))
                    //                 } else if (item.func == 4 || item.func == 8) {
                    //                     apiData.outdata.outvar.push(Idx_Trans.drawStick(that.data.figureIndicatorsList[that.data.figureListindex].vItem[Number(key)], newindicators))
                    //                 } else if (item.func == 9) {
                    //                     apiData.outdata.outvar.push(Idx_Trans.drawText(that.data.figureIndicatorsList[that.data.figureListindex].vItem[Number(key)], newindicators))
                    //                 } else if (item.func == 7) {
                    //                     apiData.outdata.outvar.push(Idx_Trans.drawIcon(that.data.figureIndicatorsList[that.data.figureListindex].vItem[Number(key)], newindicators))
                    //                 } else if (item.func == 6) {
                    //                     apiData.outdata.outvar.push(Idx_Trans.drawVerticalLine(that.data.figureIndicatorsList[that.data.figureListindex].vItem[Number(key)], newindicators))
                    //                 } else if (item.func == 2) {
                    //                     apiData.outdata.outvar.push(Idx_Trans.drawNumber(that.data.figureIndicatorsList[that.data.figureListindex].vItem[Number(key)], newindicators))

                    //                 }
                    //             })
                    //                 callback(apiData);
                    //         } else {
                    //             this.indicatorsList[0].vItem.forEach( (item, key)=> {
                    //                 if (item.func == 1) {
                    //                     apiData.outdata.outvar.push(Idx_Trans.drawLine(this.indicatorsList[0].vItem[Number(key)], newindicators))
                    //                 } else if (item.func == 3) {
                    //                     redfieldConfig.field = item.field
                    //                     greenfieldConfig.field = item.field
                    //                     apiData.outdata.outvar.push(...Idx_Trans.drawColorStick(redfieldConfig, greenfieldConfig, newindicators))
                    //                 } else if (item.func == 4 || item.func == 8) {
                    //                     apiData.outdata.outvar.push(Idx_Trans.drawStick(this.indicatorsList[0].vItem[Number(key)], newindicators))
                    //                 } else if (item.func == 9) {
                    //                     apiData.outdata.outvar.push(Idx_Trans.drawText(this.indicatorsList[0].vItem[Number(key)], newindicators))
                    //                 } else if (item.func == 7) {
                    //                     apiData.outdata.outvar.push(Idx_Trans.drawIcon(this.indicatorsList[0].vItem[Number(key)], newindicators))
                    //                 } else if (item.func == 6) {
                    //                     apiData.outdata.outvar.push(Idx_Trans.drawVerticalLine(this.indicatorsList[0].vItem[Number(key)], newindicators))
                    //                 } else if (item.func == 2) {
                    //                     apiData.outdata.outvar.push(Idx_Trans.drawNumber(this.indicatorsList[0].vItem[Number(key)], newindicators))

                    //                 }
                    //             })
                    //             // callback(apiData);
                    //         }
                    // })
                    // setTimeout(()=>{

                    //     this.Kline.JSChart.ChangeIndex(1,'MACD');
                    // },0)
                    // break;
            }
        
        },
        checkIndex(name){
            this.Kline.JSChart.ChangeIndex(0, name,{
                IsShortTitle: true
            } )
        }
    },
    destroyed() {
        clearInterval(this.timer)
    }
}
</script>

<style lang="less" scoped>
.chart-wrapper{
    .chart-btn-box{
        display: flex;
        justify-content: space-between;
        background-color: #262834;
        .chart_item{
            flex: 1;
            text-align: center;
            height: 0.8rem;
            line-height: 0.8rem;
            font-size: 0.28rem;
            position: relative;
        }
        .chart_after::after{
            content: '';
            width: 80%;
            height: 0.08rem;
            background-color: #999;
            position: absolute;
            left: 10%;
            bottom: 0;
        }
        .chart_item:last-child::before{
            content: '';
            width: 0;
            height: 0;
            display: block;
            border: 0.08rem solid transparent;
            border-bottom-color: #fff;
            transform: rotateZ(60);
            position: absolute;
            bottom: 0.2rem;
            right: 0.3rem;
            transform: rotateZ(135deg);
        }
    }
    .Minte-box {
        width: 1.6rem;
        position: absolute;
        top: 3.1rem;
        right: 0.3rem;
        z-index: 666;
        background: #262834;
        border: 1px solid #999;
        border-radius: 0.12rem;
        div{
            height: 0.6rem;
            line-height: 0.6rem;
            text-align: center;
        }
        &::before{
            content: '';
            display: block;
            width: 0;
            height: 0;
            border: 0.12rem solid transparent;
            border-bottom-color: #999;
            position: absolute;
            left: 0.8rem;
            top: -0.24rem;
        }
        .minteacite{
            color: red
        }
    }
    .vbtns{
        display: flex;
        bottom: 40%;
        left: 50%;
        width: 100%;
        .btn-item{
            width: 0.4rem;
            height: 0.4rem;
            background-color: antiquewhite;
            opacity: 0.4;
            margin:  0 0.3rem;
            display: flex;
            justify-content: center;
            align-items: center;
            img{
                width: 0.3rem;
                height: 0.3rem;
            }
        }
    }
    .chart-container{
        position: relative;
        display: flex;
        width: 100%;
        .canvas{
            flex: 1;
        }
        .right-detail{
            width: 2rem;
            .detail-btn{
                width: 100%;
                height: 0.5rem;
                display: flex;
                justify-content: center;
                background-color: #262834;
                font-size: 0.26rem;
                align-items: center;
                
                span{
                    height: 100%;
                    line-height: 0.5rem;
                    flex: 1;
                    text-align: center;
                    border: 1px solid #1e1e26;
                }
            }
            .minte-item{
                width: 100%;
                display: flex;
                line-height: 0.5rem;
                span{
                    text-align: right;
                }
                span:nth-child(1){
                    width: 0.6rem;
                    text-align: left;
                }
                span:nth-child(2){
                    flex-grow: 1;
                }
                span:nth-child(3){
                    width: 0.6rem;
                }
            }
        }
    }
}
</style>