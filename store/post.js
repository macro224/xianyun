// 用户管理
export const state = () => ({
    // 采用接口返回的数据结构
    create: []
}) 

// 同步修改数据
export const mutations = {
    setCreate(state,data){
        state.create.unshift(data)
    }
};

// 异步修改数据--跟接口打交道
export const actions = {
    
};