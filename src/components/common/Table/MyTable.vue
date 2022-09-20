<template>
    <div class="table-wrapper">
        <div class="product-list">
            <!-- 可滑动的全表格 -->
            <div class="table-scroll-container table-wrapper" ref="tableScrollBox" :class="{scrollno:!bodyData.length}">
                <table class="table-scroll" border="0" cellpadding="0" cellspacing="0" ref="table">
                    <tbody class="tbody">
                        <tr class="title-tr table-header">
                            <th class="ta-c" v-for="(item,index) in head" 
                                             :key="index" 
                                             :style="{ width: item.width,
                                                       flexGrow: (item.width || fixed)?'initial': 1,
                                                       padding: (!item.width&&fixed)?'0 0.3rem':''}"
                                             :class="[{'is-right': item.align=='right','is-left':item.align=='left'}]"
                            >
                                <template v-if="!item.children">
                                    <span @click="onSort(item,index,$event)">{{ item.name }}</span>
                                </template>
                                <template v-else>
                                    <dl>
                                        <dt>{{item.name}}</dt>
                                        <dd>
                                            <span v-for="(k,i) of item.children" :key="i" :style="{width: k.width,flexGrow: !k.width?1:'initial'}">{{k.name}}</span>
                                        </dd>
                                    </dl>
                                </template>
                                <span class="sort" v-if="item.isSort&&!item.children" >
                                    <i class="up" :class="{ active: item.order == 'asc' }" order="asc"></i>
                                    <i class="down" :class="{ active: item.order == 'desc' }" order="desc"></i>
                                </span>
                            </th>
                        </tr>
                        <template>
                            <tr class="tbody-content" v-for="(item, index) in bodyData" :key="index">
                                <td
                                    class="info-box" 
                                    v-for="(colItem, colIndex) in head" 
                                    :key="colIndex"                                
                                    @click="handleClick(item, colItem)"
                                    :style="{width: colItem.width,flexGrow: (colItem.width||fixed)?'initial':1}"
                                    :class="[colItem.class,{'is-right': colItem.align=='right','is-left':colItem.align=='left'}]"
                                >
                                                                              
                                        <template v-if="!colItem.children">
                                            <!-- 无属性  插槽 -->
                                            <div v-if="!colItem.prop" @click.stop="doThis($event, item)" class="cell">
                                                <slot name="default"></slot> 
                                            </div>
                                            <!-- 其他  有属性  插槽 -->
                                            <slot :name="colItem.prop" v-else-if="colItem.prop" :row="item" :styles="colItem.style">
                                            <!-- v-html  替换原有值 -->
                                                <div v-if="item['html'+colItem.prop]" v-html="item['html'+colItem.prop]"></div>
                                                <!-- 某一列的所有行根据值来设置颜色 -->
                                                <div class="cell" :style="{color: colItem.color[item[colItem.colorProp]]}" v-else-if="colItem.colorProp">{{item[colItem.prop]|filterList(colItem.prop)}}</div>
                                                <!--插槽带过来的值  或者 默认值 -->
                                                <div class="cell" :style="colItem.style?colItem.style:setColor(item[colItem.prop],colItem.prop)" v-else>{{item[colItem.prop]|filterList(colItem.prop)}}</div>
                                            </slot>
                                        </template>
                                        <template v-else>
                                            <ul>
                                                <li v-for="(k,i) of colItem.children" :key="i" :style="{width: k.width,flexGrow: !k.width?1:'initial'}">{{item[k.prop]|filterList(k.prop)}}</li>
                                            </ul>
                                        </template>
                                
                                </td>
                              
                                <slot name="tableTip" :row="item" :tip="head[0].tip" @click.stop.capture="doThis($event, item)"></slot>
                            </tr>
                            <tr :class="['tbody-content',{'fix-conent':fixed}]" style="height:80px;position: relative;" v-if="!bodyData.length"><span class="no-content">暂无数据</span></tr>
                        </template>
                    </tbody>
                </table>
            </div>
            <!-- 覆盖的左侧表格 -->
            <div class="table-left-container table-fixed-wrapper" v-if="fixed">
                <table class="table-left" border="0" cellpadding="0" cellspacing="0" :class="{ 'norem-table-fixed-left': isLeft }">
                    <tbody class="tbody">
                        <tr class="title-tr table-header">
                            <th :style="{width: head[0].width,flexGrow: head[0].width?'initial':1}"
                            :class="[{'is-right': head[0].align=='right','is-left':head[0].align=='left'}]"
                            >
                         
                                <template v-if="!head[0].children">
                                    {{ head[0].name }}
                                </template>
                                <template v-else>
                                    <dl>
                                        <dt>{{head[0].name}}</dt>
                                        <dd>
                                            <span v-for="(k,i) of head[0].children" :key="i" :style="{width: k.width,flexGrow: !k.width?1:'initial'}">{{k.name}}</span>
                                        </dd>
                                    </dl>
                                </template>
                            </th>
                        </tr>
                        <template>
                            <tr class="tbody-content" v-for="(item, index) in bodyData" :key="index">
                                <td class="info-box" v-if="head[0].prop" :style="{width: head[0].width,flexGrow: head[0].width?'initial':1}"
                                :class="[{'is-right': head[0].align=='right','is-left':head[0].align=='left'}]" @click="handleClick(item, head[0])">
                                    
                                    <template v-if="!head[0].children">
                                        <!-- 其他  有属性  插槽 -->
                                        <slot :name="head[0].prop" :row="item" :styles="head[0].style">
                                            <div v-html="item['html'+head[0].prop]" v-if="item['html'+head[0].prop]"></div>
                                            <div class="cell" :style="{color: head[0].color[item[head[0].colorProp]]}" v-else-if="head[0].colorProp">{{item[head[0].prop]}}</div>
                                            <div class="cell" :style="head[0].style" v-else>{{item[head[0].prop]}}</div>
                                        </slot>
                                    </template>
                                    <template v-else>
                                        <ul>
                                            <li v-for="(k,i) of head[0].children" :key="i" :style="{width: k.width,flexGrow: !k.width?1:'initial'}">{{item[k.prop]}}</li>
                                        </ul>
                                    </template>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- 动态箭头 -->
        <div class="arrow"></div>
    </div>
