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
                    <VueEditor class="quill-editor" ref="VueEditor" :config="config" />
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
import "quill/dist/quill.snow.css"
import VueEditor from 'vue-word-editor'


export default {
    data () {
        return {
            form:{
                title:'',
                city:'',
                content:''
            },
            config: {
                // 上传图片的配置
                uploadImage: {
                    url: "http://localhost:1337/upload",
                    name: "files",
                    // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
                    uploadSuccess(res, insert){
                        insert("http://localhost:1337" + res.data[0].url)
                    }
                },
                // 配置功能 没这个配置则显示全部功能
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'],
                        ['image'],
                        // ['video'] //视频的配置
                    ]
                }
            }
        }
    },
    components: {
        CaogaoCreate,VueEditor
    },
    methods: {
        // 发表攻略
        fabiao(){
            // console.log(this.$refs.VueEditor.editor.root.innerHTML);
            let {title,city}=this.form
            this.$axios({
                url:'/posts',
                method:'POST',
                headers:{
                    Authorization:'Bearer '+this.$store.state.user.userInfo.token
                },
                data:{
                    title,city,
                    content:this.$refs.VueEditor.editor.root.innerHTML
                }
            }).then(res=>{
                console.log(res);
                if(res.data.message==='新增成功'){
                    this.$message.success('发表成功~')
                    // 跳转页面
                    this.$router.push('/post')
                }
            })
        },
        // 点击草稿填充到页面输入框中
        caogao(item){
            this.form.title=item.title;
            this.form.city=item.cityName
            this.$refs.VueEditor.editor.root.innerHTML=item.content
        },
        // 点击保存为草稿
        baocunCaogao(){
            let data = new Date();
            let yue=data.getMonth() + 1
            let ri=data.getDate()
            let shi=data.getHours()
            let miao=data.getSeconds()
            let fen=data.getMinutes()
            if(yue<10) yue='0'+yue
            if(ri<10) ri='0'+ri
            if(shi<10) shi='0'+shi
            if(miao<10) miao='0'+miao
            if(fen<10) fen='0'+fen
            let time=data.getFullYear() + '-' + yue + '-' + ri + ' ' + ' ' + shi + ':' + miao + ':' + fen
            this.$store.commit('post/setCreate', 
                {
                    title:this.form.title,
                    cityName:this.form.city,
                    content:this.$refs.VueEditor.editor.root.innerHTML,
                    city:{
                        created_at:time
                    }
                }
            )
            this.$message.success('保存成功~')
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
