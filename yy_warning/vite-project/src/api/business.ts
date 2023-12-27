// import request from '../utils/request'
/*import utilString from 'xe-utils/string'
import axios from "axios";*/
import request from "@/utils/request";
import {WarningDataPageSum, WarningDataRequestSum, WarningListTableDataRequest} from "@/types/interface";


/**
 * 获取工单列表
 * @returns
 * @param tableDataRequest
 */
export function get_warning_list(tableDataRequest:WarningListTableDataRequest) {

    // todo
    /* return new Promise((resolve) => {
         setTimeout(() => {
             let tmpData = []
             for (let i = 0; i < params.pageSize; i++) {
                 tmpData.push(
                     {
                         record_bh: utilString.padStart(i + 1 + "", 8, "0"),
                         plan_name: "计划" + i + 1,
                         record_state: "已完成",
                         sys: "",
                         bus: "计量",
                         user_fz: "",
                         dept_name: "",
                         area_name: "",
                         region_name: "",
                         create_time: "2021-12-08 15:23:56",
                         start_date: "2021-11-" + (10 + i),
                         finish_date: "2021-12-" + (11 + i),
                         problem_num: ""
                     },
                 )
             }

             tmpData[2].record_state="执行中"
             resolve({"success": true, "data": tmpData})
         }, 500)
     })*/
    return request({
        url: '/warn/work/list',
        method: 'post',
        data: tableDataRequest
    })


    // return request({
    //   url: '/api/roles',
    //   method: 'post',
    //   params
    // })

}
//验收页面一览
export function get_audit_list(tableDataRequest:WarningListTableDataRequest) {

    // todo
    return request({
        url: '/warn/audit/list',
        method: 'post',
        data: tableDataRequest
    })


}

//汇总部分页面一览
export function get_warning_list_sum(requestData:WarningDataRequestSum) {


    return request({
        url: '/warn/sum/list',
        method: 'post',
        data: requestData
    })




}
//通过workId获取工单信息
export function get_warning_work(workId: number) {


    return  request({
        url: '/warn/work/selectByWorkId',
        method: 'get',
        params:{
            workId:workId
        }
    })

}

//通过workId获取计量的请求数据

export function get_warning_measure(workId: number) {


    return  request({
        url: '/warn/check/measure',
        method: 'post',
        params:{
            workId:workId
        }
    })

}
//通过workId获取巡检的请求数据
export function get_warning_examine(workId: number) {


    return request({
        url: '/warn/check/check',
        method: 'post',
        params:{
            workId:workId
        }
    })

}
//通过workId获取维修的请求数据
export function get_warning_repair(workId:number) {

    return request({
        url: '/warn/check/repair',
        method: 'post',
        params:{
            workId:workId
        }

    })

}
//通过workId获取保养的请求数据
export function get_warning_upkeep(workId:number) {

    return request({
        url: '/warn/check/upkeep',
        method: 'post',
        params:{
            workId:workId
        }

    })

}

//通过workId提交submit的数据
export function submit_measure(workId: number,
                               result:boolean,
                               workDate:string,
                               organ:string,
                               way:string) {

    return request({
        url: '/warn/measure/submit',
        method: 'post',
        params:{
            workId:workId,
            result:result,
            workDate:workDate,
            organ:organ,
            way:way
        }

    })

}
export function submit_value(itemId:number,
                             value:string) {
    return request({
        url: '/warn/item/updateByItemId',
        method: 'post',
        params: {
            itemId: itemId,
            value: value
        }
    })
}

export function submit_examine(workId:number) {
    return request({
        url: '/warn/item/submit',
        method: 'post',
        params: {
            workId: workId
        }

    })
}

export function submit_repair(workId:number,
                              repairResult:string,
                              remark:string

) {

    return request({
        url: '/warn/repair/updateByWorkId',
        method: 'post',
        params: {
            workId: workId,
            repairResult:repairResult,
            remark:remark
        }

    })
}

export function submit_upkeep(workId:number,
                              isUnusual:boolean

) {

    return request({
        url: '/warn/upkeep/updateByWorkId',
        method: 'post',
        params: {
            workId: workId,
            isUnusual:isUnusual
        }

    })
}
export function submit_file(workId: number,
                            imgPath:string,
                            filePath:string

) {

    return request({
        url: '/warn/check/submitFile',
        method: 'post',
        params: {
            workId: workId,
            imgPath: imgPath,
            filePath: filePath
        }

    })
}

export function submit_audit(workId: number) {

    return request({
        url: '/warn/audit/updateByWorkId',
        method: 'post',
        params: {
            workId: workId
        }

    })
}

export function get_examine_list(workId:number) {

    return request({
        url: '/warn/item/list',
        method: 'post',
        params:{
            workId:workId
        }

    })

}
//分页条件查询员工信息
export function get_userinfo_list(tableDataRequest:WarningListTableDataRequest) {

    return request({
        url: '/warn/user/selectAll',
        method: 'post',
        data:tableDataRequest

    })
}


//添加员工
export function add_user(name:string,bh:string,phone:string,sys:string) {

    return request({
        url: '/warn/user/add',
        method: 'post',
        params:{
            name:name,
            bh:bh,
            phone:phone,
            sys:sys
        }

    })
}

//修改员工信息
export function update_user(id:number,name:string,bh:string,phone:string,sys:string) {

    return request({
        url: '/warn/user/update',
        method: 'post',
        params:{
            id:id,
            name:name,
            bh:bh,
            phone:phone,
            sys:sys
        }

    })
}

//修改员工信息
export function delete_user(id:number) {

    return request({
        url: '/warn/user/delete',
        method: 'post',
        params:{
            id:id
        }

    })
}
//图表获取数据库信息：人员比例
export function staff_ratio() {

    return request({
        url: '/warn/user/staffratio',
        method: 'get',


    })
}
//图表获取数据库信息：正在进行的工单比例
export function workIng() {

    return request({
        url: '/warn/work/workIng',
        method: 'get',
    })
}
//获取工单状态的数量
export function statusNum(status:number) {

    return request({
        url: '/warn/work/statusNum',
        method: 'post',
        params:{
            status:status
        }
    })
}
//验收消息反馈
export function feedback(workId:number,sys:string) {

    return request({
        url: '/warn/audit/feedback',
        method: 'post',
        params:{
            workId:workId,
            sys:sys
        }
    })
}
//通过设备编号获取资产编号
export function getAasset(sno:string){

    return request({
        url: '/warn/sum/getAssetBh',
        method: 'post',
        params:{
            sno:sno,
        }
    })
}
//通过设备编号得到几个系统关联的值（只有为一条结果）
export function message_sum(sno:string,sys:string) {

    return request({
        url: '/warn/sum/messageSum',
        method: 'post',
        params:{
            sno:sno,
            sys:sys
        }
    })
}
//通过设备编号得到几个系统关联的值(有多条结果)
export function message_sum2(sno:string,sys:string) {

    return request({
        url: '/warn/sum/messageSum2',
        method: 'post',
        params:{
            sno:sno,
            sys:sys
        }
    })
}

export function assetDeprRecord(assetpageDto:WarningDataPageSum) {

    return request({
        url: '/warn/sum/assetDeprRecord',
        method: 'post',
        data: assetpageDto
    })
}
export function assetYwRecord(assetpageDto:WarningDataPageSum) {

    return request({
        url: '/warn/sum/assetYwRecord',
        method: 'post',
        data: assetpageDto
    })
}
