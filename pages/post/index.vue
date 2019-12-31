<template>
  <section class="container">
        <!-- <div class="sosuoBox">
        </div> -->

    <el-row type="flex" justify="space-between">
        <el-menu collapse="true" class="el-menu-demo" mode="vertical">
            <el-submenu index="2">
                <el-menu-item slot="title">我的工作台</el-menu-item>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
            </el-submenu>
        </el-menu>
    </el-row>

  </section>
</template>

<script>
export default {
  data () {
      return {
          current:0,
          form:{
            chufatime:''
          }
      }
  },
  methods:{
    tab(i){
      this.current=i
    },
    onSubmit(){
      console.log(111);
    }
  }
}
</script>

<style scoped lang="less">
.container{
  width:1000px;
  margin:0 auto;
}

.sosuoBox{
    width: 360px;
    height: 350px;
    border-top: none;
    box-sizing: border-box;
    border: 1px solid #ddd;
    span{
        display: inline-block;
        width:50%;
        height: 50px;
        box-sizing: border-box;
        border-top:3px #eee solid;
        background:#eee;
        line-height: 48px;
        text-align: center;
        cursor: pointer;
        color:#666;
        &.active{
            border-top-color: orange;
            background:#fff;
            font-weight: bold;
        }
        i{
            margin-right: 8px;
        }
    }
}
</style>