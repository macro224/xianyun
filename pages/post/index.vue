<template>
    <section class="container">
        <el-row type="flex" justify="space-between">
            <el-col class="menuBox">
                <!-- 左边栏组件 -->
                <LeftPost/>
            </el-col>
            <el-col class="sosuoBox">
                <el-row class="sosuo_kuang" type="flex" justify="space-between" align="middle">
                    <input type="text" placeholder="请输入想去的地方，比如：'广州'">
                    <i class="el-icon-search"></i>
                </el-row>
                <div class="sosuo_tuijian">
                    推荐：
                    <span><a href="#">广州</a></span>
                    <span><a href="#">上海</a></span>
                    <span><a href="#">北京</a></span>
                </div>
                <!-- 右边栏组件 -->
                <RightPost/>
            </el-col>
        </el-row>
    </section>
</template>

<script>
import LeftPost from '@/components/post/leftPost'
import RightPost from '@/components/post/rightPost'

export default {
    components: {
        LeftPost,RightPost
    }
}
</script>

<style scoped lang="less">
.container{
    width:1000px;
    margin:0 auto;
    padding: 20px 0;
    // 左边栏
    .menuBox{
        width: 260px;
        box-sizing: border-box;
    }
    // 右边栏搜索框
    .sosuoBox{
        width: 700px;
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
                margin-right: 5px;
                a:hover{
                    color: orange;
                    text-decoration: underline;
                }
            }
        }
    }
}

</style>