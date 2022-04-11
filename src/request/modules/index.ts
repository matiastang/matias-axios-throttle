/*
 * @Author: matiastang
 * @Date: 2022-04-06 14:37:05
 * @LastEditors: matiastang
 * @LastEditTime: 2022-04-11 14:58:00
 * @FilePath: /matias-axios-throttle/src/request/modules/index.ts
 * @Description: 板块选基接口
 */
import http from '../request'
import { ConceptionPushInfo, PlateGroup, FundInfo, FindParameters } from '@/@types/index'
import { apiPrefix } from '../prefix'

/**
 * 获取板块选基首页图片地址
 * @param appId
 * @returns
 */
const getConceptionPicture = (appId: string) => {
    return http.get<string>(`${apiPrefix}/getConceptionPicture/${appId}`)
}

/**
 * 获取板块推荐信息
 * @param appId
 * @returns
 */
const getConceptionInfo = (appId: string) => {
    return http.get<ConceptionPushInfo[]>(`${apiPrefix}/getConceptionPush/${appId}`)
}

/**
 * 获取所有板块列表
 * @returns
 */
const getAllConception = () => {
    return http.get<PlateGroup[]>(`${apiPrefix}/getAllConception`)
}

/**
 * 板块搜索接口
 * @returns
 */
const searchConception = (keywords: string) => {
    return http.get<any>(`${apiPrefix}/searchConception`, {
        keywords,
    })
}
/**
 * 查询筛选的条数
 * @param conceptionInfos
 * @returns
 */
const confirm = (conceptionInfos: string[]) => {
    return http.post<number>(`${apiPrefix}/confirm`, {
        conceptionInfos,
    })
}

/**
 * 排序类型
 */
enum OrderType {
    /**
     * 升
     */
    ASC = 'asc',
    /**
     * 降
     */
    DESC = 'desc',
}
/**
 * 持仓概念
 */
enum PositionConceptType {
    /**
     * 全部持仓
     */
    ALL = 'all',
    /**
     * 前十大持仓
     */
    TOP = 'topTen',
}

/**
 * 查询结果
 * @param conceptionInfos
 * @param page
 * @param size
 * @returns
 */
const find = (parameters: FindParameters) => {
    return http.post<FundInfo[]>(`${apiPrefix}/find`, parameters)
}

export {
    getConceptionPicture,
    getConceptionInfo,
    getAllConception,
    searchConception,
    confirm,
    find,
    OrderType,
    PositionConceptType,
}
