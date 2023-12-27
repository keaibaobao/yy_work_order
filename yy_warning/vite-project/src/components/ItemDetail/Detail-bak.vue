<!--

<template>
  <el-dialog width="60%" top="8vh" v-model="myIsShow" title="工单详情" :before-close="handleClose"
             @open="open()"
             destroy-on-close>
    <template #default>
      <div style="font-size: 16px;width: 100%;height:100%;background-color: white;  ">
        <template v-if="myData.data.record_state==='已完成'">
          <el-alert type="info" :closable="false">
            &lt;!&ndash;工单状态提示&ndash;&gt;
            <div style="font-size: 16px">当前工单状态为：已完成</div>
          </el-alert>
        </template>

        <template v-if="myData.data.record_state==='执行中'">
          <el-alert type="success" :closable="false">
            &lt;!&ndash;工单状态提示&ndash;&gt;
            <div style="font-size: 16px">当前工单状态为：执行中</div>
          </el-alert>
        </template>

        <template v-if="myData.data.record_state==='延期'">
          <el-alert type="warning" :closable="false">
            &lt;!&ndash;工单状态提示&ndash;&gt;
            <div style="font-size: 16px">当前工单状态为：延期</div>
          </el-alert>
        </template>

        <template v-if="myData.data.record_state==='严重过期'">
          <el-alert type="error" :closable="false">
            &lt;!&ndash;工单状态提示&ndash;&gt;
            <div style="font-size: 16px">当前工单状态为：严重过期</div>
          </el-alert>
        </template>
        &lt;!&ndash;行&ndash;&gt;
        <div style="display: flex;justify-content: space-between;align-items: center;padding: 15px">
          <div style="flex: 1;display: flex; justify-content: start;align-items: center">
            <div style="width: 180px"> 工单编号：</div>
            <div>{{ ( datailData.data.workId)}}</div>
          </div>

          <div style="flex: 1;display: flex; justify-content: start;align-items: center;">
            <div style="width: 180px"> 计划名称：</div>
            <el-tooltip :content="datailData.data?.planName" placement="top" effect="light">
              <div>{{ ellipsisHandler(datailData.data?.planName) }}</div>
            </el-tooltip>
          </div>

          <div style="flex: 1;display: flex; justify-content: start;align-items: center">
            <div style="width: 180px"> 工单类型：</div>
            <div>{{datailData.data.sys}}</div>
          </div>

        </div>
        &lt;!&ndash;行&ndash;&gt;
        <div style="display: flex;justify-content: space-between;align-items: center;padding: 15px">
          <div style="flex: 1;display: flex; justify-content: start;align-items: center">
            <div style="width: 180px"> 设备名称：</div>
            <div>{{datailData.data.deviceName}}</div>
          </div>

          <div style="flex: 1;display: flex; justify-content: start;align-items: center">
            <div style="width: 180px"> 设备型号：</div>
            <div>{{datailData.data.deviceBh}}</div>
          </div>

          <div style="flex: 1;display: flex; justify-content: start;align-items: center">
            <div style=" width: 180px"> 设备分类：</div>
            <div>{{datailData.data.deviceClassify}}</div>
          </div>

        </div>

        &lt;!&ndash;行&ndash;&gt;
        <div style="display: flex;justify-content: space-between;align-items: center;padding: 15px">

          <div style="flex: 1;display: flex; justify-content: start;align-items: center">
            <div style="width: 180px"> 所属院区：</div>
            <div>{{datailData.data.areaName}}</div>
          </div>

          <div style="flex: 1;display: flex; justify-content: start;align-items: center">
            <div style="width: 180px"> 所属科室：</div>
            <div>{{datailData.data.deptName}}</div>
          </div>

          <div style="flex: 1;display: flex; justify-content: start;align-items: center">
            <div style=" width: 180px"> 所属区域：</div>
            <div>{{datailData.data.regionName}}</div>
          </div>

        </div>

        &lt;!&ndash;行&ndash;&gt;
        <div style="display: flex;justify-content: space-between;align-items: center;padding: 15px">

          <div style="flex: 1;display: flex; justify-content: start;align-items: center">
            <div style=" width: 180px"> 检测周期：</div>
            <div>{{datailData.data.period}}天</div>
          </div>

          <div style="flex: 1;display: flex; justify-content: start;align-items: center">
            <div style=" width: 180px"> 检测人：</div>
            <div>{{datailData.data.userName}}</div>
          </div>

          <div style="flex: 1;display: flex; justify-content: start;align-items: center">
            <div style=" width: 180px"> 审核人：</div>
            <div>{{datailData.data.auditName}}</div>
          </div>
        </div>
&lt;!&ndash;        计量详情&ndash;&gt;
        <template v-if="myData.data.sys==='计量'">
        <meterage-detail :mData="datailData.data" :mData2="myData.data" @MeterageSubmitData="MeterageSubmitData"></meterage-detail>
        </template>
&lt;!&ndash;        巡检详情&ndash;&gt;
        <template v-if="myData.data.sys==='巡检'">
          <examine-detail :mData="datailData.data" :mData2="myData.data" @ExamineSubmitData="ExamineSubmitData"></examine-detail>
        </template>
