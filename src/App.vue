<template>
  <div id="app">
    <!-- <navigation v-if="isNavShow" /> -->
    <van-loading type="spinner" color="#1989fa" v-show="loading" class="main-loading" ref="loading"/>
    <router-view />
  </div>
</template>

<script>
import Navigation from "./components/common/Navigation";
import Introduce from "./components/common/introduce";
import common from "./common/mixin"
export default {
  name: "App",
  mixins: [common],
  components: { Navigation, Introduce },
  data() {
    return {
      isShow: true,
      isNavShow: true,
      loading: false,
      closeL: null
    };
  },
  provide(){
    return {
      closeL: this.closeLoad,
      openL: this.openLoad
    }
  },
  created() {
    // this.cancelScroll()
  },
  mounted() {
    this.$refs.loading.style.height = document.body.clientHeight + 'px'
  },
  watch: {
    $route: {
      handler(route) {
        if (route.name == "Search") {
          this.isShow = false;
        } else {
          this.isShow = true;      
        }
      }
    }
  },
  methods: {
    closeLoad() {
      this.loading = false
      this.addScroll()
    },
    openLoad() {
      this.loading = true
      
      this.cancelScroll()
    }
  }
};
</script>

<style lang='less'>
#app {
  font-family: PingFangSC-Semibold, PingFang SC;
  color: #333;
  min-height: 800px;
  // height: calc(100% - 0.94rem);
}
.el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell {
  background: none;
}
.bg-cw {
  color: #f55459;
  font-weight: 600;
}
.T-add_more {
  height: 1.08rem;
  line-height: 1.08rem;
  text-align: center;
  font-size: 0.26rem;
  color: #9a9ead;
  img {
    width: 0.14rem;
    height: 0.08rem;
    display: inline-block;
    margin: 0 0 0.06rem 0.08rem;
  }
}
.main-loading{
  position: fixed;
  left: 0;
  top: 0;
  background: #fff;
  width: 100%;
  text-align: center;
  z-index: 100000;
  display: flex;
  justify-content: center;
  align-items: center;
}
.isFall{
  color: #00A622!important;
}
.isRise{
  color: #F55459!important;
}
.el-table--enable-row-hover .el-table__body tr:hover>td.el-table__cell{
  background-color: #fff;
}
.el-table .descending .sort-caret.descending{
  border-top-color: #F55459!important;
}
.el-table .ascending .sort-caret.ascending{
  border-bottom-color: #F55459!important;
}
</style>