</template>
 
<script>
import mixin from '../../../common/mixin';
// 满足条件左侧固定   排序   点击某一个单元格
    export default {
        mixins: [mixin],
        props: {
            // 表头内容
            headData: {
                type: Array,
                default: () => []
            },
            // 表格内容
            bodyData: {
                type: Array,
                default: () => []
            },
            // 是否要固定左边列
            fixed: {
                type: Boolean,
                default: () => false
            },
            tdSlot: {
                type: Boolean,
                default: () => false
            },
            // 是否要动态箭头
            arrow_left: {
                type: Boolean,
                default: () => true
            },
            defaultSort: {
                type: Object,
                default: () => {
                    return {
                        prop: '',
                        order: 'desc'
                    }
                }
            }
        },
        data() {
            return {
                isLeft: false,
                head: []
            };
        },
        created() {

            this.headData.map(item=>{
                
                if(item.prop == this.defaultSort.prop) {
                    item.order = this.defaultSort.order
                }
                this.head.push(item)
            })
    
        },
        methods: {
            doThis(e, item) {
                // e.target.dataset.func是父组件操作下面元素的属性data-func
                this.$emit(e.target.dataset.func, item)
            },
            // 排序
            onSort(item, index, e){
                for(var i = 0; i < this.head.length; i++){
                    if(this.head[i].order != item.order){
                        this.head[i].order = ''
                    }
                }
                
                var order = e.target.getAttribute('order')

                if(!order&&!item.order || item.order == 'asc') {
                    order = 'desc'
                }else if(!order && item.order == 'desc') {
                    order = 'asc'
                }
                // 避免重复请求
                item.order = order
                this.head.splice(index,1, item)
                console.log()
                // 把该数据给父组件过去，并触发父组件排序事件
                this.$emit('sortChange', item)
            },
            handleClick(row, cloumn) {

                let param = {
                    prop: cloumn.prop,
                    value: row[cloumn.prop]
                }
                if(param.prop&&!param.value)return
                param = Object.assign({},row,param)
                this.$emit('cell-click',param)
            }
        },
        mounted() {
            if(!this.fixed) {
                this.$refs.table.style.width = this.$refs.tableScrollBox.offsetWidth + 'px'
            }

            this.$refs.tableScrollBox.addEventListener("scroll",() => {
                    if(this.$refs.tableScrollBox.scrollLeft > 0){
                        this.isLeft = true;
                    }else{
                        this.isLeft = false;
                    }
                },
                true
            );
        },
    };
