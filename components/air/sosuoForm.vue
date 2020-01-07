<template>
    <div class="search-form">

        <!-- 头部tab切换 -->
        <el-row type="flex" class="search-tab">
            <span v-for="(item, index) in tabs" :key="index"
            @click="handleSearchTab(item, index)"
            :class="{active: index === currentTab}">
                <i :class="item.icon"></i>{{item.name}}
            </span>
        </el-row>

        <!-- 单程购票口 -->
        <el-form v-show="currentTab===0" class="search-form-content" ref="form" label-width="80px">

            <!-- 出发城市 -->
            <el-form-item label="出发城市">
                <!-- fetch-suggestions 返回输入建议的方法 -->
                <!-- select 点击选中建议项时触发 -->
                <el-autocomplete
                :fetch-suggestions="queryDepartSearch"
                placeholder="请搜索出发城市"
                @select="handleDepartSelect"
                class="el-autocomplete"
                v-model="form.departCity"></el-autocomplete>
            </el-form-item>

            <!-- 到达城市 -->
            <el-form-item label="到达城市">
                <el-autocomplete
                :fetch-suggestions="queryDestSearch"
                placeholder="请搜索到达城市"
                @select="handleDestSelect"
                class="el-autocomplete"
                v-model="form.destCity"></el-autocomplete>
            </el-form-item>

            <!-- 出发时间 -->
            <el-form-item label="出发时间">
                <!-- change 用户确认选择日期时触发 -->
                <el-date-picker type="date" 
                placeholder="请选择日期" 
                style="width: 100%;"
                @change="handleDate"
                v-model="form.departDate">
                </el-date-picker>
            </el-form-item>

            <!-- 搜索 -->
            <el-form-item>
                <el-button style="width:100%;" 
                type="primary" 
                icon="el-icon-search"
                @click="handleSubmit">
                    搜索
                </el-button>
            </el-form-item>

            <div class="reverse">
                <span @click="handleReverse">换</span>
            </div>
        </el-form>
        
        <!-- 往返购票口 -->
        <p v-show="currentTab===1">暂无往返购票功能~</p>

      </div>
</template>

<script>
import moment from 'moment'

export default {
    data(){
        return {
            tabs: [
                {icon: "iconfont icondancheng", name: "单程"},
                {icon: "iconfont iconshuangxiang", name: "往返"}
            ],
            currentTab: 0,
            form:{
                departCity:'',//出发城市
                departCode:'',//出发城市代码
                destCity:'',//到达城市
                destCode:'',//到达城市代码
                departDate:''//出发时间
            }
        }
    },
    methods: {
        // tab切换时触发
        handleSearchTab(item, index){
            this.currentTab=index
        },
        // 封装函数
        chaxun(queryString){
            return new Promise((resolve, reject) => {
                this.$axios({
                    url: `/airs/city`,
                    params: {
                        name: queryString
                    }
                }).then(res => {
                    const {data} = res.data;
                    // 下拉提示列表必须要有value字段
                    const arr = data.map(v => {
                        return {
                            ...v,
                            value: v.name.replace("市", "")
                        }
                    });
                    resolve(arr);
                });
            });
        },

        // 出发城市输入框获得焦点时触发
        // value 是选中的值，cb是回调函数，接收要展示的列表
        async queryDepartSearch(value, cb){
            if(value.trim()==="") return cb([]);
            // 判断有值的时候调用封装的函数
            const arr=await this.chaxun(value)
            if(arr.length>0){
                this.form.departCity=arr[0].value
                this.form.departCode=arr[0].sort
            }
            cb(arr)
        },
        // 目标城市输入框获得焦点时触发
        // value 是选中的值，cb是回调函数，接收要展示的列表
        async queryDestSearch(value, cb){
            // 判断如果没值的时候不弹出选择框
            if(value.trim()==="") return cb([]);
            // 判断有值的时候调用封装的函数
            const arr=await this.chaxun(value)
            if(arr.length>0){
                this.form.destCity=arr[0].value
                this.form.destCode=arr[0].sort
            }
            cb(arr)
        },
       
        // 出发城市下拉选择时触发
        handleDepartSelect(item) {
            this.form.departCode=item.sort
        },
        // 目标城市下拉选择时触发
        handleDestSelect(item) {
            this.form.destCode=item.sort
        },

        // 确认选择日期时触发
        handleDate(value){
            // 修改日期格式
            this.form.departDate=moment(value).format('YYYY-MM-DD')
        },

        // 触发和目标城市切换时触发
        handleReverse(){
            // 结构出需要的值
            const {departCity,destCity,departCode,destCode}=this.form
            // 点击替换
            this.form.departCity=destCity
            this.form.destCity=departCity
            this.form.departCode=destCode
            this.form.destCode=departCode
        },

        // 提交表单是触发
        handleSubmit(){
            // 跳转页面
            this.$router.push({
                path: "/air/flights",
                query: this.form
            })
            this.$store.commit('air/setLishi',this.form)
        }
    }
}
</script>

<style scoped lang="less">
.search-form{
    border:1px #ddd solid;
    border-top:none;
    width:360px;
    height:350px;
    box-sizing: border-box;
}

.search-tab{
  span{
    display: block;
    flex:1;
    text-align: center;
    height:48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top:3px #eee solid;
    background:#eee;
  }

  .active{
    border-top-color: orange;
    background:#fff;
  }

  i{
    margin-right:5px;
    font-size: 18px;

    &:first-child{
      font-size:16px;
    }
  }
}

.search-form-content{
  padding:15px 50px 15px 15px;
  position: relative;

  .el-autocomplete{
    width: 100%;
  }
}

.reverse{
  position:absolute;
  top: 35px;
  right:15px;

  &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:-35px;
      width:25px;
      height:1px;
      background:#ccc;
  }

  &:after{
      top:0;
    }

    &:before{
      top:60px;
    }

  span{
    display: block;
    position:absolute;
    top: 20px;
    right:0;
    font-size:12px;
    background: #999;
    color:#fff;
    width:20px;
    height:20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:10px;
      width:1px;
      height:20px;
      background:#ccc;
    }

    &:after{
      top:-20px;
    }

    &:before{
      top:20px;
    }
  }
}
</style>
