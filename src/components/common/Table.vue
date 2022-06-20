<template>
  <el-table
    :data="incomeData"
    ref="table"
    class="I-income_table"
  >
    <template>
      <el-table-column
        v-for="(item, i) in tableHead"
        :key="i"
        :prop="item.prop"
        :label="item.label"
        :width="item.width ? item.width: 'auto'"
      >
        <template slot-scope="scope">
          <!-- 需要特殊处理的在这里判断处理   领涨股-->

          <!-- 行业名称名称 -->
          <div v-if="item.prop == 'induName' || item.prop == 'stockName'" @click="handleClick(scope.row)">
            <p style="font-weight: 400;">{{scope.row[item.prop]}}</p>
            <p style="color: #9A9EAD;height: 0.3rem;line-height:0.3rem;font-size: 0.22rem;font-weight:500;">{{scope.row.stockCode||scope.row.induCode}}</p>
          </div>
          <div v-else-if="item.prop == 'totalBalance'||item.prop == 'cleanBalance'">
            {{scope.row[item.prop]|price}}
          </div>
          <div v-else-if="item.prop == 'amountRatio' || item.prop =='floatRatio'||item.prop =='changeRatio'">
            {{scope.row[item.prop]|scale}}
          </div>
          <div v-else-if="item.prop =='zdf'||item.prop =='changeRate'" :style="setColor(scope.row[item.prop])">
            {{scope.row[item.prop]|zhangfu}}
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
    tableHead: Array
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
    }
  }
};
</script>

<style lang="less" scoped>
.I-income_table {
  width: auto;
  margin: 0.2rem 0.3rem 0;
}
.I-income_table /deep/ .el-table__header-wrapper .el-table__cell {
  height: 0.6rem;
  line-height: 0.6rem;
  font-size: 0.24rem;
  font-weight: 500;
  color: #636777;
  padding: 0;
  border: none;
  text-align: center;
  &:first-child {
    text-align: left;
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
    padding-left: 10px;
  }

}
</style>