<template>
  <div class="nav_title" >
    <img @click="goBack" src="../../assets/image/goback.png" alt="">
    <span>{{title}}</span>
  </div>
</template>
<script>
export default {
  name:'Navigation',
  data() {
    return {
      title: '',
      isShow: true
    }
  },
  watch: {
    $route: {
      handler(route) {

        this.title = route.meta.title
        if(route.name == 'Reason' || route.name == 'Search') {
          this.isShow = false
        } else {
          this.isShow = true
        }
        
      },
      immediate: true
    }
  },
  methods:{
    goBack () {
      let path = this.$router.currentRoute.path;
        if (path == "/") {
            this.$store.commit("setStatus",false)
            return
        }
      this.$router.go(-1);
    }
  }
}
</script>
<style lang='less' scoped>
  .nav_title{
    height: .9rem;
    line-height: .9rem;
    text-align: center;
    position: relative;
    background: #fff;
    border-bottom: 2px solid #F3F3FA;
    img {
      height: .3rem;
      position: absolute;
      top: .3rem;
    }
    img:first-child {
      width: .17rem;
      left: .4rem;
    }
    img:last-child{
      width: .3rem;
      top: .3rem;
      right: .4rem;
    }
    span {
      font-size: 0.34rem;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #080808;
    }
  }
</style>