import request from '@/utilis/request.js'

// 封装对应的接口请求就可以了
export function businessList(params){

    return request({
        url:"/enterprise/list",
        method:"get",
        params
    })
}

// 封装企业添加
export function businessAdd(data){

    return request({
        url:"/enterprise/add",
        method:"post",
        data
    })
}


// 封装企业修改状态
export function businessStatus(data){

    return request({
        url:"/enterprise/status",
        method:"post",
        data
    })
}
// 封装企业删除状态
export function businessRemove(data){

    return request({
        url:"/enterprise/remove",
        method:"post",
        data
    })
}
// 封装企业编辑状态
export function businessEdit(data){

    return request({
        url:"/enterprise/edit",
        method:"post",
        data
    })
}

