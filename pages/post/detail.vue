<template>
<div class="detailBox">
    <el-row type="flex" justify="space-between">
        <!-- 左边栏 -->
        <div class="detailLeft">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/post' }">旅游攻略</el-breadcrumb-item>
                <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
            </el-breadcrumb>
            <!-- 标题 -->
            <h1 class="detailTitle">{{wenzhang.title}}</h1>
            <!-- 说明 -->
            <div class="detailInfo">
                <span>发布时间：{{wenzhang.city.created_at}}</span>
                <span>阅读：{{wenzhang.watch}}</span>
            </div>
            <!-- 内容 -->
            <div class="detailContent" v-html="wenzhang.content"></div>
            <!-- 评论，收藏，分享，点赞 -->
            <div class="post-ctrl">
                <el-row type="flex" justify="center">
                    <div class="ctrl-item">
                        <i class="iconfont iconpinglun"></i>
                        <p>评论(100)</p>
                    </div>
                    <div class="ctrl-item">
                        <i class="iconfont iconstar1"></i>
                        <p>收藏</p>
                    </div>
                    <div class="ctrl-item">
                        <i class="iconfont iconfenxiang"></i>
                        <p>分享</p>
                    </div>
                    <div class="ctrl-item">
                        <i class="iconfont iconding"></i>
                        <p>点赞({{wenzhang.like||0}})</p>
                    </div>
                </el-row>
            </div>
            <!-- 评论列表 -->
            <div class="comment">
                <!-- 标题 -->
                <h4>评论</h4>
                <!-- 回复@ -->
                <el-tag v-show='isshow' closable type="info" style="margin-bottom: 10px;"  @close="handleClose">
                    回复 @{{replyTxt}}
                </el-tag>
                <!-- 输入框 -->
                <div class="comment-input">
                    <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="content" resize='none'>
                    </el-input>
                </div>
                <!-- 上传 -->
                <el-row type="flex" justify="space-between">
                    <div>
                        <!-- 图片上传 :headers="{Authorization:'Bearer '+this.$store.state.user.userInfo.token}" -->
                        <el-upload action="http://127.0.0.1:1337/upload" list-type="picture-card" :on-success="coverSuccess" name="files" >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <!-- 图片预览 -->
                        <el-dialog :visible.sync="dialogVisible" size="tiny">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </div>
                    <div>
                        <el-button size="small" type="primary" @click="tijiao">提交</el-button>
                    </div>
                </el-row>
                
                <!-- 评论列表 -->
                <div class="comment-list">
                    <div class="comment-item" v-for="(item,index) in dataList" :key="index">
                        <!-- 评论人信息 -->
                        <div class="comment-info">
                            <img :src="$axios.defaults.baseURL+item.account.defaultAvatar" alt="">
                            {{item.account.nickname}}
                            <i>2020-01-07 3:28</i>
                            <span>1</span>
                        </div>
                        <!-- 评论内容、图片 -->
                        <div class="comment-content">
                            <!-- 二级评论 -->
                            <Comment v-if="item.parent" :comment="item.parent" />
                            <!-- 一级评论 -->
                            <div class="comment-new">
                                <p class="comment-message">{{item.content}}</p>
                                <el-row type="flex">
                                    <div v-show="item.pics.length!==0" class="comment-pic" v-for="(imgs,i) in item.pics" :key="i">
                                        <img :src="$axios.defaults.baseURL+imgs.url" alt="">
                                    </div>
                                </el-row>
                                <div class="comment-ctrl">
                                    <span @click="reply(item)">回复</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 分页 -->
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageIndex"
                    :page-sizes="[2, 4, 6, 8]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="comments.length">
                </el-pagination>

            </div>
        </div>
        <!-- 右边栏 -->
        <div class="detailRight">
            <h4 class="titleRight">相关攻略</h4>
            <div class="listRight">
                <a href="#" class="item">
                    <el-row type="flex" justify="space-between">
                        <img :src="$axios.defaults.baseURL+'/assets/images/pic_sea.jpeg'" class="item-img">
                        <div class="item-info">
                            <div>aaa</div>
                            <p>2019-05-22 10:57 阅读：12685</p>
                        </div>
                    </el-row>
                </a>
            </div>
        </div>
    </el-row>
</div>
</template>

<script>
import Comment from '@/components/post/comment'

