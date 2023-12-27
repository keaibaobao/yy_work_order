<template>
  <div>
    <el-tabs type="border-card" >
      <el-tab-pane label="设备信息"  style="padding: 20px;">
        <div v-if="noShowDevice==true" style="height: 100px;display: flex;justify-content: center;align-items: center;"><b>暂无此设备的基础消息</b></div>
        <div v-if="noShowDevice==false">
          <el-row>
            <el-col :span="8" v-for="key in deviceList" style="height: 30px;display: flex;flex-direction: row">
              <div style="color: grey">{{key[0]}}：</div>
              <div v-if="encodeURI(key[1]).length>100">
                <el-tooltip :content="key[1]" placement="top" effect="light">
                  <div>{{ ellipsisHandler(key[1]) }}</div>
                </el-tooltip>
              </div>
              <div v-if="encodeURI(key[1]).length<=100">
                {{key[1]}}
              </div>
            </el-col>
          </el-row>
        </div>
        <el-divider content-position="left" style="background-color: #2d8cf0">相关工单一览</el-divider>
        <div style="height: 20px"/>
        <el-table v-loading="tableLoading" @sort-change="handleSortChange" :data="tableData"
                  :default-sort="{ prop: 'create_time', order: 'descending' }"
                  style="width: 100%">
          <el-table-column prop="workId" label="工单号"/>
          <el-table-column prop="plan_name" label="计划名称"/>
          <el-table-column prop="record_state" label="状态" >
            <template #default="{ row }">
          <span v-if="row.record_state">
              <el-tag v-if="row.record_state == '执行中'">
                {{ row.record_state }}
              </el-tag>
              <el-tag type="success" v-if="row.record_state == '已完成'">
                  {{ row.record_state }}
              </el-tag>
              <el-tag type="warning" v-if="row.record_state == '已过期'">
                  {{ row.record_state }}
              </el-tag>
              <el-tag type="success" v-if="row.record_state == '已验收'">
                  {{ row.record_state }}
              </el-tag>
          </span>
            </template>
          </el-table-column>
          <el-table-column prop="sys" label="系统"/>
          <el-table-column prop="user_fz" label="负责人"/>
          <el-table-column prop="dept_name" label="科室"/>
          <el-table-column prop="area_name" label="院区"/>
          <el-table-column prop="region_name" label="所属区域"/>
          <el-table-column prop="create_time" label="创建时间" sortable="custom"/>
          <el-table-column prop="start_date" label="预计开始" sortable="custom"/>
          <el-table-column prop="finish_date" label="预计结束" sortable="custom"/>
          <el-table-column label="操作" width="100">
            <template #default="{ row }">
              <el-button type="primary" size="small" icon="el-icon-edit" @click="showDialog(row,sum)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
            v-model:currentPage="requestData.page"
            :page-sizes="[10, 50, 100]"
            v-model:page-size="requestData.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableDataTotal"
            @size-change="handleSizeChange"
            @current-change="handleCurrentPageChange"
            style="height: 5%">
          >
        </el-pagination>
        <!--    工单详情    -->
        <Detail :is-show="itemDetailVisible" :e-data="itemDetailData.data" :e-data2="adress" @handleClose="handleClose" @backHistory="backHistory"/>
      </el-tab-pane>
      <el-tab-pane label="资产信息" style="padding: 20px;">
        <!--        此设备没有资产信息-->
        <div v-if="noShowAsset==true" style="height: 100px;display: flex;justify-content: center;align-items: center;">
          <div>此设备暂未验收，无此资产信息</div>
        </div>
      <!--        此设备有资产信息-->
        <div v-if="noShowAsset==false">
          <el-row>
            <el-col :span="8" v-for="key in assetList" style="height: 30px;display: flex;flex-direction: row">
              <div style="color: grey">{{key[0]}}：</div>
              <div v-if="encodeURI(key[1]).length>100">
                <el-tooltip :content="key[1]" placement="top" effect="light">
                  <div>{{ ellipsisHandler(key[1]) }}</div>
                </el-tooltip>
              </div>
              <div v-if="encodeURI(key[1]).length<=100">
                {{key[1]}}
              </div>
            </el-col>
          </el-row>
          <el-divider content-position="left" style="background-color: #2d8cf0">基本信息</el-divider>
              <el-row>
                <el-col :span="8" v-for="key in assetList_basic" style="height: 30px;display: flex;flex-direction: row">
                  <div style="color: grey">{{key[0]}}：</div>
                  <div v-if="encodeURI(key[1]).length>100">
                    <el-tooltip :content="key[1]" placement="top" effect="light">
                      <div>{{ ellipsisHandler(key[1]) }}</div>
                    </el-tooltip>
                  </div>
                  <div v-if="encodeURI(key[1]).length<=100">
                    {{key[1]}}
                  </div>
                </el-col>
              </el-row>
          <el-divider content-position="left" style="background-color: #2d8cf0">折旧信息</el-divider>
            <el-row>
              <el-col :span="8" v-for="key in assetList_depreciation" style="height: 30px;display: flex;flex-direction: row">
                <div style="color: grey">{{key[0]}}：</div>
                <div v-if="encodeURI(key[1]).length>100">
                  <el-tooltip :content="key[1]" placement="top" effect="light">
                    <div>{{ ellipsisHandler(key[1]) }}</div>
                  </el-tooltip>
                </div>
                <div v-if="encodeURI(key[1]).length<=100">
                  {{key[1]}}
                </div>
              </el-col>
            </el-row>
        </div>
           <div style="height: 20px"/>
            <div>折旧记录</div>
              <div style="height: 20px"/>
              <el-table v-loading="assetDeprLoading" :data="assetDeprData" style="width: 100%">
                <el-table-column prop="batchBh" label="折旧批次"/>
                <el-table-column prop="depreciationTime" label="折旧时间"/>
                <el-table-column prop="monthDepreciationAmount" label="折旧金额"/>
                <el-table-column prop="assetOrginValue" label="原值"/>
                <el-table-column prop="assetRealValue" label="净值"/>
                <el-table-column prop="depreciationDeptName" label="归属部门"/>
              </el-table>
              <el-pagination
                  v-model:currentPage="assetDeprPage.page"
                  :page-sizes="[5, 10, 15]"
                  v-model:page-size="assetDeprPage.pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="assetDeprTotal"
                  @size-change="deprSizeChange"
                  @current-change="deprCurrentPageChange"
                  style="height: 5%">
                >
              </el-pagination>
              <div style="height: 20px;"/>
          <el-divider content-position="left" style="background-color: #2d8cf0">业务记录</el-divider>
            <div style="height: 20px"/>
            <el-table v-loading="assetYwLoading" :data="assetYwData" style="width: 100%">
              <el-table-column prop="applyBh" label="申请单号"/>
              <el-table-column prop="operateTime" label="操作时间"/>
              <el-table-column prop="operatePersonName" label="操作人"/>
              <el-table-column prop="operateType" label="操作类型"/>
              <el-table-column prop="operateContent" label="操作内容"/>
            </el-table>
            <el-pagination
                v-model:currentPage="assetYwPage.page"
                :page-sizes="[5, 10, 15]"
                v-model:page-size="assetYwPage.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="assetYwTotal"
                @size-change="ywSizeChange"
                @current-change="ywCurrentPageChange"
                style="height: 5%">
              >
            </el-pagination>
            <div style="height: 20px"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import {
  assetDeprRecord, assetYwRecord,
  get_warning_list_sum,
  getAasset,
  message_sum,
  message_sum2,
} from "@/api/business";
import {onMounted, reactive, ref, toRaw} from "vue";
import {ElMessage} from "element-plus";
import Detail from "@/components/ItemDetail/Detail.vue"
import {getRoles} from "@/utils/auth";

