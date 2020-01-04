<template>
<div class="rightPost">
    <!-- 标题 -->
    <el-row class="title" type="flex" justify="space-between" align="middle">
        <h4>推荐攻略</h4>
        <el-button type="primary"><i class="el-icon-edit"></i><span>写游记</span></el-button>
    </el-row>
    <!-- 内容 -->
    <div class="post_item" v-for="(item,index) in postComputed" :key="index">
        <!-- 多张图片 -->
        <div v-if="item.images.length>=3">
            <!-- 标题 -->
            <h4 class="post_item_title"><a href="#">{{item.title}}</a></h4>
            <!-- 文章 -->
            <p class="post_item_desc"><a href="#">{{item.summary}}</a></p>
            <!-- 图片 -->
            <el-row class="post_item_img" type="flex" justify="space-between">
                <a href="#" v-for="(imglist,index) in item.images.slice(0,3)" :key="index">
                    <img :src="imglist">
                </a>
            </el-row>
            <!-- 说明 -->
            <el-row class="post_item_info" type="flex" justify="space-between">
                <el-row class="post_item_info_left" type="flex" justify="space-between" align="middle">
                    <span><i class="el-icon-location-outline"></i> {{item.cityName}}</span>
                    <el-row class="post_user" type="flex" align="middle">
                        by 
                        <a href="#">
                            <img :src="$axios.defaults.baseURL+item.account.defaultAvatar" alt="">
                        </a>
                        <a href="#">{{item.account.nickname}}</a>
                    </el-row>
                    <span><i class="el-icon-view"></i> {{item.watch}}</span>
                </el-row>
                <div class="post_item_info_right">73 赞</div>
            </el-row>
        </div>
        <!-- 一张图片 -->
        <el-row v-if="item.images.length<3" type="flex" justify="space-between">
            <div class="post_item_cover">
                <a href="#"><img :src="item.images[0]" alt=""></a>
            </div>
            <div class="post_item_content">
                <h4 class="post_item_title"><a href="#">塞班贵？一定是你的打开方式不对！6000块玩转塞班</a></h4>
                <p class="post_item_desc"><a href="#">大家对塞班岛总存在着这样的误解，知道它是美属地盘，就理所当然地觉得这里的花费一定很高，花费高有高的玩法，那如果只有6000块的预算呢？要怎么玩？关于旅行这件事，我们要让钱花得更有道理，收下这份攻略，带你6000块花式玩转塞班。图：塞班岛。 by第5季旅游一、怎样用6000块玩转塞班？大多数出境游客人不做预算或最终花费远远超出预算，对预算的合理分配对控制我们旅行的花费就很重要了，如何只花6000块玩转塞班岛，对预算超支say no？下面从5个方面来为您一一解读：机票+酒店、岛上交通、玩乐项目、吃以及购买纪念品。1.怎样订机票+酒店性价比最高？机票和酒店的花销往往会占据我们旅行大半的花销，假设机票酒店为塞班行预算的一半，剩下的吃行玩购为预算的另一半，如果能在机票酒店这部分省下钱，也就意味着在塞班岛用来吃行玩购的钱就增加了怎样去塞班？可以转机也可以直飞，转机大多会从韩国转，提前蹲守能买到韩国飞塞班的特价机票，2000以下就能入手，加上国内飞韩国的机票来回塞班得5000+，还没算上在塞班的住宿费用，转机还有中途等待的时间，光花在路途上的时间就比直飞要多上一倍甚至更多，转乘奔波劳累，非联程票还要担心行李托运问题，所以建议大家有直飞还是尽量选择直飞。在酒店上，旅途中我们呆在酒店的时间远比在外游玩的时间少，酒店干净整洁基本就能满足我们休息的需求，塞班不是个享受酒店的地方而且还真不能跟国内星级酒店等位比较，所以不建议大家花过多的钱在塞班的酒店体验上。怎样在机票酒店上获得最高性价比的体验？ 直飞塞班的航班一般和酒店一起打包成机票+酒店套餐，价格要比单定机票、酒店要更加便捷实惠，往往3千多就能把机票和酒店一键搞定。</a></p>
                <el-row class="post_item_info" type="flex" justify="space-between">
                    <el-row class="post_item_info_left" type="flex" justify="space-between" align="middle">
                        <span><i class="el-icon-location-outline"></i> 北京市</span>
                        <el-row class="post_user" type="flex" align="middle">
                            by 
                            <a href="#">
                                <img :src="$axios.defaults.baseURL+'/assets/images/avatar.jpg'" alt="">
                            </a>
                            <a href="#">地球发动机</a>
                        </el-row>
                        <span><i class="el-icon-view"></i>12631</span>
                    </el-row>
                    <div class="post_item_info_right">73 赞</div>
                </el-row>
            </div>
        </el-row>
    </div>
    <!-- 分页 -->
    <div class="fenye">
        <el-pagination
        :page-size="pageSize"
        :total="postList.length"
        :current-page="pageIndex"
        :page-sizes="[3, 6, 9, 12]"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes, prev, pager, next, jumper"></el-pagination>
    </div>
