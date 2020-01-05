<template>
    <div class="container">
        <div class="main">
            <div class="pay-title">
                支付总金额 <span class="pay-price">￥ {{$store.state.air.price}}</span>
            </div>
            <div class="pay-main">
                <h4>微信支付</h4>
                <el-row type="flex" 
                justify="space-between" 
                align="middle"
                class="pay-qrcode">
                    <div class="qrcode">
                        <!-- 二维码 -->
                        <canvas id="qrcode-stage"></canvas>
                        <p>请使用微信扫一扫</p>
                        <p>扫描二维码支付</p>
                    </div>
                    <div class="pay-example">
                        <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt="">
                    </div>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
// 生成二维码的包
import QRCode from "qrcode";

export default {
    data () {
        return {
            orderData:{},
            timer:false
        }
    },
    methods: {
        // 封装订单支付成功函数
        checkPay(){
            this.timer=setInterval(() => {
                this.$axios({
                    url:'/airorders/checkpay',
                    method:'POST',
                    headers:{
                        Authorization:'Bearer '+this.$store.state.user.userInfo.token
                    },
                    data:{
                        id:this.$route.query.id,
                        nonce_str:this.orderData.payInfo.nonce_str,
                        out_trade_no:this.orderData.payInfo.order_no
                    }
                }).then(res=>{
                    if(res.data.statusTxt!=='订单未支付'){
                        this.$message.success('订单支付成功~')
                        clearInterval(this.timer)
                        this.$router.push('/air')
                    }
                })
            }, 3000);
        }
    },
    // 当我们离开这个页面的时候，便会调用这个函数destroyed(生命周期)
    destroyed(){
        clearInterval(this.timer)
    },
    // 当页面加载完成时，便会调用这个函数mounted(生命周期)
    mounted () {
        setTimeout(() => {
            // 调用接口获取二维码
            this.$axios({
            url:`/airorders/${this.$route.query.id}`,
            headers:{
                Authorization:'Bearer '+this.$store.state.user.userInfo.token
            }
            }).then(res=>{
                // 获取DOM元素canvas标签
                const qrcodeStage=document.querySelector("#qrcode-stage");
                // 渲染二维码
                QRCode.toCanvas(qrcodeStage,res.data.payInfo.code_url,{
                    width:266
                })
                console.log(res);
                // 将获取到的指存到orderData变量中
                this.orderData=res.data
                this.checkPay()
            })
        }, 1);
    }
}
</script>

<style scoped lang="less">
.container{
    background:#f5f5f5;
    padding: 30px 0;

    .main{
        width:1000px;
        margin:0 auto;

        .pay-title{
            text-align: right;
            span{
                font-size:28px;
                color:orangered;
            }
        }

        .pay-main{
            background:#fff;
            margin-top:10px;
            border-top: 5px orange solid;
            padding:30px;

            h4{
                font-size: 28px;
                font-weight: normal;
                margin-bottom: 10px;
            }

            .pay-qrcode{
                padding:0 80px;
            }

            .qrcode{
                border:1px #ddd solid;
                padding:15px;
                height: fit-content;

                #qrcode-stage{
                    width:200px;
                    height:200px;
                    margin-bottom: 10px;
                }

                p{
                    line-height: 2;
                    text-align: center;
                }
            }
        }
    }
}
</style>