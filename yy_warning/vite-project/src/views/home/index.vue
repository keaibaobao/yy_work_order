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
import {onMounted, ref} from "vue";
import {staff_ratio, statusNum, workIng} from "@/api/business";

const workdata=[{}]
const staffdata=[{}]
let accomplishNum = ref(0)
let pastNum = ref(0)
let auditNum = ref(0)
onMounted(() => {

  /*工单比例*/
  workIng().then((res: any) => {
    workdata.length=0
    workdata.push(res[0])
    workdata.push(res[1])
    workdata.push(res[2])
  })
  /*人员比例*/
  staff_ratio().then((res:any) => {
    staffdata.length=0
    staffdata.push(res[0])
    staffdata.push(res[1])
    staffdata.push(res[2])
  })
  /*当月完成工单数*/
  statusNum(1).then((res: any) => {
    console.log(res)
    accomplishNum.value=res
  })
  /*当月过期工单数*/
  statusNum(2).then((res: any) => {
    pastNum.value=res
  })
  /*当月过审工单数*/
  statusNum(4).then((res: any) => {
    auditNum.value=res
  })
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
