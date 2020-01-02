<template>
    <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <FlightsFilters/>
                
                <!-- 航班头部布局 -->
                <FlightsListHead/>
                
                
                <!-- 航班信息 -->
                <FlightsItem v-for="(item,index) in dataList" :key="index" :data="item" />

                <!-- 分页 -->
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageIndex"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="jipiao.total">
                </el-pagination>
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                <!-- 侧边栏组件 -->
            </div>
        </el-row>
    </section>
</template>

<script>
import FlightsListHead from '@/components/air/flightsListHead'
import FlightsItem from '@/components/air/flightsItem'
import FlightsFilters from '@/components/air/flightsFilters'

export default {
    data(){
        return {
            // 总数据
            jipiao:{},
            // 机票列表
            dataList:[],
            // 每页个数
            pageSize:5,
            // 当前页码
            pageIndex:1
        }
    },
    methods: {
        // 每页个数
        handleSizeChange(value){
            this.pageIndex=1
            this.pageSize=value
            this.setDataList()
        },
        // 当前页码
        handleCurrentChange(value){
            this.pageIndex=value
            this.setDataList()
        },
        // 封装一个根据页数页码获取机票列表的函数
        setDataList(){
            const start = (this.pageIndex-1)*this.pageSize
            const end=start+this.pageSize
            this.dataList=this.jipiao.flights.slice(start,end)
        }
    },
    mounted () {
        this.$axios({
            url:'/airs',
            params:this.$route.query
        }).then(res=>{
            this.jipiao=res.data
            // 打印总数据
            // console.log(this.jipiao);
            // 打印机票列表
            // console.log(this.dataList);
            this.setDataList()
        })
    },
    components: {
        FlightsListHead,FlightsItem,FlightsFilters
    }
}
</script>

<style scoped lang="less">
    .contianer{
        width:1000px;
        margin:20px auto;
    }

    .flights-content{
        width:745px;
        font-size:14px;
    }

    .aside{
        width:240px;
    } 
</style>