const adress = "sum"
const noShowDevice =ref(false)
const noShowAsset =ref(false)
const deviceList = reactive([] as any[])
const assetList = reactive([] as any[])
const assetList_basic = reactive([] as any[])
const assetList_depreciation = reactive([] as any[])

//以下是为了显示资产折旧记录
let assetDeprPage=reactive({
  page: 1,
  pageSize: 5,
  assetBh:"",
})
const assetDeprData = reactive([] as any[])
const assetDeprLoading = ref(false)
const assetDeprTotal = ref(0)
const deprSizeChange = (val: number): void => {
  assetDeprPage.page = 1
  assetDeprPage.pageSize = val
  setTimeout(() => {
    // 解决因为改变pagesize，错误触发currentPageChange方法的问题。
    // pagesize=10，当前页=5时，将pagesize改变成50，即使设定currentpage=1，也会
    // 触发handleCurrentPageChange，并传入pagesize改变后重新计算的当前页（3）。。。
    deprCurrentPageChange(1)
  }, 40)
}

const deprCurrentPageChange = (val: number): void => {
  assetDeprPage.page = val
  getDeprTable(assetDeprPage)
}
const getAssetDeprTotal = (val:number) => {
  assetDeprTotal.value = val
}
const getDeprTable = (assetDeprPage:any)=> {
  assetDeprLoading.value = true
  assetDeprRecord(assetDeprPage).then((res) => {
    console.log("这是我的资产折旧记录",res.data.records)
    getAssetDeprTotal(res.data.total)
    assetDeprData.length = 0
      for (let i = 0; i < res.data.records.length; i++) {
        assetDeprData.push(
            {
              batchBh: res.data.records[i].batchBh,
              depreciationTime: res.data.records[i].depreciationTime,
              monthDepreciationAmount: res.data.records[i].monthDepreciationAmount,
              assetOrginValue: res.data.records[i].assetOrginValue,
              assetRealValue: res.data.records[i].assetRealValue,
              depreciationDeptName: res.data.records[i].depreciationDeptName,
            }
        )
      }
    assetDeprLoading.value = false

  })
}
//以上是为了显示资产折旧记录