export default {
    data () {
        return {
            // 文章信息
            wenzhang:{city:{}},
            dialogImageUrl: '',
            dialogVisible: false,
            // 评论列表
            comments:'',
            // 提交评论时的内容参数
            content:'',
            // 提交评论时图片的参数
            pics:[],
            // 分页数据
            pageIndex:1,
            pageSize:2,
            // 回复数据
            isshow:false,
            replyTxt:'',
            replyid:''
        }
    },
    methods: {
        // 图片上传成功回调
        coverSuccess (response, file, fileList) {
            // console.log(response);
            this.pics.push(response[0])
            // console.log(file);
            // console.log(fileList);
        },
        // 提交评论
        tijiao(){
            // isshow为true的时候说明是在回复
            if(this.isshow==true){
                this.content=''
                this.isshow=false
                this.setComment('评论成功~',this.replyid)
            }else{
                this.setComment('评论成功~')
            }
        },
        // 封装一个获取评论列表的函数
        getComments(){
            // 获取文章列表
            this.$axios({
                url:'/posts/comments'
            }).then(res=>{
                this.comments=res.data.data
            })
        },
        // 封装一个提交评论的函数
        setComment(msg,id){
            this.$axios({
                url:'/comments',
                method:'POST',
                data:{
                    pics:this.pics,
                    content:this.content,
                    post:this.$route.query.id,
                    follow:id
                },
                headers:{
                    Authorization:'Bearer '+this.$store.state.user.userInfo.token,
                    'Content-Type':'application/json;charset=UTF-8'
                },
            }).then(res=>{
                if(res.data.message==='提交成功'){
                    this.$message.success(msg)
                    this.getComments()
                }
            })
        },
        // 选择 N/页 时触发
        handleSizeChange(value){
            this.pageIndex=1;
            this.pageSize=value
        },
        // 点击 页码 时触发
        handleCurrentChange(value){
            this.pageIndex=value
        },
        // 回复
        reply(item){
            this.isshow=true
            this.replyid=item.id
            this.replyTxt=item.account.nickname
            // 点击调到输入框的位置
            document.documentElement.scrollTop = document.body.scrollTop = window.pageYOffset=1917
        },
        handleClose(){
            this.isshow=false
        }
    },
    // 计算属性制作分页功能
    computed: {
        dataList(){
            if(!this.comments) return [];
            const end = this.pageIndex*this.pageSize
            const start = (this.pageIndex-1)*this.pageSize
            return this.comments.slice(start,end)
        }  
    },
    mounted () {
        // 获取文章信息
        this.$axios({
            url:'/posts',
            data:{
                id:this.$route.query.id
            }
        }).then(res=>{
            this.wenzhang=res.data.data.filter(v=>{
                return v.id==this.$route.query.id
            })[0]
        })
        // 获取文章列表
        this.getComments()
    },
    components: {
        Comment
    }

}
</script>

<style lang="less" scoped>
.detailBox{
    width: 1000px;
    margin: 0 auto;
    padding: 20px 0;
    // 左边栏
    .detailLeft{
        width: 700px;
        /deep/.detailContent img{
            margin: 10px 0;
            max-width: 700px!important;
        }
        // 标题
        .detailTitle{
            padding: 20px 0;
            border-bottom: 1px solid #ddd;
        }
        // 说明
        .detailInfo{
            color: #999;
            padding: 20px;
            text-align: right;
            span{
                margin-left: 20px;
            }
        }
        // 收藏点赞
        .post-ctrl{
            padding: 50px 0 30px;
            .ctrl-item{
                margin: 0 20px;
                font-size: 20px;
                cursor: pointer;
                text-align: center;
                i{
                    display: block;
                    font-size: 28px;
                    color: orange;
                }
                p{
                    color: #999;
                    margin-top: 5px;
                    font-size: 14px;
                }
            }
        }
        // 评论列表
        .comment{
            margin-bottom: 20px;
            >h4{
                font-size: 18px;
                font-weight: 400;
                margin-bottom: 20px;
            }
            .comment-input{
                margin-bottom: 10px;
            }
            // 评论列表
            .comment-list{
                margin-top: 30px;
                margin-bottom: 10px;
                border: 1px solid #ddd;
                .comment-item{
                    padding: 20px 20px 5px;
                    border-bottom: 1px dashed #ddd;
                    // 评论人信息
                    .comment-info{
                        color: #666;
                        font-size: 12px;
                        margin-bottom: 10px;
                        img{
                            width: 16px;
                            height: 16px;
                            border-radius: 50%;
                        }
                        i{
                            color: #999;
                        }
                        span{
                            float: right;
                        }
                    }
                    .comment-content{
                        padding-left: 30px;
                        .comment-new{
                            // 评论内容
                            .comment-message{
                                margin-top: 10px;
                            }
                            // 评论内容图片盒子
                            .comment-pic{
                                width: 80px;
                                height: 80px;
                                padding: 5px;
                                overflow: hidden;
                                margin-top: 10px;
                                margin-right: 5px;
                                border-radius: 6px;
                                border: 1px dashed #ddd;
                                /deep/img{
                                    display: block;
                                    width: 100%;
                                    height: 100%;
                                    cursor: pointer;
                                    object-fit: cover;
                                    -o-object-fit: cover;
                                }
                            }
                            // 鼠标移入显示的回复
                            .comment-ctrl{
                                height: 20px;
                                font-size: 12px;
                                color: #1e50a2;
                                text-align: right;
                                line-height: 20px;
                                &:hover span{
                                    display: inline-block;
                                }
                                span{
                                    display: none;
                                    &:hover{
                                        cursor: pointer;
                                        text-decoration: underline;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        /deep/.el-upload-list li,/deep/.el-upload{
            width: 100px;
            height: 100px;
            line-height: 100px;
        }
    }
    // 右边栏
    .detailRight{
        width: 280px;
        .titleRight{
            font-size: 18px;
            font-weight: 400;
            padding-bottom: 10px;
            border-bottom: 1px solid #ddd;
        }
        .item{
            display: block;
            padding: 20px 0;
            border-bottom: 1px solid #ddd;
            .item-img{
                display: block;
                width: 100px;
                height: 80px;
                flex-shrink: 0;
                overflow: hidden;
                object-fit: cover;
                background: #ddd;
                margin-right: 10px;
            }
            .item-info{
                flex: 1;
                position: relative;
                >div{
                    width: 100%;
                    height: 45px;
                    overflow: hidden;
                    position: absolute;
                    padding-left: 3px;
                    top: 0;
                    left: 0px;
                }
                >p{
                    color: #999;
                    font-size: 12px;
                    position: absolute;
                    left: 0;
                    bottom: 0;
                }
            }
        }
    }
}
</style>
