<template>
  <div style="width: 100%;height:100%;background-color: white;padding: 10px">
    <div>

      <div style="display: flex;justify-content: space-around;align-items: center">

        <div style="flex: 6;display: flex;justify-content: center;align-items: center;
          padding-left: 10px;padding-right: 10px">
          <div style="width: 100px"> 工单编号：</div>
          <el-input style="" v-model="tableDataRequest.search.workId" placeholder="工单编号查询"/>
        </div>

        <div style="flex: 6;display: flex;justify-content: center;align-items: center;
          padding-left: 10px;padding-right: 10px">
          <div style="width: 100px"> 计划名称：</div>
          <el-input style="" v-model="tableDataRequest.search.planName" placeholder="计划名称查询"/>
        </div>

        <div style="flex: 6;display: flex;justify-content: center;align-items: center;
          padding-left: 10px;padding-right: 10px">
          <div style="width: 100px"> 工单状态：</div>
          <el-select style="width: 100%" v-model="tableDataRequest.search.status" size="large"
                     placeholder="选择工单状态">
            <el-option
                v-for="item in record_state_options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div style="height: 20px"/>
      <div style="display: flex;justify-content: space-around;align-items: center">

        <div style="flex: 8;display: flex;justify-content: center;align-items: center;
          padding-left: 10px;padding-right: 10px">
          <div style="width: 100px"> 开始时间：</div>
          <el-date-picker style="width: 100%" v-model="tableDataRequest.search.startDate" type="date"
                          placeholder="工单开始时间">
          </el-date-picker>
        </div>

        <div style="flex: 8;display: flex;justify-content: center;align-items: center;
          padding-left: 10px;padding-right: 10px">
          <div style="width: 100px"> 结束时间：</div>
          <el-date-picker style="width: 100%" v-model="tableDataRequest.search.finishDate" type="date"
                          placeholder="工单结束时间">
          </el-date-picker>
        </div>

        <div style="flex: 8;display: flex;justify-content: center;align-items: center;
          padding-left: 10px;padding-right: 10px">
          <div style="width: 100px"> 负责人：</div>
          <el-input style="" v-model="tableDataRequest.search.userName" placeholder="负责人姓名查询"/>
        </div>
      </div>

      <div style="height: 20px"/>
      <div style="display: flex;justify-content: space-around;align-items: center">
        <div style="flex: 6;display: flex;justify-content: center;align-items: center;
          padding-left: 10px;padding-right: 10px">
          <div style="width: 100px"> 设备编号：</div>
          <el-input style="width: 100%" v-model="tableDataRequest.search.deviceBh" placeholder="资产编号查询"/>
        </div>

        <div style="flex: 6;display: flex;justify-content: center;align-items: center;
          padding-left: 10px;padding-right: 10px"></div>

        <div style="flex: 6;display: flex;justify-content: center;align-items: center;
          padding-left: 10px;padding-right: 10px"></div>

      </div>
      <div style="height: 20px"/>

      <div style="display: flex;justify-content: end;align-items: center">
        <el-button @click="search" style="background-color: #006590;color: #FFFFFF" size="medium">检索</el-button>
        <el-button @click="clear" size="medium">清空</el-button>
      </div>

    </div>
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
          <el-button style="background-color: #006590;color: #FFFFFF" size="small" icon="el-icon-edit" @click="showDialog(row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        v-model:currentPage="tableDataRequest.page"
        :page-sizes="[10, 50, 100]"
        v-model:page-size="tableDataRequest.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableDataTotal"
        @size-change="handleSizeChange"
        @current-change="handleCurrentPageChange"
        style="height: 5%">
      >
    </el-pagination>
    <!--    工单详情    -->

    <Detail :is-show="itemDetailVisible" :e-data="itemDetailData.data" :e-data2="adress" @handleClose="handleClose" @backHistory="backHistory"/>


  </div>
</template>

