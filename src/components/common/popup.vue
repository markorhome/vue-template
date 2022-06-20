<template>
  <div id="popup">
      <transition name="fade">
          <div class="mask" v-if="show" @click="handleClose"></div>
      </transition>
      <transition name="fadeup">
        <div class="mask-content" v-if="show" style="height: 5.26rem">
            <div class="mask-close">
                <h6>{{content[type].title}}</h6>
                <img src="../../assets/image/close.png" alt="" @click="handleClose">
            </div>
            <div class="mask-main" >
                <template v-if="type==0">
                    <p v-for="(item,index) of content[type].data" :key="index"><span :style="{color: index == 0?'#F55459':index == 1?'#00A622':'#FFC659',paddingRight: '0.1rem'}"> {{index == 0? '▲' : index == 1 ?'▼': '★'}}</span><span>{{item}}</span></p>
                </template>
                <p>{{content[type].data[0]}}</p>
            </div>
        </div>
      </transition>  
  </div>
</template>

<script>
export default {
    props: ['show','close','type'],
    data() {
        return {
            content: [
                {
                title: '近三个月走势注释',
                data: ['红色三角形表示当日有利好消息','绿色三角形表示当日有利空消息','黄色五角星表示老师有对应策略']
                },
                {
                    title: '',
                    data: ['未收录该题材股，试试其他股票。']
                }
            ]
            
        }
    },
    methods: {
        handleClose() {
            this.close()
        }
    },
    created() {
        console.log(this.content, this.type)
    }
}
</script>

<style scoped>
.mask{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.5);
}
.mask-content{
    width: 100%;
    background: #FFFFFF;
    box-shadow: 0rem 0.04rem 0.32rem 0.2rem rgba(98, 107, 128, 0.4);
    border-radius: 0.32rem 0.32rem 0rem 0rem;
    z-index: 1002;
    position: fixed;
    left: 0;
    bottom: 0;
}
h6{
    height: 1rem;
    line-height: 1rem;
    margin: 0 0.3rem;
    border-bottom: 0.01rem solid #D6D6F2;
    font-size: 0.36rem;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #333333;
    text-align: center;
}
.mask-close{
    position: relative;
}
.mask-close img{
    width: 0.3rem;
    height: 0.3rem;
    position: absolute;
    top: 50%;
    right: 0.3rem;
    transform: translateY(-50%);
}
.mask-main{
    padding: 0.47rem 0.5rem;
}
.mask-main p {
    font-size: 0.3rem;
    font-family: PingFangSC-Semibold, PingFang SC;
    color: #333333;
    font-weight: 400;
    line-height: 0.48rem;
    padding-bottom: 0.46rem;
    text-align: center;
}
.mask-main p span:first-child{
    font-weight: 600;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.fadeup-enter-active, .fadeup-leave-active {
  transition: bottom .5s;
}
.fadeup-enter, .fadeup-leave-to {
  bottom: -5.26rem;
}

</style>