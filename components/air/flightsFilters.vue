<template>
    <div class="filters">
        <el-row type="flex" class="filters-top" justify="space-between" align="middle">
            <el-col :span="8">
                单程： 
                {{data.info.departCity}} - {{data.info.destCity}}
                / 
                {{data.info.departDate}}
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="airport" placeholder="起飞机场" >
                    <el-option
                    v-for="(item,index) in data.options.airport" :key="index"
                    :label="item"
                    :value="item" >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="flightTimes"  placeholder="起飞时间" >
                    <el-option
                     v-for="(item,index) in data.options.flightTimes" :key="index"
                    :label="`${item.from}:00 - ${item.to}:00`"
                    :value="`${item.from},${item.to}`" >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="company"  placeholder="航空公司" >
                    <el-option
                    v-for="(item,index) in data.options.company" :key="index"
                    :label="item"
                    :value="item">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="airSize" placeholder="机型" >
                    <el-option
                    v-for="(item,index) in model" :key="index"
                    :label="item.name"
                    :value="item.size">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <div class="filter-cancel">
            筛选：
            <el-button 
                type="primary" 
                round plain 
                size="mini" 
                @click="handleFiltersCancel">
                撤销
    		</el-button>
        </div>
        <span>{{shaiXuan}}</span>
    </div>
</template>

<script>
export default {
    data(){
        return {
            airport: "",        // 机场
            flightTimes: "",    // 出发时间
            company: "",        // 航空公司
            airSize: "",        // 机型大小
            model:[
                {name: "大", size: "L"},
                {name: "中", size: "M"},
                {name: "小", size: "S"}
            ]
        }
    },
    props: {
        data:{
            type:Object,
            default:{}
        }
    },
    computed: {
        // 计算属性监听，多项筛选
        shaiXuan(){
            const arr=this.data.flights.filter(v=>{
                // 符合条件的全部返回
                let valid = true;
                // 判断不符合条件的改为false
                // 机场
                if(this.airport && this.airport!==v.org_airport_name){
                    valid=false
                }
                // 航空公司
                if(this.company && this.company!==v.airline_name){
                    valid=false
                }
                // 机型
                if(this.airSize && this.airSize!==v.plane_size){
                    valid=false
                }
                // 出发时间
                if(this.flightTimes){
                    const [from,to]=this.flightTimes.split(',')
                    const dep=+v.dep_time.split(':')[0]
                    if(dep<+from || dep>=+to){
                        valid=false
                    }
                }
                return valid;
            })
            this.$emit('setJipiao',arr)
            return '';
        }
    },
    methods: {
        // 撤销条件时候触发
        handleFiltersCancel(){
            this.airport= "";       // 机场
            this.company= "";       // 航空公司
            this.airSize= "";       // 机型大小
            this.flightTimes= ""    // 出发时间
        }
    }
}
</script>

<style scoped lang="less">
    .filters{
        margin-bottom:20px;
    }

    .filters-top{
        > div{
            /deep/ .el-select{
                margin-left:10px;
            }
        }
    }

    .filter-cancel{
        margin-top:10px;
    }
</style>