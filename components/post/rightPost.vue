<template>
<div class="rightPost">
    <el-row class="sosuo_kuang" type="flex" justify="space-between" align="middle">
        <input type="text" placeholder="请输入想去的地方，比如：'广州'" ref="sosuoInput">
        <i class="el-icon-search" @click="sosuoClick"></i>
    </el-row>
    <div class="sosuo_tuijian">
        推荐：
        <span @click="tuijianClick(item)" v-for="(item,index) in ['广州','上海','北京']" :key="index">{{item}}</span>
    </div>

    <!-- 标题 -->
    <el-row class="title" type="flex" justify="space-between" align="middle">
        <h4>推荐攻略</h4>
        <el-button type="primary" @click="$router.push('/post/create')"><i class="el-icon-edit"></i><span>写游记</span></el-button>
    </el-row>
    <!-- 内容 -->
    <div class="post_item" @click="$router.push(`/post/detail?id=${item.id}`)" v-for="(item,index) in postComputed" :key="index">
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
            <!-- 图片 -->
            <div class="post_item_cover">
                <a href="#"><img :src="item.images[0]" alt=""></a>
            </div>
            <!-- 内容 -->
            <div class="post_item_content">
                <!-- 标题 -->
                <h4 class="post_item_title"><a href="#">{{item.title}}</a></h4>
                <!-- 文章 -->
                <p class="post_item_desc"><a href="#">{{item.summary}}</a></p>
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
        // 点击搜索图案
        sosuoClick(){
            this.getPostList(this.$refs.sosuoInput.value)
        },
        // 点击推荐城市
        tuijianClick(item){
            this.getPostList(item)
        },
        // 封装获取文章列表的函数
        getPostList(v){
            if(v.trim()===''){
                this.$axios({
                    url:'/posts'
                }).then(res=>{
                    this.postList=res.data.data
                })
            }else{
                this.$axios({
                    url:'/posts',
                    params:{
                        city: v
                    }
                }).then(res=>{
                    this.postList=res.data.data
                })
            }
        },
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
    watch: {
        $route(){
            this.getPostList(this.$route.query.city)
        }  
    },
    // 获取文章列表
    mounted () {
        this.getPostList('')
    }
}
</script>

<style lang="less" scoped>
.rightPost{
    // 搜索框
    .sosuo_kuang{
        width: 100%;
        height: 40px;
        line-height: 40px;
        box-sizing: border-box;
        border: 3px solid orange;
        input{
            flex: 1;
            border: none;
            outline: none;
            padding: 0 20px;
            background: none;
            line-height: 40px;
        }
        i{
            font-size: 24px;
            color: orange;
            font-weight: 700;
            margin-right: 10px;
        }
    }
    // 搜索推荐
    .sosuo_tuijian{
        color: #666;
        padding: 10px 0;
        font-size: 12px;
        span{
            cursor: pointer;
            margin-right: 5px;
            &:hover{
                color: orange;
                text-decoration: underline;
            }
        }
    }
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
