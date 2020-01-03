<template>
    <div class="container">
        <el-row type="flex" justify="space-between">
            <!-- 订单表单 -->
            <OrderForm :data="getAirsData"/>

            <!-- 侧边栏 -->
            <OrderAside :data="getAirsData"/>
        </el-row>
    </div>
</template>

<script>
import OrderForm from '@/components/air/orderForm'
import OrderAside from '@/components/air/orderAside'

export default {
    data () {
        return {
            getAirsData:{
                // insurances:{}
                seat_infos:{}
            }
        }
    },
    mounted () {
        const {id,seat_xid}=this.$route.query
        this.$axios({
            url:'/airs/'+id,
            params:{seat_xid}
        }).then(res=>{
            this.getAirsData=res.data
        })
    },
    components: {
        OrderForm,OrderAside
    }
}
</script>

<style lang="less" scoped>
    .container{
        width:1000px;
        margin:20px auto;
    }
    
    /*aside*/
    .aside{
        width: 350px;
        height: fit-content;
        border:1px #ddd solid;
    }
</style>