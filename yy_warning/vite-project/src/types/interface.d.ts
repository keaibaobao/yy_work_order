import {get_warning_measure} from "@/api/business";

declare interface WarningListTableDataRequest {
    pageSize: number
    page: number
    sort: string
    order: string
    search: object
    phone:string
}
declare interface WarningDataRequestSum {
    pageSize: number
    page: number
    sort: string
    order: string

}

declare interface WarningDataPageSum {
    pageSize: number
    page: number
    assetBh:string

}

declare interface MeterageDataRequest {
    workId:number
    result:boolean
    workDate:string
    organ:string
    way:string
    expense:string
}

declare interface RepairDataRequest {
    workId:number
    savePlace:string
    brand:string
    specs:string
    repairPicture:string
    repairReason:string
    repairResult:string
    remark:string
}