</div>
</template>

<script>

export default {
    data () {
        return {
            postList:[],
            pageIndex:1,
            pageSize:3
        }
    },
    computed: {
        // 计算属性计算截取个数用于分页
        postComputed(){
            if(!this.postList) return [];
            const start = (this.pageIndex-1)*this.pageSize
            const end = this.pageIndex*this.pageSize
            return this.postList.slice(start,end)
        }  
    },
    methods: {
        // 点击 N条/页时触发
        handleSizeChange(value){
            this.pageIndex=1
            this.pageSize=value
        },
        // 点击页码时触发
        handleCurrentChange(value){
            this.pageIndex=value
        }
    },
    mounted () {
        this.$axios({
            url:'/posts'
        }).then(res=>{
            this.postList=res.data.data
        })
    }
}
</script>

<style lang="less" scoped>
.rightPost{
    // 标题
    .title{
        position: relative;
        padding-bottom: 10px;
        border-bottom: 1px solid #eee;
        h4{
            font-size: 18px;
            color: orange;
            font-weight: 400;
            &::before{
                display: block;
                content: "";
                width: 72px;
                height: 2px;
                background: orange;
                position: absolute;
                bottom: 0;
                left: 0;
            }
        }
    }
    // 内容列表
    .post_item{
        width: 100%;
        padding: 20px 0;
        border-bottom: 1px solid #eee;
        // 标题栏
        .post_item_title{
            font-size: 18px;
            font-weight: 400;
            margin-bottom: 15px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            a:hover{
                color: orange;
            }
        }
        // 文章栏
        .post_item_desc{
            height: 63px;
            font-size: 14px;
            line-height: 1.5;
            margin-bottom: 15px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            text-overflow: ellipsis;
            a{
                color: #666;
            }
        }
        // 图片栏
        .post_item_img{
            margin: 15px 0;
            img{
                width: 220px;
                height: 150px;
                display: block;
                object-fit: cover;
                -o-object-fit: cover;
            }
        }
        // 说明
        .post_item_info{
            .post_item_info_left{
                color: #999;
                font-size: 12px;
                span{
                    margin-right: 10px;
                }
                .post_user{
                    margin-right: 10px;
                    a{
                        color: orange;
                        img{
                            display: block;
                            width: 16px;
                            margin: 5px;
                            height: 16px;
                            border-radius: 100px;
                        }
                    }
                }
            }
            .post_item_info_right{
                color: orange;
            }
            
        }

        .post_item_cover{
            width: 220px;
            height: 150px;
            flex-shrink: 0;
            overflow: hidden;
            margin-right: 10px;
            img{
                display: block;
                width: 100%;
                height: 100%;
                object-fit: cover;
                -o-object-fit: cover;
            }
        }
        .post_item_content{
            width: 470px;
        } 
    }
    // 分页
    .fenye{
        margin-top: 15px;
    }
}
</style>