//以下是为了显示资产业务记录
let assetYwPage=reactive({
  page: 1,
  pageSize: 5,
  assetBh:"",
})
const assetYwData = reactive([] as any[])
const assetYwLoading = ref(false)
const assetYwTotal = ref(0)
const ywSizeChange = (val: number): void => {
  assetYwPage.page = 1
  assetYwPage.pageSize = val
  setTimeout(() => {
    // 解决因为改变pagesize，错误触发currentPageChange方法的问题。
    // pagesize=10，当前页=5时，将pagesize改变成50，即使设定currentpage=1，也会
    // 触发handleCurrentPageChange，并传入pagesize改变后重新计算的当前页（3）。。。
    ywCurrentPageChange(1)
  }, 40)
}

const ywCurrentPageChange = (val: number): void => {
  assetYwPage.page = val
  getYwTable(assetYwPage)
}
const getAssetYwTotal = (val:number) => {
  assetYwTotal.value = val
}
const getYwTable = (assetYwPage:any)=> {
  assetYwLoading.value = true
  assetYwRecord(assetYwPage).then((res) => {
    console.log("这是我的资产业务记录",res.data.records)
    getAssetYwTotal(res.data.total)
    assetYwData.length = 0
    for (let i = 0; i < res.data.records.length; i++) {
      assetYwData.push(
          {
            applyBh: res.data.records[i].applyBh,
            operateTime: res.data.records[i].operateTime,
            operatePersonName: res.data.records[i].operatePersonName,
            operateType: res.data.records[i].operateType,
            operateContent: res.data.records[i].operateContent,
          }
      )
    }
    assetYwLoading.value = false

  })
}
//以上是为了显示资产业务记录

// 为了显示工单
const tableDataTotal = ref(0)
const tableLoading= ref(false)
const tableData = reactive([] as any[])
const itemDetailVisible = ref(false)
const itemDetailData = reactive({} as any)
let requestData= reactive({
  page: 1,
  pageSize: 10,
  search: {
    workId:null,
    planName:"",
    status:null,
    startDate:null,
    finishDate:null,
    userName:"",
    deviceBh: "EQ-EN2022051729"
  },
  phone:getRoles(),
  sort: "",
  order: ''

})

let ellipsisHandler = (text: string) => {
  return text.slice(0, 12) + "...";
}

