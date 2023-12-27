<template>
      <el-dialog width="60%" top="8vh" v-model="myIsShow" title="工单详情" :before-close="handleClose"
             @open="open()"
             destroy-on-close>
        <template #default>
          <div style="font-size: 16px;width: 100%;height:100%;background-color: white;  ">

                <template v-if="myData.data.record_state==='已完成'">
                  <el-alert type="success" :closable="false">
                    <!--工单状态提示-->
                    <div style="font-size: 16px">当前工单状态为：已完成</div>
                  </el-alert>
                </template>

                <template v-if="myData.data.record_state==='执行中'">
                  <el-alert  :closable="false">
                    <!--工单状态提示-->
                    <div style="font-size: 16px">当前工单状态为：执行中</div>
                  </el-alert>
                </template>

                <template v-if="myData.data.record_state==='已过期'">
                  <el-alert type="error" :closable="false">
                    <!--工单状态提示-->
                    <div style="font-size: 16px">当前工单状态为：已过期</div>
                  </el-alert>
                </template>

                <template v-if="myData.data.record_state==='已验收'">
                  <el-alert type="success" :closable="false">
                    <!--工单状态提示-->
                    <div style="font-size: 16px">当前工单状态为：已验收</div>
                  </el-alert>
                </template>
                <!--行-->
                <div style="display: flex;justify-content: space-between;align-items: center;padding: 15px">
                  <div style="flex: 1;display: flex; justify-content: start;align-items: center">
                    <div style="width: 180px"> 工单编号：</div>
                    <div>{{datailData.data.workId}}</div>
                  </div>

                  <div style="flex: 1;display: flex; justify-content: start;align-items: center;">
                    <div style="width: 180px"> 计划名称：</div>
                    <el-tooltip :content="datailData.data.planName" placement="top" effect="light">
                      <div>{{ ellipsisHandler(datailData.data.planName) }}</div>
                    </el-tooltip>
                  </div>

                  <div style="flex: 1;display: flex; justify-content: start;align-items: center">
                    <div style="width: 180px"> 工单类型：</div>
                    <div>{{datailData.data.sys}}</div>
                  </div>

                </div>
                <!--行-->
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
                <!--行-->
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
                <!--行-->
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
                <!--        计量详情-->
                <template v-if="myData.data.sys==='计量'">
                <meterage-detail :mData="datailData.data" :mData2="myData.data" @MeterageSubmitData="MeterageSubmitData"></meterage-detail>
                </template>
                <!--        巡检详情-->
                <template v-if="myData.data.sys==='巡检'">
                  <examine-detail :mData="datailData.data" :mData2="myData.data" @ExamineSubmitData="ExamineSubmitData"></examine-detail>
                </template>
                <!--       保养详情-->
                <template v-if="myData.data.sys==='保养'">
                  <Upkeep-detail :mData="datailData.data" :mData2="myData.data" @UpkeepSubmitData="UpkeepSubmitData"></Upkeep-detail>
                </template>
                <!--        维修详情-->
                <template v-if="myData.data.sys==='维修'">
                  <Repair-detail :mData="datailData.data" :mData2="myData.data" @RepairSubmitData="RepairSubmitData"></Repair-detail>
                </template>


                <template v-if="(myData.data.record_state==='已完成'||myData.data.record_state==='已验收')&&myData2!='sum'">
                  <div style="width:100%;padding: 15px;color: #006590; margin-top: 20px;">
                    <div @click="backHistory()" style="float: right;"><u>相关历史工单记录</u></div>
                  </div>
                </template>
              </div><!--我是最外层div-->
        </template>
      </el-dialog>
</template>

<script lang="ts">
import {onMounted, reactive, defineComponent, toRefs, watch, ref} from 'vue'

import {get_warning_examine, get_warning_measure,get_warning_repair,get_warning_upkeep} from "@/api/business.ts";
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
    },
    eData2:{
      type: String,
      default: ""
    }
  },

  setup(props, {emit}) {
    // 不能采用es6解构，会破坏响应式，需要通过toRefs，如果非必传值，通过toRef解构
    const {isShow, eData,eData2} = toRefs(props)
    const myIsShow = ref(false)
    const myData = reactive({} as any)
    const myData2=ref(eData2)
    const datailData = reactive({
      data:{
        workId:"111",
        planName:"dddddd",
         sys:"SADS",
         deviceBh:"HT",
         deviceName:"FS",
         deviceClassify:"GDFG",
         address:"FG",
         userName:"DA",
         auditName:"FDF",
         execDate:"SFSDF",
         deptName:"SFS",
         areaName:"FS",
         regionName:"SDFS",
         period:"FSDF",
      }
    } as any)



    // 监听入参，转换给本地响应式变量，是因为组件v-model会改变对象，入参只读，所以会报错
    watch(isShow, () => {
      myIsShow.value = isShow.value
    })

    watch(eData, () => {
      myData.data = eData
      /*open()*/
    })


    //弹窗刚打开就要运行的函数
      const open = () => {
      if (myData.data.sys=='计量'){
        get_warning_measure(myData.data.workId).then((res) => {
          datailData.data=JSON.parse(JSON.stringify(res))
          console.log("我在检验父组件里要传的数据"+JSON.stringify(datailData.data))
        })
      }else if(myData.data.sys=='巡检'){
          get_warning_examine(myData.data.workId).then((res) => {
          datailData.data=JSON.parse(JSON.stringify(res))[0]
          console.log("我在检验父组件里要传的数据",datailData)
        })
      }else if(myData.data.sys=='维修'){
        get_warning_repair(myData.data.workId).then((res) => {
          datailData.data=JSON.parse(JSON.stringify(res))
          console.log("我在检验父组件里要传的数据"+JSON.stringify(datailData.data))
        })
      }else if(myData.data.sys=='保养'){
        get_warning_upkeep(myData.data.workId).then((res) => {
          datailData.data=JSON.parse(JSON.stringify(res))
          console.log("我在检验父组件里要传的数据"+JSON.stringify(datailData.data))
        })
      }

    }



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
    const ellipsisHandler = (text: string) => text.slice(0, 8) + "..."


    onMounted(() => {

    })

    return {
      handleClose,
      ellipsisHandler,
      myData,
      myData2,
      myIsShow,
      open,
      datailData,
      MeterageSubmitData,
      ExamineSubmitData,
      RepairSubmitData,
      UpkeepSubmitData,
      backHistory,
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
@media print{
  .no-print{
    display: none;
  }
}
/*打印页配置*/
@page{
  margin:60px 10px;
}
</style>
