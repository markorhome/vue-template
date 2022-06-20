<template>
  <el-table
    :data="incomeData"
    ref="table"
    class="I-income_table"
    @sort-change="sortChange"
    :default-sort = "defaultSort"
  >
    <template>
      <el-table-column
        v-for="(item, i) in tableHead"
        :key="i"
        :prop="item.prop"
        :label="item.label"
        :width="item.width ? item.width: 'auto'"
        :sortable="item.sort ? 'custom': false"
      >
        <template slot-scope="scope">
          <!-- 需要特殊处理的在这里判断处理   领涨股-->

          <!-- 行业名称名称 -->
          <div v-if="item.prop == 'induName' || item.prop == 'stockName'" @click="handleClick(scope.row)">
            <p style="font-weight: 400;">{{scope.row[item.prop]}}</p>
            <p style="color: #9A9EAD;height: 0.3rem;line-height:0.3rem;font-size: 0.22rem;font-weight:500;">{{scope.row.stockCode||scope.row.induCode}}</p>
          </div>
          <div v-else-if="item.prop == 'totalBalance'||item.prop == 'buyBalance'||item.prop == 'sellBalance'||item.prop == 'tradeBalance'||item.prop == 'cleanBalance'">
            {{scope.row[item.prop]|price}}
          </div>
          <div v-else-if="item.prop == 'totalRatio' || item.prop =='changeRatio'||item.prop =='buyRatio'||item.prop =='sellRatio'||item.prop=='tradeRatio'||item.prop=='cleanRatio'">
            {{scope.row[item.prop]|scale}}
          </div>
          <div v-else-if="item.prop == 'changeRate' || item.prop =='zdf'">
            {{scope.row[item.prop]|zhangfu1}}
          </div>
          <div v-else-if="item.prop == 'date'">
            {{scope.row[item.prop].substr(5,5)}}
          </div>
          <div v-else-if="item.prop == 'close'" :style="setColor(scope.row.zdf)">
            <p style="height:0.38rem">{{scope.row[item.prop]}}</p>
            <p style="height:0.38rem">{{scope.row.zdf|zhangfu}}</p>
          </div>
          <div v-else>
            {{scope.row[item.prop]}}
          </div>


        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script>
import common from '../../common/mixin'
export default {
  mixins: [common],
  inject: ['openL'],
  props: {
    incomeData: {
      default: function() {
        return []
      },
      type: Array
    },
    index: String,
    type: String
  },
  data() {
    return {
      tableHead: [],
      defaultSort: {prop: '', order: 'descending'}
    };
  },
  created() {
    let isSort = this.type == 0?true: false
    this.defaultSort.prop = isSort?'totalBalance':'date'
    this.tableHead = [
      {
          label: "股票名称",
          prop: "stockName",
          width: 85
        },
        {
          label: "两融余额",
          prop: "totalBalance",
          width: 90,
          sort: isSort
        },
        {
          label: "占流通市值比",
          prop: "totalRatio",
          width: 110,
          sort: isSort       
        },
        {
          label: "日变动",
          prop: "changeRatio",
          width: 70,
          sort: isSort
        },
        {
          label: "融资余额",
          prop: "buyBalance",
          sort: isSort
        },
        {
          label: "占流通市值比",
          prop: "buyRatio",
          width: 110,
          sort: isSort
        },
        {
          label: "融券余额",
          prop: "sellBalance",
          sort: isSort
        },
        {
          label: "占流通市值比",
          prop: "sellRatio",
          width: 110,
          sort: isSort
        },
        {
          label: "两融交易额",
          prop: "tradeBalance",
          width: 100,
          sort: isSort
        },
        {
          label: "占成交额比",
          prop: "tradeRatio",
          width: 100,
          sort: isSort
        },
        {
          label: "融资净买入额",
          prop: "cleanBalance",
          width: 110,
          sort: isSort
        },
        {
          label: "占成交额比",
          prop: "cleanRatio",
          width: 100,
          sort: isSort
        }
    ]
    // 以上默认从首页跳转到历史个股的表头
    if(this.index == 'h') {// 行业表头
      this.tableHead[0].label = '行业名称'
      this.tableHead[0].prop = 'induName'
      this.tableHead.splice(3,1)
      this.tableHead.splice(7,2)
    }
    if(this.type == 1) {
      this.tableHead[0].label = '收盘价'
      this.tableHead[0].prop = 'close'
      this.tableHead.unshift({
        label: '日期',
        prop: 'date',
        sort: false
      })
    }
  },
  mounted() {},
  methods: {
    handleClick(row){
      let query = {}
      if(row.stockName){
        query.stockName = row.stockName;
        query.stockCode = row.stockCode;
        query.innerCode = row.innerCode;
        query.type = 'g';
      } else {
        query.induCode = row.induCode
        query.type = 'h';
      }
      this.openL()
      this.$router.push({path: '/stock', query})
    },
    sortChange(params){
      this.$emit('sortChange',params)
    }
  }
};
</script>

<style lang="less" scoped>
.I-income_table {
  width: auto;
  margin-top: 0.2rem;
}
.I-income_table /deep/ .el-table__header-wrapper .el-table__cell {
  font-size: 0.24rem;
  font-weight: 500;
  color: #636777;
  padding: 0;
  border: none;
  text-align: center;
  background: #F3F3FA;
  font-family: PingFangSC-Medium, PingFang SC;
  &:first-child {
    text-align: left;
    .cell{
        padding-left: 0.2rem;
    }
  }
  .cell{
      padding: 0;
      height: 0.66rem;
      line-height: 0.66rem;
  }
}
.I-income_table /deep/ .el-table__body-wrapper .el-table__cell {
  padding: 0;
  height: 0.92rem;
  .cell {
    padding: 0;
    font-size: 0.3rem;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #333;
    text-align: center;
  }
  &:first-child .cell {
    text-align: left;
    padding-left: 0.2rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
  }

}
</style>