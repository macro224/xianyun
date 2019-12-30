<template>
    <el-form 
        :model="form" 
        ref="form" 
        :rules="rules" 
        class="form">
            <!-- 手机号码/用户名 输入框 -->
            <el-form-item class="form-item" prop="username">
                <el-input 
                placeholder="用户名/手机"
                v-model="form.username">
                </el-input>
            </el-form-item>

            <!-- 手机验证码 输入框 -->
            <el-form-item class="form-item" prop="captcha">
                <el-input 
                placeholder="验证码" 
                v-model="form.captcha">
                    <template slot="append">
                        <el-button @click="handleSendCaptcha">
                            发送验证码
                        </el-button>
                    </template>
                </el-input>
            </el-form-item>

            <!-- 昵称 输入框 -->
            <el-form-item class="form-item" prop="nickname">
                <el-input 
                placeholder="你的名字"
                v-model="form.nickname">
                </el-input>
            </el-form-item>

            <!-- 密码 输入框 -->
            <el-form-item class="form-item" prop="password">
                <el-input 
                placeholder="密码" 
                type="password"
                v-model="form.password">
                </el-input>
            </el-form-item>

            <!-- 确认密码 输入框 -->
            <el-form-item class="form-item" prop="conpassword">
                <el-input 
                placeholder="确认密码" 
                type="password"
                v-model="form.conpassword">
                </el-input>
            </el-form-item>

            <el-button 
            class="submit" 
            type="primary" 
            @click="handleRegSubmit">
                注册
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
        // 确认密码的验证规则
        const validatepass= (rule, value, callback) => {
            if(value&&value!==this.form.password){
                callback('两次输入的密码不一致！')
            }else if(value===''){
                callback('请再次输入密码')
            }else{
                callback()
            }
        }
        return {
            // 表单数据
            form: {
                username:'',    //手机号码/用户名
                nickname:'',    //昵称
                captcha:'',     //验证码
                password:'',    //密码
                conpassword:''  //确认密码
            },
            // 表单规则
            rules: {
                username:[
                    { validator: validateuser, trigger: 'blur' }
                ],
                nickname:[
                    { required: true, message: '请输入昵称', trigger: 'blur' }
                ],
                captcha:[
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ],
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                conpassword:[
                    { validator: validatepass, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        // 发送验证码
        handleSendCaptcha(){

        },


        // 注册
        handleRegSubmit(){
        //    console.log(this.form)
            //  表单验证
            this.$refs.form.validate(vali=>{
                if(!vali) return this.$message.success('格式输入不正确，请重新输入！')
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