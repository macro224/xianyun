<template>
    <section class="container">
        <el-container>
            <el-aside width="260px">
                <div class="menuBox">
                    <ul>
                        <li>aaa <i class="el-icon-arrow-right"></i></li>
                        <li>aaa <i class="el-icon-arrow-right"></i></li>
                        <li>aaa <i class="el-icon-arrow-right"></i></li>
                        <li>aaa <i class="el-icon-arrow-right"></i></li>
                    </ul>
                    <div class="rightbox">
                        aaa
                    </div>
                </div>
            </el-aside>
            <el-main>Main</el-main>
        </el-container>
    </section>
</template>

<script>
export default {
  
}
</script>

<style scoped lang="less">
.container{
    width:1000px;
    margin:0 auto;
    padding: 20px 0;
    .el-aside{
        overflow: inherit;
        .menuBox{
            width: 260px;
            box-sizing: border-box;
            border: 1px solid #ddd;
            position: relative;
            ul{
                li{
                    z-index: 2;
                    height: 40px;
                    padding: 0 20px;
                    line-height: 40px;
                    border-top: 1px solid #ddd;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    &:nth-child(1){
                        border-top:none;
                    }
                }
            }

            .rightbox{
                width: 350px;
                height: 200px;
                padding: 10px 20px;
                background: #fff;
                box-sizing: border-box;
                border: 1px solid #ddd;
                position: absolute;
                left: 258px;
                top: -1px;
                z-index: 1;
            }
        }
    }
}

</style>