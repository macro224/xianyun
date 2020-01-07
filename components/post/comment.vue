<template>
    <div class="comment-floor">
        <div class="comment-list">
            <div class="comment-item">
                <!-- 评论人信息 -->
                <div class="comment-info">
                    <img :src="$axios.defaults.baseURL+comment.account.defaultAvatar" alt="">
                    {{comment.account.nickname}}
                    <i>2020-01-07 3:28</i>
                    <span>1</span>
                </div>
                <!-- 评论内容、图片 -->
                <div class="comment-content">
                    <div class="comment-new">
                        <p class="comment-message">{{comment.content}}</p>
                        <el-row type="flex">
                            <div v-show="comment.pics.length!==0" class="comment-pic" v-for="(item,index) in comment.pics" :key="index">
                                <img :src="$axios.defaults.baseURL+item.url" alt="">
                            </div>
                        </el-row>
                        <div class="comment-ctrl">
                            <span>回复</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        comment:{
            type:Object,
            default:{}
        }
    },
    mounted () {
        
    }
}
</script>

<style lang="less" scoped>
.comment-floor{
    padding: 2px;
    background: #f9f9f9;
    border: 1px solid #ddd;
    .comment-list{
        .comment-item{
            padding: 5px 10px 0;
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
</style>
