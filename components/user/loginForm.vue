<template>
    <el-form 
        :model="form" 
        ref="form"
        :rules="rules" 
        class="form">

        <el-form-item class="form-item" prop="username">
            <el-input 
            placeholder="用户名/手机"
            v-model="form.username">
            </el-input>
        </el-form-item>

        <el-form-item class="form-item" prop="password">
            <el-input 
            placeholder="密码" 
            type="password"
            v-model="form.password">
            </el-input>
        </el-form-item>

        <p class="form-text">
            <nuxt-link to="#">忘记密码</nuxt-link>
        </p>

        <el-button 
        class="submit"
        type="primary"
        @click="handleLoginSubmit">
            登录
        </el-button>
    </el-form>

</template>

<script>
export default {
    data(){
        // 手机号码/用户名的验证规则
        const validateuser= (rule, value, callback) => {
            // 正则表达式
            const reg=/^1[3-9][0-9]{9}$/;
            if(reg.test(value)){
                callback()
            }else if(value===''){
                callback('请输入手机号码/用户名')
            }else{
                callback('请输入正确格式的手机号码')
            }
        }
        return {
            // 表单数据
            form: {
                username:'13800138000',
                password:'123456'
            },
            // 表单规则
            rules: {
                username:[
                    { validator: validateuser, trigger: 'blur' }
                ],
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        // 提交登录
        handleLoginSubmit(){
            // 表单验证判断
            this.$refs.form.validate(valid => {
                if(!valid) return this.$message.success('格式输入有误，请重新输入！')
                // 发送登录请求
                this.$axios({
                    method:'POST',
                    url:'/accounts/login',
                    data:this.form
                }).then(res=>{
                    this.$message.success('登录成功~')
                    // 本地存储token值
                    localStorage.setItem('xianyun',res.data.token)
                    // 登录成功后跳转回上一页
                    this.$router.back()
                })
            })
        }
    }
}
</script>

<style scoped lang="less">
    .form{
        padding:25px;
    }

    .form-item{
        margin-bottom:20px;
    }

    .form-text{
        font-size:12px;
        color:#409EFF;
        text-align: right;
        line-height: 1;
    }

    .submit{
        width:100%;
        margin-top:10px;
    }
</style>
