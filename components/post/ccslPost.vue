<template>
<div class="post-ctrl">
    <el-row type="flex" justify="center">
        <div class="ctrl-item" @click="pinglun">
            <i class="iconfont iconpinglun"></i>
            <p>评论({{wenzhang.comments.length}})</p>
        </div>
        <div class="ctrl-item" @click="shoucang">
            <i :class="['iconfont','iconstar1',{active:shoucanginoff}]"></i>
            <p>收藏</p>
        </div>
        <div class="ctrl-item">
            <i class="iconfont iconfenxiang"></i>
            <p>分享</p>
        </div>
        <div class="ctrl-item">
            <i :class="['iconfont','iconding',{active:dianzaninoff}]"></i>
            <p>点赞({{wenzhang.like||0}})</p>
        </div>
    </el-row>
</div>
</template>

<script>
export default {
    props: {
        wenzhang:{
            type:Object,
            default:{}
        }
    },
    data () {
        return {
            shoucanginoff:false,
            dianzaninoff:false
        }
    },
    methods: {
        // 点击评论图案
        pinglun(){
            this.$message.success('来吧~开始你的表演```')
            // 点击调到输入框的位置
            document.documentElement.scrollTop = document.body.scrollTop = window.pageYOffset=1917
        },
        // 点击收藏图案
        shoucang(){
            this.$axios({
                url:'/posts/star',
                headers:{
                    Authorization:'Bearer '+this.$store.state.user.userInfo.token
                },
                params:{
                    id:this.$route.query.id
                }
            }).then(res=>{
                if(res.data.message==='收藏成功'){
                    this.$message.success(res.data.message)
                    this.shoucanginoff=true
                }
            })
            
        }
    }
}
</script>

<style lang="less" scoped>
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
            &.active{
                color: skyblue
            }
        }
        p{
            color: #999;
            margin-top: 5px;
            font-size: 14px;
        }
    }
}
</style>
