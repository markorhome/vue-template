<template>
  <div class="box" ref="box">
    
    <p style="margin-top: .2rem">以上所有服务由东高（北京）科技有限公司提供，证监会首批认证投资机构，资格证号：0110</p>
    <p style="margin-top: -.2rem">
      本产品仅供参考，不构成具体投资建议。策略根据算法模型得出，存在局限性，不准确预测未来收益。
    </p>
    <p style="margin-top: -.2rem">用户需独立做出投资决策，风险自担。市场有风险，投资需谨慎。</p>
    <p class="color" v-show="!isFree" @click="FreeStatement">*点击查看免责声明</p>

    
    <div v-show="isFree">
      <h2>免责声明</h2>
      <p>
      1、在您接受并使用本产品之前，须了解本产品所依托的载体（如软件工具、终端设备等）的实际功能、信息来源、固有缺陷和使用风险，由于投资者自身原因导致该软件工具、终端设备等用不当或受到病毒入侵、黑客攻击等不良影响的，由此导致的风险将由您自行承担。
      
    </p>
      <p>2、以上展示数据仅为历史统计数据，仅供参考，历史统计数据不代表未来趋势，也不构成对于收益的承诺和保证。投资和据此操作，风险自担。</p>
    </div>
  </div>
</template>

<script>
export default {
  name:'',
  data () {
    return {
      isFree: false
    }
  },
  created () {},
  methods: {
    FreeStatement () {
      this.isFree = !this.isFree;
      if (this.isFree) {
        setTimeout(()=> {
          let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
          document.body.scrollTop = scrollTop + 237;
          document.documentElement.scrollTop = scrollTop + 237;
        },0)
      }
    }
  }
};
</script>

<style scoped>
.box {
  padding-bottom: 0.4rem;
  border-top: 0.2rem solid #F2F3F8;
  position: relative;
  bottom: 0;
}
.color {
  color: #508cee;
}
h2 {
  color: #999999;
  font-weight: bold;
  font-size: 0.28rem;
  padding-top: .15rem;
  padding-left: .2rem;
}
p {
  font-size: 0.24rem;
  font-weight: 400;
  color: #999999;
  padding:0.16rem .2rem;
  line-height: .36rem;
  font-weight: normal;
 
}
p:last-child{
  padding-bottom:.5rem
}
</style>