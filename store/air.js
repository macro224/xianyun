// 用户管理
export const state = () => ({
    lishi:[],
    price:'',
    users: 1
})

// 同步修改数据
export const mutations = {
    // 历史记录
    setLishi(state,data){
        state.lishi.unshift(data)
    },
    // 总价格
    priceSum(state,data){
        state.price=data
    },
    // 乘机人数量
    userLength(state,data){
        state.users=data
    }
}