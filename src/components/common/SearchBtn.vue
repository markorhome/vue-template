<template>
  <div class="searchBtn-box">
      <router-link to="/search" class="btn">
          <img src="../../assets/image/search.png" alt="">
          <span>请输入行业名称、股票名称、股票代码</span>
      </router-link>
      
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.searchBtn-box{
    padding: 0.3rem;
    .btn{
        display: block;
        width: 100%;
        height: 0.64rem;
        background: #F3F3FA;
        border-radius: 0.32rem;
        position: relative;
        line-height: 0.64rem;
        img{
            width: 0.3rem;
            height: 0.3rem;
            position: absolute;
            left: 0.31rem;
            top: 0.17rem;
        }
        span{
            padding-left: 0.79rem;
            font-size: 0.26rem;
        }
    }
}
</style>>