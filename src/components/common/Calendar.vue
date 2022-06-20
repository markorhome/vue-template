<template>
  <div class="calendar">
    <!-- 选择日历的弹出层 -->
    <div class="model_mask" v-show="isShow" @click="close()"></div>
    <div class="bouncedBox" v-show="isShow">
      <p class="line"></p>
      <div class="title">
        <div class="btn" @click.stop="last()">
          <img src="../../assets/image/godetail.png" alt style="transform: rotate(-180deg)" />
        </div>
        <div class="text">
          <span>{{month}}月</span>
          <span>{{Year}}</span>
        </div>
        <div class="btn" @click.stop="next()">
          <img src="../../assets/image/godetail.png" alt />
        </div>
      </div>

      <div class="head">
        <div
          class="days"
          v-for="(item,index) in ['日','一','二','三','四','五','六']"
          :key="index"
        >{{item}}</div>
      </div>
      <div class="wrap">
        <div
          class="span"
          v-for="(item,index) in calendarList"
          :key="index"
          @click="handleClick(item.count)"
          :class="item==''?'kong': (item.count>toDay || item.day == 0 || item.day==6)?'noclick'
          :item.count==nowtime?'active':''"

        >
          <span>{{item.value}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["isShow","time"],
  data() {
    return {
      nowtime: "", //当前日期的时间-----20190203格式  用于比较
      toDay: "",
      Year: new Date().getFullYear(), //日历上的年份   ----动态改变的
      month: new Date().getMonth() + 1, //日历上的月份 ----  动态改变的
      Day: new Date().getDate(), //日历上的天份         ----- 动态改变的

      nowYear: new Date().getFullYear(),
      nowmonth: new Date().getMonth() + 1,
      nowDay: new Date().getDate(),
      calendarList: []
    };
  },
  created() {
    //关于日历的操作开始
    let time_month = this.time.substr(0,2); //现在的月份
    this.month = time_month>9?time_month:time_month.substr(1)
    let time_day = this.nowDay; //现在的天数
    this.Draw(this.nowYear, this.month);
    // if (time_month < 10) {
    //   time_month = 0 + "" + time_month;
    // }
    if (this.nowDay < 10) {
      time_day = 0 + "" + this.nowDay;
    }
    this.toDay = this.nowYear + "" + time_month + "" + this.time.substr(3);
    this.nowtime = this.nowYear + "" + time_month + "" + this.time.substr(3);

    //关于日历的操作结束
  },
  mounted() {
    this.$emit("change", this.nowtime);
  },
  methods: {
    close() {
      this.$emit("close"); //隐藏弹框
    },

    Draw: function(Year, Month) {
      //日期列表
      var calendar = [];

      //用当月第一天在一周中的日期值作为当月离第一天的天数(获取当月第一天是周几)
      for (
        var i = 1, firstDay = new Date(Year, Month - 1, 1).getDay();
        i <= firstDay;
        i++
      ) {
        calendar.push("");
      }

      //用当月最后一天在一个月中的日期值作为当月的天数
      for (
        var i = 1, monthDay = new Date(Year, Month, 0).getDate();
        i <= monthDay;
        i++
      ) {
        let time_month = Month;
        let time_day = i;
        if (Month < 10) {
          time_month = 0 + "" + Month;
        }
        if (i < 10) {
          time_day = 0 + "" + i;
        }

        calendar.push({
          day: new Date(Year, Month - 1, time_day).getDay(),
          value: i,
          count: Year + "" + time_month + "" + time_day
        });
      }
      this.calendarList = calendar;
    },

    last() {
      this.month--;
      if (this.month == 0) {
        this.month = 12;
        this.Year--;
      }

      this.Draw(this.Year, this.month);
    },

    next() {
      this.month++;
      if (this.month == 13) {
        this.month = 1;
        this.Year++;
      }

      this.Draw(this.Year, this.month);
    },

    handleClick(item) {

      this.nowtime = item;
      this.$emit("close");
      this.$emit("change", this.nowtime);
    }
  }
};
</script>

<style lang="less" scoped>
.model_mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
}
.bouncedBox {
  width: auto;
  height: 7.34rem;
  position: fixed;
  background: #fff;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 101;
  box-shadow: 0rem 0.04rem 0.32rem 0.2rem rgba(98, 107, 128, 0.4);
  border-radius: 0.32rem 0.32rem 0rem 0rem;
  padding: 0 0.6rem;
  .line {
    width: 2rem;
    height: 0.12rem;
    background: #9fa5b4;
    border-radius: 0.06rem;
    opacity: 0.5;
    position: absolute;
    left: 50%;
    top: 0.3rem;
    transform: translateX(-50%);
  }
  // 左右选择月份  显示当前年月
  .title {
    width: 100%;
    height: 0.48rem;
    line-height: 0.48rem;
    display: flex;
    justify-content: center;
    margin: 1.08rem 0 0.27rem;
    .btn {
      width: 0.48rem;
      height: 0.48rem;
      img {
        width: 0.12rem;
        height: 0.24rem;
        margin: 0.12rem auto;
      }
    }
    .text {
      width: 1.77rem;
      height: 0.48rem;
      font-size: 0.36rem;
      font-family: Helvetica;
      color: #333333;
      line-height: 0.48rem;
      display: flex;
      justify-content: space-between;
      margin: 0 0.78rem;
    }
  }

  //表头  周1到周天的显示
  .head {
    display: flex;
    flex-wrap: nowrap;
    text-align: center;
    height: 0.4rem;
    line-height: 0.4rem;
    font-size: 0.24rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #9fa5b4;
    .days {
      flex: 1;
    }
  }

  //日历表区域
  .wrap {
    width: auto;
    height: auto;
    overflow: hidden;
    padding-bottom: 1rem;
    display: flex;
    flex-wrap: wrap;
    .span {
      width: 0.9rem;
      height: 0.8rem;
      font-size: 0.28rem;
      font-family: Helvetica;
      color: #636777;
      line-height: 0.8rem;
      text-align: center;
      &.active span {
        display: block;
        width: 0.64rem;
        height: 0.64rem;
        line-height: 0.64rem;
        background: #f55459;
        color: #fff;
        border-radius: 0.64rem;
        margin: 0.08rem 0.13rem;
      }
      &.noclick {
        pointer-events: none;
        background: #ccc;
      }
      &.kong {
        background: #fff;
        pointer-events: none;
      }
    }
  }
}
</style>>
