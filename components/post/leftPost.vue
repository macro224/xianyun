<template>
    <div class="leftPost">
        <!-- 热门城市 -->
        <ul class="leftul">
            <li @mouseenter="yiru(index)" 
            @mouseleave="yichu(index)"
            v-for="(item,index) in remenList" :key="index"
            :class="{active:current===index?true:false}">
                {{item.type}} <i class="el-icon-arrow-right"></i>
            </li>
        </ul>
        <!-- 热门城市右边框 -->
        <div class="rightbox" 
        v-show="current===index?true:false" 
        @mouseenter="yiru(index)" 
        @mouseleave="yichu(index)"
        v-for="(item,index) in remenList" :key="index">
            <ul>
                <li v-for="(info,i) in item.children" :key="i">
                    <nuxt-link :to="`/post?city=${info.city}`">
                        <i>{{i+1}}</i>
                        <strong>{{info.city}}</strong>
                        <span>{{info.desc}}</span>
                    </nuxt-link>
                </li>
            </ul>
        </div>
        <!-- 推荐城市 -->
        <div class="tuijian">
            <h4>推荐城市</h4>
            <img :src="$axios.defaults.baseURL+'/assets/images/pic_sea.jpeg'" alt="">
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            current:'',
            isactive:false,
            remenList:''
        }
    },
    methods: {
        yiru(i){
            this.current=i
            this.isactive=!this.isactive
        },
        yichu(i){
            this.current=''
            this.isactive=!this.isactive
        }
    },
    mounted () {
        this.$axios({
            url:'/posts/cities'
        }).then(res=>{
            console.log(res);
            this.remenList=res.data.data
        })
    }
}
</script>

<style lang="less" scoped>
.leftPost{
    // 热门城市
    ul.leftul{
        border-top: 1px solid #ddd;
        border-left: 1px solid #ddd;
        position: relative;
        z-index: 2;
        li{
            height: 40px;
            padding: 0 20px;
            line-height: 40px;
            border-right: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            display: flex;
            align-items: center;
            justify-content: space-between;
            &.active{
                color: orange;
                border-right-color: #fff;
            }
        }
    }
    .rightbox{
        width: 350px;
        height: 200px;
        padding: 10px 20px;
        background: #fff;
        box-sizing: border-box;
        border: 1px solid #ddd;
        position: absolute;
        top: 0;
        left: 259px;
        z-index: 1;
        li{
            font-size: 14px;
            line-height: 36px;
            i{
                font-size: 24px;
                color: orange;
                vertical-align: middle;
            }
            strong{
                margin: 0 10px;
                color: orange;
                font-weight: normal;
            }
            span{
                color: #999;
            }
            strong:hover,span:hover{
                text-decoration: underline;
            }
        }
    }
    .tuijian{
        margin-top: 20px;
        img{
            width: 100%;
        }
        h4{
            font-weight: 400;
            margin-bottom: 10px;
            padding-bottom: 10px;
            border-bottom: 1px solid #ddd;
        }
    }
}
</style>