</script>
<style lang="less" scoped>
@primary_color: #617DEF;
.product-list{
    position: relative;
    overflow: hidden;
    .table-left{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        background: #fff;
        border-collapse: collapse;
        text-align: left;
    }
    .table-scroll-container {
        overflow-x: scroll;
        overflow-y: hidden;
        width: 100%;
    }
    .table-scroll{
        border-collapse: collapse;
        text-align: left;
        background-color: #fff;
 
        .tbody-content{
            .no-content{
                display: block;
                // width: 100vw;
                position: absolute;
                padding: 0;
                text-align: center;
                line-height: 80px;
                position: relative;
                // left: 50%;
                left: 3.45rem;
                transform: translate(-50%);
            }
        }
        // .fix-conent>.no-content{
        //     left: 3.45rem;
        // }
    }
    tr{
        height: 45px;
        position: relative;
    }
    .tbody, tr{
        width: 100%;
    }
    .title-tr, .tbody-content{
        display: flex;
        th, td{
            flex-grow: 1;
            height: 100%;
            line-height: 45px;
        }
        .cell{
            height: 100%;
        }
        .is-right{
            text-align: right;
        }
        .is-left{
            text-align: left;
        }
    }
    .title-tr{
        font-size:12px;
        font-weight:400;
        color: #666;
        height: 32px;
        th{
            line-height: 32px;
            dt, dd{
                height: 16px;
                line-height: 16px;
                display: flex;
                justify-content: center;
                align-content: center;
            }
        }
    }
    div::-webkit-scrollbar {
        width: 0;
        height: 0;
    }
 
    th,td{
        word-break: keep-all;
        white-space:nowrap;
        text-align: center;
        box-sizing: border-box;
    }
 
 
    th{
        line-height: 32px;
        i{
            display: block;
            width: 0;
            height: 0;
            color: #a6a6a6;
            border: 6px solid transparent;
            position: absolute;
        }
 
        .sort{
            display: inline-block;
            width: 12px;
            height: 100%;
            padding: 0;
            position: relative;
            vertical-align: middle;
            .up{
                border-bottom-color: #c0c4cc;
                top: 2px;
                &.active{
                    border-bottom-color: #0057FF;
                }
            }
            .down{
                border-top-color: #c0c4cc;
                bottom: 2px; 
                &.active{
                    border-top-color: #0057FF;
                }
            }
        }
    }
    .cell{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .info-box ul{
        display: flex;
    }
 
    .scrollno{
        overflow-x: hidden;
    }
 
    .ta-c {
        text-align: center;
        height: 100%;
    }
 
    .norem-table-fixed-left{
        box-shadow: 1px -3px 6px #00000029;
    }
 
    .add{
        font-size: 16px;
        vertical-align: text-top;
        color: @primary_color;
    }
}
.arrow {
    display: block;
    width: 10px;
    height: 10px;
    position: fixed;
    top: 50%;
    right: 0;
    margin-left: -11px;
    border: 3px solid transparent;
    border-top: 3px solid @primary_color;
    border-left: 3px solid @primary_color;
    z-index: 99;
    opacity: .8;
    transform: rotate(313deg);
    animation: arrow 1.5s infinite ease-in-out;
}

@keyframes arrow {
    0% {
        opacity:0.2;
        transform:translate(0, 0px) rotate(313deg)
    }
    50% {
        opacity:1;
        transform:translate(-5px, 0) rotate(313deg)
    }
    100% {
        opacity:0.2;
        transform:translate(-10px, 0) rotate(313deg)
    }
}
</style>