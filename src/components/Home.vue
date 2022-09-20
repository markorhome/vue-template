<template>
  <div class="Home-container">
    <search-btn></search-btn>
    <div class="nav-box">
      <my-table 
            :headData="tableHead" 
            :bodyData="tableBody" 
            @sortChange="sortChange"
            :defaultSort="{order: 'desc',prop: 'user1'}"
            @cell-click="cellclick"
           
            @goModify="modifyClick" 
            @goDelete="deleteClick">
                <template #default>
                  <span data-func="goModify">修改</span>
                  <span data-func="goDelete">删除</span>
                </template>
                <template #user_name="{ value, styles }">
                  <div class="cell" :style="styles">{{value}}</div>
                </template>
        </my-table>
    </div>
    <div id="minute" ref="minute"></div>
  </div>
</template>

<script>
import SearchBtn from './common/SearchBtn'
import MyTable from './common/Table/MyTable.vue'
import HQChart from 'hqchart'

import 'hqchart/src/jscommon/umychart.resource/css/tools.css'
import 'hqchart/src/jscommon/umychart.resource/font/iconfont.css'
import $ from 'jquery'
function DefaultData() {}

         
  //       IsCorssOnlyDrawKLine:true;  //十字光标只能在K线上

  //      CorssCursorTouchEnd:true; //手势结束十字光标自动隐藏


  //   IsClickShowCorssCursor:true; //手势点击出现十字光标


   // EnableScrollUpDown:true; //允许手势上下操作滚动页面
function NetworkFilter(data,callback) {}
DefaultData.GetMinuteOption=function(){
  var option = {
    
        Type:'分钟走势图',   //创建图形类型
            
        Windows: //窗口指标
        [
            
        ], 
            
        IsAutoUpdate:true,       //是自动更新数据
        DayCount:1,                 //1 最新交易日数据 >1 多日走势图
        IsShowCorssCursorInfo:true, //是否显示十字光标的刻度信息
        IsShowRightMenu:true,       //是否显示右键菜单
        CorssCursorTouchEnd:true,

        MinuteLine:
        {
            //IsDrawAreaPrice:false,      //是否画价格面积图
        },

        Border: //边框
        {
            Left:1,    //左边间距
            Right:1,   //右边间距
            Top:20,
            Bottom:20
        },
            
        Frame:  //子框架设置
        [
            {SplitCount:3,StringFormat:0},
            {SplitCount:2,StringFormat:0},
            {SplitCount:3,StringFormat:0},
        ],

        ExtendChart:    //扩展图形
        [
            //{Name:'MinuteTooltip' }  //手机端tooltip
        ]
  }
  return option
}
export default {
  data() {

    return {
      Symbol:'600000.sh',

      Minute:
      {
          JSChart:null,
          Option:DefaultData.GetMinuteOption(),
      },
          // table表头
      tableHead: [
          {
              name: '账号',
              prop: 'user_name',
              style: {
                // fontSize: '22px',
                color: 'red'
              },
              // width: '2.2rem',
              // children: [
              //   {
              //     name: '账号1',
              //     prop: 'user11'
              //   },
              //   {
              //     name: '账号2',
              //     prop: 'user22'
              //   }
              // ]
          },
          {
              name: '内容1',
              prop: 'user1',
              isSort: true,
              // width: '2.1rem'
          },
          {
              name: '内容2',
              prop: 'user2',
              // width: '2.1rem'
          },
          {
              name: '内容3',
              prop: 'user3',
              isSort: true,
              // // width: '2.6rem',
              // children: [
              //   {
              //     name: '内容3.1',
              //     prop: 'user3.1',
              //     // width: '1.3rem',
              //   },
              //   {
              //     name: '内容3.2',
              //     prop: 'user3.2',
              //     // width: '1.3rem',
              //   },
              //   ]
          },
          // {
          //     name: '内容4',
          //     prop: 'user4',
          //     isSort: true,
          //     color: {
          //       1: '#f00',
          //       2: '#ff0',
          //       3: '#0f0',
          //       4: '#0ff'
          //     },
          //     colorProp: 'user4',
          //     width: '1.6rem'
          // },
          // {
          //     name: '内容5',
          //     prop: 'user5',
          //     width: '1.6rem'
          // },
          // {
          //     name: '操作',
          //     prop: '',
          //     width: '1.6rem'
          // },
      ],
        // table内容
      tableBody: [
        {
          user_name: '1111',
          user1: 'adfdsfds',
          user11: '11',
          user22: '22',
          user2: 'dgfdhhhdf',
          user2: 'dgfdhhhdf',
          user3: 'd',
          'user3.1': 'd1',
          'user3.2': 'd2',
          user4: '1',
          user5: 'dgfdhhhdf',
          htmluser5: `<span style="color: red">11111111</span>`
        },
        {
          user_name: '1111',
          user1: 'adfdsfds',
          user11: '11',
          user22: '22',
          user2: 'dgfdhhhdf',
          user2: 'dgfdhhhdf',
          user3: 'dgf',
          'user3.1': 'd1',
          'user3.2': 'd2',
          user4: '2',
          user5: 'dgfdhhhdf',
          htmluser5: `<span style="color: green">11111111</span>`
        },
        {
          user_name: '1111',
          user1: 'adfdsfds',
          user11: '11',
          user22: '22',
          user2: 'dgfdhhhdf',
          user2: 'dgfdh',
          user3: 'dgfdhhhdf',
          'user3.1': 'd1',
          'user3.2': 'd2',
          user4: '3',
          user5: 'dgfdhhhdf',
          htmluser5: `<span>11111111</span>`
        },
        {
          user_name: '1111',
          user1: 'adfdsfds',
          user2: 'dgfdhhhdf',
          user2: 'dgfdhhhdf',
          user3: 'dgfdhhhdf',
          'user3.1': 'd1',
          'user3.2': 'd2',
          user4: '4',
          user5: 'dgfdhhhdf',
          htmluser5: `<span>11111111</span>`
        },
      ],
    }
  },
  mounted() {
    this.OnSize();

    window.onresize = ()=> { this.OnSize(); }

    this.CreateMinuteChart();
  },
  methods: {
    modifyClick (item) {
        console.log("修改:" + item)
    },
    deleteClick (item) {
        console.log("删除:" + item)
    },
    // 排序
    sortChange (item){
        console.log(item)
        // 请求时候把这个data数据传过去
        // ...
    },
    cellclick(item) {
      console.log(item)
    },
    OnSize()
        {
            var chartHeight = window.innerHeight-30;
            var chartWidth = window.innerWidth-30;


            var minute=this.$refs.minute;
            minute.style.width=chartWidth+'px';
            minute.style.height=chartHeight+'px';

        },   //设置黑色风格
        CreateMinuteChart() //创建日线图
        {
          
            if (this.Minute.JSChart) return;
            this.Minute.Option.Symbol=this.Symbol;
            // let chart=HQChart.Chart.JSChart.Init(this.$refs.minute);
            // chart.SetOption(this.Minute.Option);
            this.Minute.JSChart=chart;
        }
  },
  components: {
    MyTable,
    SearchBtn
  }
}
</script>
<style scoped lang="less">
.Home-container{
  background: #fff;
}
</style>