&lt;!&ndash;        维修详情&ndash;&gt;
        <template v-if="myData.data.sys==='维修'">
          <Repair-detail :mData="datailData.data" :mData2="myData.data" @RepairSubmitData="RepairSubmitData"></Repair-detail>
        </template>
        &lt;!&ndash;       保养详情&ndash;&gt;
        <template v-if="myData.data.sys==='保养'">
&lt;!&ndash;          <Upkeep-detail :mData="datailData.data" :mData2="myData.data" @UpkeepSubmitData="UpkeepSubmitData"></Upkeep-detail>&ndash;&gt;
        </template>

        <template v-if="myData.data.record_state==='已完成'">
          <div
              style="display: flex;justify-content: right;align-items: center;padding: 15px;color: #0E6BE6; ">
            <div @click="backHistory()"><u>相关历史工单记录</u></div>
          </div>
        </template>
      </div>&lt;!&ndash;我是最外层div&ndash;&gt;
    </template>

    <template  #footer>

    </template>
  </el-dialog>

</template>

<script lang="ts">
import {onMounted, reactive, defineComponent, toRefs, watch, ref} from 'vue'

import {get_warning_examine, get_warning_measure,get_warning_repair,get_warning_upkeep} from "@/api/business";
import MeterageDetail from "@/components/ItemDetail/MeterageDetail.vue";
import ExamineDetail from "@/components/ItemDetail/ExamineDetail.vue";
import RepairDetail from "@/components/ItemDetail/RepairDetail.vue";
import UpkeepDetail from "@/components/ItemDetail/UpkeepDetail.vue";

/*
  本来打算继续使用<script setup>模式开发组件，发现bug，emit未定义，只好改回setup()
  https://v3.cn.vuejs.org/api/sfc-script-setup.html
 */

export default defineComponent({
  components:{ExamineDetail, MeterageDetail,RepairDetail,UpkeepDetail},
  // 这是组件基本写法，接受传参，返回事件
  emits: ['handleClose','backHistory'],
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    eData: {
      type: Object,
      default: {}
    }
  },

  setup(props, {emit}) {


    //弹窗刚打开就要运行的函数
    const open = () => {
      if (myData.data.sys=='计量'){
        get_warning_measure(parseInt(JSON.stringify(myData.data.workId))).then((res) => {
          datailData.data=JSON.parse(JSON.stringify(res))
          console.log("我在检验父组件里要传的数据(计量)"+JSON.stringify(datailData.data))
        })
      }else if(myData.data.sys=='巡检'){
        get_warning_examine(parseInt(JSON.stringify(myData.data.workId))).then((res) => {
          datailData.data=JSON.parse(JSON.stringify(res))[0]
          console.log("我在检验父组件里要传的数据(巡检)",datailData)

        })
      }else if(myData.data.sys=='维修'){
        get_warning_repair(parseInt(JSON.stringify(myData.data.workId))).then((res) => {
          datailData.data=JSON.parse(JSON.stringify(res))
          console.log("我在检验父组件里要传的数据()"+JSON.stringify(datailData.data))

        })
      }else if(myData.data.sys=='保养'){
        get_warning_upkeep(parseInt(JSON.stringify(myData.data.workId))).then((res) => {
          datailData.data= res
          console.log("我在检验父组件里要传的数据（保养）"+JSON.stringify(datailData.data))

        })
      }
      myIsShow.value = true
      console.log("myIsShow.value = isShow.value" ,myIsShow.value)
    }

    // 不能采用es6解构，会破坏响应式，需要通过toRefs，如果非必传值，通过toRef解构
    const {isShow, eData} = toRefs(props)
    const myIsShow = ref(false)
    const myData = reactive({} as any)
    const datailData = reactive({
      data:{

      }
    } as any)
    myData.data = eData
     open()
    // 监听入参，转换给本地响应式变量，是因为组件v-model会改变对象，入参只读，所以会报错
    watch(isShow, () => {
      myIsShow.value = isShow.value
    })

    watch(eData, () => {
      myData.data = eData
    })





    // 关闭dialog，从父组件
    const handleClose = () => {
      // dialog关闭应该会自动处理它，把他false了
      // myIsShow.value = false

      /*imgPath.splice(0,imgPath.length);
      filePath.splice(0,filePath.length);*/
      /*attachmentFiles.splice(0,attachmentFiles.length);
      attachmentImages.splice(0,attachmentImages.length);*/
      emit('handleClose');
    }
    const backHistory= () => {
      emit('backHistory',datailData.data.deviceBh);
    }
    const MeterageSubmitData= () => {
      handleClose()
    }
    const RepairSubmitData= () => {
      handleClose()
    }
    const ExamineSubmitData= () => {
      handleClose()
    }

    const UpkeepSubmitData= () => {
      handleClose()
    }
    // const ellipsisHandler = (text: string) => text.slice(0, 8) + "..."
    const ellipsisHandler = (text: string) => text


    onMounted(() => {
      console.log("我是Detail部分====================")
      // open();
    })

    return {
      handleClose,
      ellipsisHandler,
      myData,
      myIsShow,
      open,
      datailData,
      MeterageSubmitData,
      ExamineSubmitData,
      RepairSubmitData,
      UpkeepSubmitData,
      backHistory
    }

  }


})
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
-->
