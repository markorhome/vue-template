<template>
  <div class="quarter_container">
    <div class="quarter" @click="selectMask">
      <!-- :style="{width: type == 0 ? '2.5rem': '4.2rem'}" -->
      <img class="Calendar" src="../../assets/image/Calendar.png" alt />
      <p>{{selectName}}</p>
      <img class="up" src="../../assets/image/up.png" alt />
    </div>
    <transition>
      <div class="mask_cont_box" v-if="quarterMask">
        <ul class="mask_cont">
          <li
            v-for="(item,index) of selectList"
            :key="index"
            :class="{active: index == selectId}"
            :index="index"
            :id="item.id"
            @click="handleSelect(index)"
            class="border_1px"
          >{{item.label}}</li>
        </ul>
        <div class="d1"></div>
      </div>
    </transition>
    <transition>
      <div class="quarter_mask" v-if="quarterMask" @click="closeMask"></div>
    </transition>
  </div>
</template>

<script>

import { getNowTime } from '../../utils'
export default {
  props: {
    type: {
      default: 0
    }
  },
  data() {
    return {
      quarterMask: false,
      selectId: 0,
      selectList: [],
      selectName: '',
      selectDate: {}
    };
  },
  created() { },
  mounted() {
    this.initData()
  },
  methods: {
    setDate() {
      this.selectName = this.selectList[this.selectId].label
      this.selectDate = this.selectList[this.selectId].result
      this.$emit("selectChange", this.selectDate);
    },
    initData() {
      this.selectList = getNowTime(this.type)
      this.setDate()
    },
    selectMask() {
      this.quarterMask = true;
    },
    closeMask() {
      this.quarterMask = false;
    },
    handleSelect(index) {
      this.selectId = index
      this.setDate()
      this.quarterMask = false;
    }
  }
};
</script>

<style scoped lang='less'>
.quarter_container {
  position: relative;
  height: 0.42rem;
  .mask_cont_box {
    position: absolute;
    background: #ffffff;
    right: 0.3rem;
    top: 0.6rem;
    z-index: 1003;
    box-shadow: 0 0.02rem 0.12rem 0 rgba(154, 158, 173, 0.4);
    border-radius: 0.08rem;
    z-index: 105;
    .mask_cont {
      li {
        padding: 0 0.45rem;
        line-height: 0.88rem;
        height: 0.88rem;
        font-size: 0.26rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        white-space: nowrap;
        color: #333333;
      }
      .active {
        color: #f55459;
        font-size: 0.3rem;
      }
    }
    .d1 {
      position: absolute;
      width: 0;
      height: 0;
      border-right: 0.15rem solid transparent;
      border-left: 0.15rem solid transparent;
      border-bottom: 0.15rem solid #ffffff;
      border-top-left-radius: 0.15rem;
      right: 0.2rem;
      top: -0.13rem;
    }
  }
}
.quarter {
  height: 0.42rem;
  line-height: 0.42rem;
  background: #f2f3f8;
  border-radius: 0.08rem;
  float: right;
  display: flex;
  padding-right: 0.25rem;
  .Calendar {
    width: 0.3rem;
    height: 0.3rem;
    margin: 0.06rem 0.1rem 0.06rem 0.12rem;
  }
  p {
    color: #636777;
    font-size: 0.24rem;
  }
  .up {
    width: 0.14rem;
    height: 0.08rem;
    margin: auto 0.1rem auto 0.2rem;
  }
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s;
}
.v-enter,
.v-leave-to {
  opacity: 0;
}
.quarter_mask{
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
}
</style>