<template>
    <div class="main">
        <!-- 乘机人 -->
        <div class="air-column">
            <h2>乘机人</h2>
            <el-form class="member-info">
                <div class="member-info-item" v-for="(item,index) in users" :key="index">
                    <el-form-item label="乘机人类型">
                        <el-input placeholder="姓名" class="input-with-select" v-model="item.username">
                            <el-select 
                            slot="prepend" 
                            value="1" 
                            placeholder="请选择">
                                <el-option label="成人" value="1"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="证件类型">
                        <el-input placeholder="证件号码" class="input-with-select" v-model="item.id">
                            <el-select slot="prepend" value="1" placeholder="请选择">
                                <el-option label="身份证" value="1" :checked="true"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>
                    <span class="delete-user" @click="handleDeleteUser(index)">-</span>
                </div>
            </el-form>
            <el-button class="add-member" type='primary' @click="handleAddUsers">添加乘机人</el-button>
        </div>
        <!-- 保险 -->
        <div class="air-column">
            <h2>保险</h2>
            <div>
                <div class="insurance-item"  v-for="(item,index) in data.insurances" :key="index">
                    <el-checkbox :label="`${item.type}：￥${item.price}/份×1  最高赔付${item.compensation}元`" @change="baoxianChange(item.id)" border>
                    </el-checkbox> 
                </div>
            </div>
        </div>
        <!-- 联系人 -->
        <div class="air-column">
            <h2>联系人</h2>
            <div class="contact">
                <el-form label-width="60px">
                    <el-form-item label="姓名">
                        <el-input v-model="contactName"></el-input>
                    </el-form-item>

                    <el-form-item label="手机">
                        <el-input placeholder="请输入内容" v-model="contactPhone">
                            <template slot="append">
                            <el-button @click="handleSendCaptcha">发送验证码</el-button>
                            </template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="验证码">
                        <el-input v-model="captcha"></el-input>
                    </el-form-item>
                </el-form>   
                <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
            </div>
        </div>
        <span>{{sumPrice}}</span>
    </div>
</template>

<script>
export default {
    data () {
        return {
            users:[{username:'',id:''}],//用户列表
            insurances:[],  //保险id
            contactName:'地球发动机', //联系人名字
            contactPhone:'13800138000',//联系人电话
            captcha:'',     //手机验证码
            invoice:false  //是否需要发票
        }
    },
    methods: {
        // 添加乘机人
        handleAddUsers(){
            this.users.push({username:'',id:''})
        },
        // 移除乘机人
        handleDeleteUser(i){
            this.users.splice(i,1)
        },
        // 保险
        baoxianChange(id){
            // 判断是否已经存在，有就删除
            if(this.insurances.indexOf(id)>-1){
                this.insurances.splice(this.insurances.indexOf(id),1)
            }else{
                this.insurances.push(id)
            }
        },
        // 发送手机验证码
        handleSendCaptcha(){
            this.$store.dispatch('user/captchas',this.contactPhone).then(res=>{
                this.captcha=res
                this.$message.success('本次验证码为：'+res)
            })
        },
        // 提交订单
        handleSubmit(){
            this.$message.success('订单提交成功，正在跳转到付款页')
            this.$axios({
                url:'/airorders',
                data:{
                    users:this.users,
                    insurances:this.insurances,
                    contactName:this.contactName,
                    contactPhone:this.contactPhone,
                    captcha:this.captcha,
                    invoice:this.invoice,
                    air:this.$route.query.id,
                    seat_xid:this.$route.query.seat_xid
                },
                headers:{
                    Authorization:'Bearer '+this.$store.state.user.userInfo.token
                }
            }).then(res=>{
                // 跳转到付款页
                this.$router.push({path: "/air/pay"});
            })
        }
    },
    computed: {
        sumPrice(){
            // 总价格
            let total=0;
            if(!this.data.seat_infos.org_settle_price) return;
            // 票价
            total+=this.data.seat_infos.org_settle_price
            // 油价
            total+=this.data.airport_tax_audlet
            // 保险
            total+=this.insurances.length*30
            // 人数
            total*=this.users.length
            // 将计算出来的结果存到vuex中
            this.$store.commit('air/priceSum',total)
            return '';
        }
    },
    props: {
        data:{
            type:Object,
            default(){return {}}
        }
    }
}
</script>

<style scoped lang="less">
    .air-column{
        border-bottom:1px #ddd dashed;
        padding-bottom: 20px;   
        margin-bottom: 20px;
    }

    .air-column h2{
        margin-bottom: 20px;
        font-size: 22px;
        font-weight: normal;
    }

    /deep/ .el-select .el-input {
        width: 130px;
    }

    .input-with-select{
        width:590px;
    }

    .input-with-select /deep/  .el-input-group__prepend {
        background-color: #fff;
    }
    .member-info /deep/ .el-form-item{
        margin-bottom:0;
    }

    .member-info-item{
        border-bottom:1px #eee dashed;
        padding-bottom: 20px;
        position: relative;

        &:first-child{
            .delete-user{
                display: none;
            }
        }
    }

    .add-member{
        margin-top:20px;
    }

    .delete-user{
        display: block;
        background:#ddd;
        width:16px;
        height:16px;
        font-size:14px;
        text-align: center;
        line-height: 16px;
        color:#fff;
        cursor: pointer;
        border-radius: 50px;
        position:absolute;
        right:-30px;
        top:50%;
    }

    .insurance{
        > div{
            margin-top:10px;
        }
    }

    .insurance-item{
        margin-bottom: 20px;
    }

    .contact{
        /deep/ .el-input{
            width:50%;
        }
    }

    .submit{
        margin: 50px auto;
        display: block;
        width:250px;
        height:50px;
    }
</style>