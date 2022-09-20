export const DefaultData = function(){}

DefaultData.GetMinuteOption=function(){
    var option = {
        Type:'分钟走势图',   //创建图形类型
            
        Windows: //窗口指标
        [
            // {Index:"MACD", Modify:false,Change:false}
        ], 
            
        IsAutoUpdate:true,       //是自动更新数据
        DayCount:1,          
        AutoUpdateFrequency: 5000,       //1 最新交易日数据 >1 多日走势图
        IsShowCorssCursorInfo:true, //是否显示十字光标的刻度信息
        IsShowRightMenu:false,       //是否显示右键菜单
        CorssCursorTouchEnd:true,
        IsClickShowCorssCursor: true,
        IsFullDraw: true, //不是使用缓存每次都重绘
        CorssCursorInfo: {
            Left: 2,
            Right: 2
        },
        MinuteLine: {
            IsDrawAreaPrice: false, //是否画价格面积图
            IsShowAveragePrice: true, //不显示均线
        },

        Border: //边框
        {
            Left: 1, //左边间距
            Right: 1, //右边间距
            Top: 25,
            Bottom: 25,
            AutoRight: {
                Blank: 10,
                MinWidth: 40
            },
            AutoLeft: {
                Blank: 10,
                MinWidth: 40
            },
        },
            
        Frame:  //子框架设置
        [
            {SplitCount:5,StringFormat:0,splitType: 1,IsShowXLine:true},
            {SplitCount:3,StringFormat:0},
            {SplitCount:3,StringFormat:0},
        ],

        ExtendChart:    //扩展图形
        [
            {Name:'MinuteTooltip' }  //手机端tooltip
        ],
       

        NetworkFilter: null
    }
      return option
}
DefaultData.GetKLineOption = function () {
    var option = {
        Type: '历史K线图',
        DragDownload: {
            Day: {
                Enable: true
            }
        },
        IsCorssOnlyDrawKLine: true,
        Windows: //窗口指标
            [{
                    Index: "MA",
                    Modify: false,
                    Change: false,
                    IsMainIndex: true,
                    TitleHeight: 15,
                    IsShortTitle: true,
                    IndexParamSpace: 10,
                    Name: '龙版传媒',IsShowOverlayIndexName:false
                },
                // {
                //     // Name: 'KDJ', Index: 'MACD' 

                //     // IsMainIndex: false,
                //     API: {
                //         Name: 'MACD',
                //         Script: null,
                //         Args: null,
                //         Url: ' '
                //     }
                // }
                { Index: "MACD",Modify:false,Change:false,IsShortTitle: true ,TitleHeight: 5,IndexParamSpace: 10,IsShowOverlayIndexName:false }
            ],
        OverlayIndex: [ ],
        //ColorIndex: { Index: '五彩K线-双飞乌鸦' },   //五彩K线
        //TradeIndex: { Index: '交易系统-BIAS' },    //交易系统
        Symbol: "",
        IsAutoUpate: true, //是自动更新数据
        AutoUpdateFrequency: 15000,
        IsApiPeriod: false,
        IsShowRightMenu: false,
        //IsFullDraw: false, //不是使用缓存每次都重绘
        IsShowCorssCursorInfo: true, //是否显示十字光标的刻度信息
        IsClickShowCorssCursor: true,
        CorssCursorTouchEnd: true, //手离开屏幕 隐藏十字光标
        KLine: {
            DragMode: 0, //拖拽模式 0 禁止拖拽 1 数据拖拽 2 区间选择
            Right: 1, //复权 0 不复权 1 前复权 2 后复权
            Period: 0, //周期 0 日线 1 周线 2 月线 3 年线
            MaxReqeustDataCount: 100, //数据个数
            PageSize: 30, //一屏显示多少数据
            IndexTreeApiUrl: "https://opensourcecache.zealink.com/cache/hqh5/index/commonindextree.json", //指标树下载地址
            //Info:["互动易","大宗交易",'龙虎榜',"调研","业绩预告","公告"],       //信息地雷
            //Info:["公告","互动易","调研"],           //信息地雷
            InfoPosition: 1, //显示位置
            //KLineDoubleClick: true, //双击分钟走势图
            //IsShowTooltip: true, //是否显示K线提示信息
            //FirstShowDate:20180401,             //首屏显示的起始日期
            DrawType: 0,
            IsShowTooltip: false,
            ZoomType: 0,
            RightFormula: 0,
        },
        KLineTitle: //标题设置
        {
            IsShowName: true, //显示股票名称
            IsShowSettingInfo: false, //显示周期/复权
        },

        Border: //边框
        {
            Left: 1, //左边间距
            Right: 1, //右边间距
            Top: 2,
            Bottom: 20,
        },

        Frame: //子框架设置
            [   {
                    SplitCount: 3,
                    StringFormat: 0,
                    IsShowLeftText: true,
                    IsShowIndexTitle: false,
                    // IsShowYLine: true,
                    YTextBaseline: 1,
                    IsShowXLine: true
                },
                {
                    SplitCount: 2
                },
            ],
        // ExtendChart: //扩展图形
        //     [{
        //         Name: 'KLineTooltip'
        //     }],
    }
    return option;
}
DefaultData.GetPeriodData=function(name)
{
    const mapPeriod=new Map([
        ["分时",{Value:1,KLineShow:false,MinuteShow:true}],
        ["五日",{Value:5,KLineShow:false,MinuteShow:true}],
        ["日线",{Value:0,KLineShow:true,MinuteShow:false}],
        ["周线",{Value:1,KLineShow:true,MinuteShow:false}],
        ["月线",{Value:2,KLineShow:true,MinuteShow:false}],
        ["年线",{Value:3,KLineShow:true,MinuteShow:false}],
        ["1分钟",{Value:4,KLineShow:true,MinuteShow:false}],
        ["5分钟",{Value:5,KLineShow:true,MinuteShow:false}],
        ["15分钟",{Value:6,KLineShow:true,MinuteShow:false}],
        ["30分钟",{Value:7,KLineShow:true,MinuteShow:false}],
        ["60分钟",{Value:8,KLineShow:true,MinuteShow:false}],
    ]);
    if (!mapPeriod.has(name)) return null;

    return mapPeriod.get(name);
}