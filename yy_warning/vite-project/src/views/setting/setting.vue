<template>
  <div class="user-manage-view">
    <!--  赛选输入框-->
    <div>
      <div style="display: flex;justify-content: space-around;align-items: center">
        <div style="flex: 6;display: flex;justify-content: center;align-items: center;
          padding-left: 10px;padding-right: 10px">
          <div style="width: 100px"> 工号：</div>
          <el-input style="" v-model="tableDataRequest.search.bh" placeholder="工号查询"/>
        </div>

        <div style="flex: 6;display: flex;justify-content: center;align-items: center;
          padding-left: 10px;padding-right: 10px">
          <div style="width: 100px"> 姓名：</div>
          <el-input style="" v-model="tableDataRequest.search.name" placeholder="姓名查询"/>
        </div>

        <div style="flex: 6;display: flex;justify-content: center;align-items: center;
          padding-left: 10px;padding-right: 10px">
          <div style="width: 100px"> 电话号码：</div>
          <el-input style="" v-model="tableDataRequest.search.phone" placeholder="电话号码查询"/>
        </div>

        <div style="flex: 6;display: flex;justify-content: center;align-items: center;
          padding-left: 10px;padding-right: 10px">
          <div style="width: 100px"> 部门：</div>
          <el-input style="" v-model="tableDataRequest.search.sys" placeholder="部门查询"/>
        </div>
      </div>
      <div style="height: 20px"/>

      <div style="float: right;">
        <el-button @click="search" style="background-color: #006590;color: #FFFFFF" size="medium">检索</el-button>
        <el-button @click="clear" size="medium">清空</el-button>
      </div>

    </div>
    <!--    添加按钮-->
    <div class="header-box">
      <el-button style="background-color: #006590;color: #FFFFFF" icon="el-icon-plus" @click="showDialog">添加用户</el-button>
    </div>
    <!--  展示员工表格-->
    <el-table v-loading="tabelLoading" border :data="tableList">
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="bh" label="工号" />
      <el-table-column prop="phone" label="电话" />
      <el-table-column prop="sys" label="部门" />
      <el-table-column label="操作" width="200">
        <template #default="{ row }">
          <el-button style="background-color: #006590;color: #FFFFFF" size="small" icon="el-icon-edit" @click="showDialog(2, row)">修改</el-button>
          <el-button style="background-color: #006590;color: #FFFFFF" size="small" icon="el-icon-delete" @click="deleteUser(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--    分页栏-->
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
    <!--    添加修改框-->
    <el-dialog v-model="dialogVisible" :title="dialogFlag === 2 ? '修改' : '添加'">
      <el-form ref="userFormRef" v-loading="formLoading" :model="userForm" label-width="80px">
        <el-form-item prop="name" label="姓名">
          <el-input v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="bh" label="工号">
          <el-input v-model="userForm.bh"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="电话">
          <el-input v-model="userForm.phone"></el-input>
        </el-form-item>
        <el-form-item prop="sys" label="部门">
          <el-input v-model="userForm.sys"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" :disabled="formLoading" @click="addOrUpdateUser">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onBeforeMount, getCurrentInstance } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import {get_userinfo_list, add_user, update_user, delete_user} from "@/api/business";


/**
 * 获取组件实例
 * 其实不用这么麻烦，直接 import { DateFormat } from '@/utils/util' 更方便
 * 我只是试试这个API
 */
const internalInstance = getCurrentInstance()
const DateFormat = internalInstance?.appContext.config.globalProperties.$DateFormat
const dialogFlag = ref(1)
const dialogVisible = ref(false)
const tabelLoading = ref(false)
const formLoading = ref(false)
const userFormRef = ref(null)
const tableDataTotal = ref(0)
const roleList: Array<any> = reactive([])
const tableList: Array<any> = reactive([])
const userForm: any = reactive({
  id:null,
  name: "",
  bh: "",
  phone: "",
  sys: "",
})
let tableDataRequest: WarningListTableDataRequest = reactive({
  page: 1,
  pageSize: 10,
  search: {
    bh:"",
    phone:"",
    name:"",
    sys:""
  },
  sort: "",
  order: ''
})
onBeforeMount(() => {
  getTableList()
  /* getRoles()*/
})


const search = () => {
  tableDataRequest.pageSize = 10
  tableDataRequest.page = 1
  getTableList()
  /*getTableDataTotal()*/
}

const clear = () => {
  tableDataRequest.search = {}
  search()
}
/**
 * 获取表格列表
 */
const getTableList = () => {
  tabelLoading.value = true
  get_userinfo_list(tableDataRequest)
      .then((res: any) => {
        tableList.length = 0
        getTableDataTotal(res.data.total)
        tableList.push(...res.data.list)
        console.log("我正在检索3",tableList)
      })
      .finally(() => {
        tabelLoading.value = false
      })
}
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
  getTableList()
  /*console.log("index:"+itemDetailData.data)*/
}
const getTableDataTotal = (val:number) => {
  tableDataTotal.value = val
}


/**
 * 获取角色名
 */
/*
const getRoleName = (id: string) => {
  let name = id
  roleList.forEach((group) => {
    if (group.id === id) {
      name = group.name
    }
  })
  return name
}
*/

/**
 * 展开弹窗
 */
const showDialog = (flag: number, row: any) => {
  dialogVisible.value = true
  dialogFlag.value = flag
  console.log("===========",row)
  if (flag === 2) {
    for (const key in row) {
      userForm[key] = row[key]
    }
  } else {
    for (const key in userForm) {
      userForm[key] = ''
    }
  }
}

/**
 * 添加或更新用户
 */
const addOrUpdateUser = () => {
  formLoading.value = true
  if (dialogFlag.value === 2) {
    //更改用户信息
    update_user(userForm.id,userForm.name,userForm.bh,userForm.phone,userForm.sys)
        .then((res: any) => {
          getTableList()
          dialogVisible.value = false
        })
        .finally(() => {
          formLoading.value = false
        })
    /*  update_user_info({ ...userForm })
        .then(() => {
          getTableList()
          dialogVisible.value = false
        })
        .finally(() => {
          formLoading.value = false
        })*/
  } else {
    //添加用户
    add_user(userForm.name,userForm.bh,userForm.phone,userForm.sys)
        .then((res: any) => {
          getTableList()
          dialogVisible.value = false
        })
        .finally(() => {
          formLoading.value = false
        })

  }
}

/**
 * 删除用户
 */
const deleteUser = (row: any) => {
  ElMessageBox.confirm(`确定删除 ${row.name} ？`, '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
      .then(() => {
        delete_user(row.id).then(() => {
          getTableList()
          ElMessage({
            type: 'success',
            message: '删除成功'
          })
        })
      })
      .catch(() => {})
}
</script>

<style lang="scss" scoped>
.header-box {
  margin-bottom: 10px;
}
</style>
