<template>
    <el-row class="create" type="flex" justify="space-between">
        <!-- 左边表单栏 -->
        <div class="leftCreate">
            <!-- 标题 -->
            <h2>发表新攻略</h2>
            <p>分享你的个人游记，让更多人看到哦！</p>
            <!-- 表单 -->
            <el-form ref="form" :model="form">
                <el-form-item>
                    <el-input v-model="form.title" placeholder="请输入标题"></el-input>
                </el-form-item>

                <!-- 富文本编辑器 -->
                <el-form-item>
                    <div class="quill-editor" ref="quill" v-quill:myQuillEditor="editorOption" :content="form.content"></div>
                </el-form-item>

                <el-form-item label="城市名称"  label-width="80px">
                    <el-input v-model="form.city" placeholder="请输入游玩城市"></el-input>
                </el-form-item>
            </el-form>
            <!-- 发表按钮 -->
            <div class="fabiaoBox">
                <el-button type="primary" @click="fabiao">发表</el-button>
                <span>或者 <span @click="baocunCaogao">保存到草稿</span></span>
            </div>
        </div>
        <!-- 右边草稿栏 -->
        <div class="rightCreate">
            <CaogaoCreate @caogao="caogao" />
        </div>
    </el-row>
</template>

<script>
import CaogaoCreate from '@/components/post/caogaoCreate'

export default {
    data () {
        return {
            form:{
                title:'',
                city:'',
                content:''
            },
            editorOption: {
                // some quill options
                placeholder: "",
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'],
                        ['image','video']
                    ]
                }
            }
        }
    },
    components: {
        CaogaoCreate
    },
    methods: {
        // 发表攻略
        fabiao(){
            // console.dir(this.$refs.quill.innerText);
            let {title,city}=this.form
            this.$axios({
                url:'/posts',
                method:'POST',
                headers:{
                    Authorization:'Bearer '+this.$store.state.user.userInfo.token
                },
                data:{
                    title,city,
                    content:this.$refs.quill.innerText
                }
            }).then(res=>{
                console.log(res);
                if(res.data.message==='新增成功'){
                    this.$message.success('发表成功~')
                    this.$store.commit('post/setCreate', res.data.data)
                    // 跳转页面
                    this.$router.push('/post')
                }
            })
            
        },
        // 存为草稿
        caogao(item){
            this.form.title=item.title;
            this.form.city=item.cityName
            this.form.content=item.content
        },
        // 保存为草稿
        baocunCaogao(){
            this.$store.commit('post/setCreate', 
                {
                    title:this.form.title,
                    cityName:this.form.city,
                    content:this.form.content,
                    city:{created_at:'2020-06-06 16:16:16'}
                }
            )
        }
    }

}
</script>

<style lang="less" scoped>
    .create{
        width: 1000px;
        margin: 0 auto;
        padding: 20px 0;
        .leftCreate{
            width: 750px;
            >h2{
                font-size: 22px;
                font-weight: 400;
                margin-bottom: 10px;
            }
            >p{
                color: #999;
                font-size: 12px;
                margin-bottom: 10px;
            }
            .el-form-item{
                margin-bottom: 22px;
            }

            /deep/.quill-editor{
                .ql-editor{
                    height: 400px;
                    img{
                        width: 100px;
                    }
                }
            }
            .fabiaoBox{
                span{
                    margin-left: 10px;
                    font-size: 14px;
                    span{
                        color: orange;
                        cursor: pointer;
                        &:hover{
                            text-decoration: underline;
                        }
                    }
                }
            }
        }
        .rightCreate{
            width: 200px;
        }
    }
</style>
