<template>
  <div class="head-wrapper">
    <div class="vleft">
        <div class="price">{{price}}</div>
        <div class="gains">
            <span>4.07%</span>
            <span>0.36</span>
        </div>
        <div class="fTotalMarketValue"><i>总值：</i>33.58亿</div>
    </div>
    <ul class="right">
        <li class="vright_item" v-for="(item,index) of dataList" :key="index">
            <i>{{item.label+'：'}}</i>
            <span>{{item.value}}</span>
        </li>
    </ul>
  </div>
</template>

<script>
import bus from '../../common/bueEvent.js'
export default {
    data() {
        return {
            dataList: [
                {
                    label: '开',
                    value: 8.93
                },
                {
                    label: '高',
                    value: 8.93
                },
                {
                    label: '低',
                    value: 8.93
                },
                {
                    label: '换',
                    value: 8.93
                },
                {
                    label: '额',
                    value: 8.93
                },
                {
                    label: '量',
                    value: 8.93
                },
                {
                    label: '流值',
                    value: 8.93
                },
            ],
            price: ''
        }
    },
    mounted() {
        bus.$on('changeData',this.updateData)


        

    },
    methods: {
        updateData(data) {
            this.price = data
        },
        
    }
}
</script>

<style lang="less" scoped>
.head-wrapper{
    font-size: 0.24rem;
    display: flex;
    height: 2rem;
    align-items: center;
    background-color: #262834;
    margin-bottom: 0.1rem;
    i{
        color: #999;
    }
    .vleft {
        width: 2.4rem;
        text-align: center;
        line-height: 0.55rem;
        padding-top: 0.1rem;
        .gains{
            display: flex;
            justify-content: center;
            height: 0.6rem;
            span{
                margin-right: 0.2rem;
            }
            span:nth-child(2){
                margin-right: 0;
            }
        }
        .price{
            font-size: 0.4rem;
            height: 0.6rem;
        }
    }
    .right{
        display: flex;
        flex: 1;
        flex-wrap: wrap;
        line-height: 0.65rem;
        .vright_item{
            width: 33%;
        }
        .vright_item:nth-of-type(3n+1){
            width: 34%;
        }
    }
}
</style>