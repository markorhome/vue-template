<template>
  <div class="Home-container">
    <search-btn></search-btn>
    <div class="nav-box">
      <!-- <router-link to="financesl" :class="{active: navIndex == 0}">两市融资融券</router-link>
      <router-link to="financest" :class="{active: navIndex == 1}">融资策略<img src="../assets/image/luck.png" alt=""></router-link> -->
    </div>
  </div>
</template>

<script>
import SearchBtn from './common/SearchBtn'
export default {
  name: 'home',
  components: {SearchBtn},
  data () {
    return {
      navIndex: 0
    }
  },
  watch: {
    '$route': {
      handler(route) {
        this.navIndex = route.name == 'FinanceSl'?0:1
      }
    }
  }
}
</script>
<style scoped lang="less">
.Home-container{
  background: #fff;
}
</style>
