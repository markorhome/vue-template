<template>
  <div id="popup">
    <transition name="fade">
      <div class="mask" v-if="show" @click="close"></div>
    </transition>
    <transition name="fadeup">
      <div class="mask-content" v-if="show">
        <div class="mask-close">
          <h6>{{ title }}</h6>
          <img src="../../assets/image/close.png" alt="" @click="close" />
        </div>
        <div class="mask-main">
          <template>
            <p v-for="(item, index) of content" :key="index">
              <span>{{ item.label }}</span
              ><span>{{ item.text }}</span>
            </p>
          </template>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import popupContent from './popupContent'
import mixin from '../../common/mixin'
export default {
  props: ["show", "close",'name'],
  mixins: [mixin],
  data() {
    return {
      title: '注释',
      content: popupContent[this.name]
    };
  },
  watch: {
    show(val) {
      if(val) {
        this.cancelScroll()
      }else{
        this.addScroll()
      }
    }
  }
};
</script>

<style scoped>
.mask {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
}
.mask-content {
  width: 100%;
  background: #ffffff;
  box-shadow: 0rem 0.04rem 0.32rem 0.2rem rgba(98, 107, 128, 0.4);
  border-radius: 0.32rem 0.32rem 0rem 0rem;
  z-index: 1002;
  position: fixed;
  left: 0;
  bottom: 0;
}
h6 {
  height: 1rem;
  line-height: 1rem;
  margin: 0 0.3rem;
  border-bottom: 0.01rem solid #d6d6f2;
  font-size: 0.36rem;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #333333;
  text-align: center;
}
.mask-close {
  position: relative;
}
.mask-close img {
  width: 0.3rem;
  height: 0.3rem;
  position: absolute;
  top: 50%;
  right: 0.3rem;
  transform: translateY(-50%);
}
.mask-main {
  padding: 0.47rem 0.5rem;
}
.mask-main p {
  font-size: 0.3rem;
  font-family: PingFangSC-Semibold, PingFang SC;
  color: #636777;
  font-weight: 400;
  line-height: 0.48rem;
  padding-bottom: 0.2rem;
  text-align: left;
}
.mask-main p span:first-child {
  font-weight: 600;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fadeup-enter-active,
.fadeup-leave-active {
  transition: bottom 0.5s;
}
.fadeup-enter,
.fadeup-leave-to {
  bottom: -9rem;
}
</style>