<script lang="ts" setup>
import {ref, reactive, onBeforeMount, toRaw} from 'vue'
import {get_warning_list} from "@/api/business";
import Detail from "@/components/ItemDetail/Detail.vue"

import {ElMessage} from 'element-plus'
import {getRoles} from "@/utils/auth";

const adress="index"
const tableLoading = ref(false)
const tableData = reactive([] as any[])
const tableDataTotal = ref(0)
const user_fz_loading = ref(false)
const user_fz_options = reactive([] as any[])

// Detail 组件传参
const itemDetailVisible = ref(false)
const itemDetailData = reactive({} as any)

let tableDataRequest: WarningListTableDataRequest = reactive({
  page: 1,
  pageSize: 10,
  search: {
    workId:null,
    planName:"",
    status:null,
    startDate:null,
    finishDate:null,
    userName:"",
    deviceBh:""
  },
  phone:getRoles(),
  sort: "",
  order: ''
})

const handleSizeChange = (val: number): void => {
  console.log("handleSizeChange")
  tableDataRequest.page = 1
  tableDataRequest.pageSize = val
  setTimeout(() => {
    // 解决因为改变pagesize，错误触发currentPageChange方法的问题。
    // pagesize=10，当前页=5时，将pagesize改变成50，即使设定currentpage=1，也会
    // 触发handleCurrentPageChange，并传入pagesize改变后重新计算的当前页（3）。。。
    handleCurrentPageChange(1)
  }, 40)
}

const handleCurrentPageChange = (val: number): void => {
  tableDataRequest.page = val
  console.log("handleCurrentPageChange", val)
  getTableData(tableDataRequest)
  console.log("index:"+itemDetailData.data)
}

const getTableDataTotal = (val:number) => {
  tableDataTotal.value = val
}

const handleSortChange = (column: any) => {
  tableDataRequest.sort = column.prop
  if(column.order=="ascending"){
    tableDataRequest.order ="asc"
  }else {
    tableDataRequest.order ="desc"
  }

  tableDataRequest.pageSize = 10
  tableDataRequest.page = 1
  getTableData(tableDataRequest)

}

const getTableData = (tableDataRequest: WarningListTableDataRequest): void => {
  tableLoading.value = true
  get_warning_list(tableDataRequest).then((res) => {
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
  /*console.log("getTableData")
  tableLoading.value = true
  setTimeout(() => {
    get_warning_list(tableDataRequest).then((res: any) => {
      tableData.length = 0
      tableData.push(...res.data)
      tableLoading.value = false
    })
  }, 1000)*/
}

const search = () => {
  tableDataRequest.pageSize = 10
  tableDataRequest.page = 1
  getTableData(tableDataRequest)
  /*getTableDataTotal()*/
}

const clear = () => {
  tableDataRequest.search = {}
  search()
}

const showDialog = (row: any) => {
  console.log("我是点击详情后的信息",row)
  itemDetailData.data = toRaw(row)
  itemDetailVisible.value = true
  console.log("itemDetailVisible.value: "+JSON.stringify(itemDetailData.data))
}

onBeforeMount(() => {
  getTableData(tableDataRequest)
  /*getTableDataTotal()*/

})

const record_state_options = ref([
  {
    value: '1',
    label: '已完成',
  },
  {
    value: '2',
    label: '已过期',
  },
  {
    value: '0',
    label: '执行中',
  }
])

const handleClose = () => {

  console.log("handleClos")
  itemDetailVisible.value = false
  getTableData(tableDataRequest)
//刷新当前页面
  location.reload()

}
const backHistory= (res:any) => {
  itemDetailVisible.value = false
  tableDataRequest.pageSize = 10
  tableDataRequest.page = 1
  tableDataRequest.search.deviceBh=res
  getTableData(tableDataRequest)
}

</script>

<style lang="scss" scoped>
.flex-content {
  display: flex;

  .scrollbar-demo-item {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
}

</style>
