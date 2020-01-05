<template>
    <div class="caogao">
        <h4>草稿箱（1）</h4>
        <div class="caogao-item" v-for="(item,index) in $store.state.post.create" :key="index">
            <span @click="caogao(item)">{{item.title}} <i class="iconfont el-icon-edit"></i></span>
            <p>{{item.city.created_at}}</p>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        caogao(item){
            this.$emit('caogao',item)
        }
    }
}
</script>

<style lang="less" scoped>
    .caogao{
        padding: 10px;
        border: 1px solid #ddd;
        >h4{
            color: #666;
            font-weight: 400;
            margin-bottom: 10px;
        }
        .caogao-item{
            font-size: 14px;
            margin-bottom: 10px;
            >span:hover{
                color: orange;
                cursor: pointer;
                text-decoration: underline;
            }
            >p{
                color: #999;
            }
        }
    }
</style>
