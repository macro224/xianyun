<template>
    <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <FlightsFilters :data="jipiaoSon" @setJipiao="setJipiao" />
                
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
            <FlightsAside/>
        </el-row>
    </section>
</template>

<script>
import FlightsListHead from '@/components/air/flightsListHead'
import FlightsItem from '@/components/air/flightsItem'
import FlightsFilters from '@/components/air/flightsFilters'
import FlightsAside from '@/components/air/flightsAside'

export default {
    data(){
        return {
            // 总数据
            jipiao:{
                info:{},
                options:{},
                flights:[]
            },
            // 缓存一份总数据
            jipiaoSon:{
                info:{},
                options:{},
                flights:[]
            },
            // 机票列表
            // dataList:[],
            // 每页个数
            pageSize:5,
            // 当前页码
            pageIndex:1
        }
    },
    // 计算属性计算监听机票列表
    computed: {
        dataList(){
            if(!this.jipiao.flights) return [];
            const end = this.pageIndex*this.pageSize
            const start = (this.pageIndex-1)*this.pageSize
            return this.jipiao.flights.slice(start,end)
        }
    },
    // 监听
    watch: {
      $route(){
        this.getJipiao();
      }  
    },
    methods: {
        // 每页个数
        handleSizeChange(value){
            this.pageIndex=1
            this.pageSize=value
        },
        // 当前页码
        handleCurrentChange(value){
            this.pageIndex=value
        },
        // 子组件过滤出来的机票列表
        setJipiao(arr){
            if(arr){
                this.pageIndex = 1;
                this.jipiao.flights = arr;
                this.jipiao.total = arr.length;
            }
        },
        // 封装一个函数获取机票总数据
        getJipiao(){
        // 调用接口获取机票总数据
            this.$axios({
                url:'/airs',
                params:this.$route.query
            }).then(res=>{
                this.jipiao=res.data
                this.jipiaoSon={...res.data}
                // 打印总数据
                // console.log(this.jipiao);
                this.pageIndex = 1;
            })
        }
    },
    mounted () {
        this.getJipiao()
    },
    components: {
        FlightsListHead,FlightsItem,FlightsFilters,FlightsAside
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