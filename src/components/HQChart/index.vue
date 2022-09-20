<template>
    <div class="hqchart-wrapper">
        <chart-head></chart-head>
        <chart></chart>
    </div>
</template>

<script>
import ChartHead from './ChartHead.vue'
import Chart from './chart.vue'
export default {
  components: { ChartHead, Chart },

}
</script>

<style lang="less" scoped>
.hqchart-wrapper{
  background-color: #000000;
  color: #fff;
}
</style>