/*
 * @Author: your name
 * @Date: 2021-10-15 17:42:33
 * @LastEditTime: 2022-04-08 11:26:38
 * @LastEditors: matiastang
 * @Description: In User Settings Edit
 * @FilePath: /dw-plate-H5/src/@types/plate.d.ts
 */
import { OrderType, PositionConceptType } from '@/api/request/modules/index'
/**
 * 板块信息
 */
export interface PlateInfo {
    code: string
    name: string
}
/**
 * 推荐板块类别
 */
export interface CategoryPushInfo {
    name: string
    value: PlateInfo[]
}
/**
 * 推荐板块概念
 */
export interface ConceptionPushInfo {
    id: number
    name: string
    value: CategoryPushInfo[]
}
/**
 * 板块搜索分类
 */
export interface PlateGroup {
    index: string
    value: PlateInfo[]
}

/**
 * 板块信息
 */
export interface EquityCorrelationInfo {
    code: string
    equityCorrelation: number
    name: string
}
/**
 * 持仓信息
 */
export interface PositionConceptInfo {
    code: string
    proportion: number
    name: string
}
/**
 * 板块基金信息
 */
export interface FundInfo {
    equityCorrelationInfoList: EquityCorrelationInfo[]
    fundName: string
    fundCode: string
    labels: string[]
    mainCode: string
    positionConceptInfoList: PositionConceptInfo[]
}

/**
 * 查询结果参数类型
 */
interface FindParameters {
    conceptionInfos: string[]
    page: number
    size: number
    sortCode?: string
    order?: OrderType
    conceptType: PositionConceptType
}