const handleSortChange = (column: any) => {
  requestData.sort = column.prop
  if(column.order=="ascending"){
    requestData.order ="asc"
  }else {
    requestData.order ="desc"
  }

  requestData.pageSize = 10
  requestData.page = 1
  getTableData(requestData)

}


const showDialog = (row: any,sum:string) => {
  console.log("我是点击详情后的信息",row)
  itemDetailData.data = toRaw(row)
  itemDetailVisible.value = true
  console.log("itemDetailVisible.value: "+itemDetailVisible.value)
}
const handleClose = () => {

  console.log("handleClos")
  itemDetailVisible.value = false
  getTableData(requestData)
//刷新当前页面
  location.reload()

}
const backHistory= (res:any) => {
  itemDetailVisible.value = false
  requestData.pageSize = 10
  requestData.page = 1
  requestData.search.deviceBh=res
  getTableData(requestData)
}
const getTableDataTotal = (val:number) => {
  tableDataTotal.value = val
}
const getTableData = (requestData:any)=> {
  tableLoading.value = true
  get_warning_list_sum(requestData).then((res) => {
    console.log("**********************************",res.data)
    getTableDataTotal(res.data.total)
    tableData.length = 0
    for (let i = 0; i < res.data.list.length; i++) {
      tableData.push(
          {
            workId: res.data.list[i].workId,
            plan_name: res.data.list[i].planName,
            record_state: res.data.list[i].status>0?res.data.list[i].status>1?res.data.list[i].status>3?"已验收":"已过期":"已完成":"执行中",
            sys: res.data.list[i].sys,
            user_fz: res.data.list[i].userName,
            dept_name: res.data.list[i].deptName,
            area_name: res.data.list[i].areaName,
            region_name: res.data.list[i].regionName,
            create_time: res.data.list[i].createTime,
            start_date: res.data.list[i].startDate,
            finish_date: res.data.list[i].finishDate,
            deviceBh: res.data.list[i].deviceBh
          }
      )
    }
    tableLoading.value = false
  })

}
//以上是为了显示工单


onMounted(() => {
  let url = window.location.href
  requestData.search.deviceBh=url.substring(10 + url.indexOf("?"),url.length)

  //得到设备表格
  if(requestData.search.deviceBh==""){
    noShowDevice.value=true
    noShowAsset.value=true
  }else {
    getTableData(requestData)
    //通过设备编号获取资产编号
    getAasset(requestData.search.deviceBh).then((res) => {
      //折旧记录参数的赋值
      assetDeprPage.assetBh=String(res);
      //确定没有资产编号后改变数值显示资产未验收
      if(assetDeprPage.assetBh=="No asset information"){
        noShowAsset.value=true
      }
      //得到资产折旧记录表格
      getDeprTable(assetDeprPage)
      //业务记录参数的赋值
      assetYwPage.assetBh=String(res);
      //得到资产业务记录表格
      getYwTable(assetDeprPage)
    })
  }




  //设备字段
  message_sum(requestData.search.deviceBh,"device").then((res) => {
    for (const entry of Object.entries(res)) {
      deviceList.push(entry)
    }
  })

  //资产字段
  message_sum(requestData.search.deviceBh,"asset").then((res) => {
    for (const entry of Object.entries(res)) {
      assetList.push(entry)
    }
  })
  message_sum(requestData.search.deviceBh,"asset_basic").then((res) => {
    for (const entry of Object.entries(res)) {
      assetList_basic.push(entry)
    }
  })
  message_sum(requestData.search.deviceBh,"asset_depreciation").then((res) => {
    for (const entry of Object.entries(res)) {
      assetList_depreciation.push(entry)
    }
  })

})


</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  margin-top: 10px;

}
.frame{
  width: 90%;
  height: 30px;
  float: left;
  border: #b3e19d;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.value_frame{
  width: 80%;
  border: 1px solid darkgray;
  border-radius: 5px;
  float: right;
}

/deep/.el-tabs__item {
  /* 修改为您想要的文字大小 */
  font-size: 20px!important;
}

</style>
