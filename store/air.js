// 用户管理
export const state = () => ({
    lishi:[]
})

// 同步修改数据
export const mutations = {
    setLishi(state,data){
        state.lishi.unshift(data)
    }
}