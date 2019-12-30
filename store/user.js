// 用户管理
export const state = () => ({
    // 采用接口返回的数据结构
    userInfo: {
        token: "",
        user: {}
    }
}) 

// 同步修改数据
export const mutations = {
    setUserInfo(state,data){
        state.userInfo=data
    }
};

// 异步修改数据--跟接口打交道
export const actions = {
    // 登录
    login(store,data){
        // 发送登录请求
        return this.$axios({
            method:'POST',
            url:'/accounts/login',
            data:data
        }).then(res=>{
            // 登录成功将用户信息存到vuex中
            store.commit('setUserInfo',res.data)
            // 登录成功后跳转回上一页
            this.$router.back()
            return true
        })
    },
    // 注册
    zhuce(store,data){
        // 发送axios登录接口请求
        return this.$axios({
            url:'/accounts/register',
            method:'POST',
            data
        }).then(res=>{
            return true
        })
    }
};