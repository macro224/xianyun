<template>
    <div class="container">
        <!-- 主要内容 -->
        <el-row 
        type="flex" 
        justify="center" 
        align="middle" 
        class="main">

            <div class="form-wrapper">
                <!-- 表单头部tab -->
                <el-row type="flex" justify="center" class="tabs">
                    <span :class="{active: current === index}" 
                    v-for="(item, index) in [`登录`, `注册`]"
                    :key="index" 
                    @click="handleChangeTab(index)">
                        {{item}}
                    </span>
                </el-row>

                <!-- 登录功能组件 -->
                <LoginForm v-if="current == 0"/>

                <!-- 注册功能组件 -->
                <ZhuceForm v-if="current == 1" @zhuce="current=0"/>
            </div>
        </el-row>
    </div>
</template>

<script>
import LoginForm from '@/components/user/loginForm'
import ZhuceForm from '@/components/user/zhuceForm'

export default {
    data(){
        return {
            current: 0
        }
    },
    methods: {
        // tab栏点击切换
        handleChangeTab(index){
            this.current = index;
        },
    },
    components: {
        LoginForm,ZhuceForm
    }
}
</script>

<style scoped lang="less">
.container{
    background:url(http://157.122.54.189:9095/assets/images/th03.jfif) center 0;
    height: 700px;
    min-width:1000px;

    .main{
        width:1000px;
        height: 100%;
        margin:0 auto;
        position: relative;
        
        .form-wrapper{
            width:400px;
            margin:0 auto;
            background:#fff;
            box-shadow: 2px 2px 0 rgba(0,0,0,0.1);
            overflow:hidden;
            
            .tabs{
                span{
                    display: block;
                    width:50%;
                    height: 50px;
                    box-sizing: border-box;
                    border-top:2px #eee solid;
                    background:#eee;
                    line-height: 48px;
                    text-align: center;
                    cursor: pointer;
                    color:#666;

                    &.active{
                        color:orange;
                        border-top-color: orange;
                        background:#fff;
                        font-weight: bold;
                    }
                }
            }
        }
    }
}
</style>
