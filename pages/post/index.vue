<template>
    <section class="container">
        <el-row type="flex" justify="space-between">
            <el-col class="menuBox">
                <!-- 左边栏组件 -->
                <LeftPost/>
            </el-col>
            <el-col class="sosuoBox">
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
    }
}

</style>