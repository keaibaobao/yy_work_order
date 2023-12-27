<template>
  <div style="display:flex;flex-direction: row;margin-left: 25px;">
    <div style="width: 400px;height: 900px;
    display: flex;flex-direction:column;justify-content: center;align-items: center;margin-right: 50px;">
      <div id="work" style="width: 300px;height:400px;"></div>
      <div id="staff" style="width: 300px;height:400px;"></div>
    </div>
    <div style="width:1200px;height: 900px;display: flex;flex-direction: column;">
      <div style="width: 1200px;height: 400px;
      display: flex;flex-direction: row;justify-content: space-around;align-items: center;margin-bottom: 50px;">
        <div style="width: 300px;height: 300px;" >
          <el-card shadow="always" style="width: 300px;height: 300px;border-radius: 15%">
            <div class="value">{{accomplishNum}}</div>
            <div class="text">当月完成工单数</div>
          </el-card>
        </div>
        <div style="width: 300px;height: 300px;">
          <el-card shadow="always" style="width: 300px;height: 300px;border-radius: 15%">
            <div class="value">{{pastNum}}</div>
            <div class="text">当月过期工单数</div>
          </el-card>
        </div>
        <div style="width: 300px;height: 300px;">
          <el-card shadow="always" style="width: 300px;height: 300px;border-radius: 15%">
            <div class="value">{{auditNum}}</div>
            <div class="text">当月过审工单数</div>
          </el-card>
        </div>
      </div>
      <div style="width: 1200px;height: 450px;display: flex;justify-content: center;align-items: center;">
        <img src="/img/szhtLogo2.png" style="width: 900px;"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  ref,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onActivated,
  onDeactivated, onErrorCaptured, onRenderTriggered, onRenderTracked
} from "vue";
import app from "@/main";
import {staff_ratio, statusNum, workIng} from "@/api/business";

const workdata=[{}]
const staffdata=[{}]
let accomplishNum = ref(0)
let pastNum = ref(0)
let auditNum = ref(0)
console.log("===========================setup")
onBeforeMount(()=>{
  console.log("===========================onBeforeMount")
})
onMounted(() => {
  console.log("===========================onMounted")
  /*工单比例*/
  workIng().then((res: any) => {
    workdata.length=0
    workdata.push(res[0])
    workdata.push(res[1])
    workdata.push(res[2])
    const myChartw = app.config.globalProperties.$echarts.init(document.getElementById("work"));

    myChartw.setOption({
      title: {
        text: "目前需要执行的工单比例",
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '40',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: workdata
        }
      ]
    });
    console.log(workdata)
  })
  /*人员比例*/
  staff_ratio().then((res:any) => {
    staffdata.length=0
    staffdata.push(res[0])
    staffdata.push(res[1])
    staffdata.push(res[2])
    const myCharts = app.config.globalProperties.$echarts.init(document.getElementById("staff"));
    myCharts.setOption({
      title: {
        text: "不同部门的员工比例",
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '40',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: staffdata
        }
      ]
    });
    console.log(staffdata)
  })
  /*当月完成工单数*/
  statusNum(1).then((res: any) => {
    console.log("完成",res)
    accomplishNum.value=res
  })
  /*当月过期工单数*/
  statusNum(2).then((res: any) => {
    console.log("过期"+res)
    pastNum.value=res
  })
  /*当月过审工单数*/
  statusNum(4).then((res: any) => {
    console.log("过审"+res)
    auditNum.value=res
  })
})
onBeforeUpdate(()=>{
  console.log("===========================onBeforeUpdate")
})
onUpdated(()=>{
  console.log("===========================onUpdated")
})
onBeforeUnmount(()=>{
  console.log("===========================onBeforeUnmount")
})
onUnmounted(()=>{
  console.log("===========================onUnmounted")
})
onActivated(()=>{
  console.log("===========================onActivated")
})
onDeactivated(()=>{
  console.log("===========================onDeactivated")
})
onErrorCaptured(()=>{
  console.log("===========================onErrorCaptured")
})
onRenderTriggered(()=>{
  console.log("===========================onRenderTriggered")
})
onRenderTracked(()=>{
  console.log("===========================onRenderTracked")
})

</script>
<style lang="scss" scoped>
.value{
  font-size: xxx-large;
  height:105px;
  line-height:105px;
  text-align:center;
}
.text{
  font-size: x-large;
  height:105px;
  line-height:105px;
  text-align:center;
}
</style>
