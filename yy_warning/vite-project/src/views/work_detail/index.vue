<template>
  <div style="font-size: 16px;width: 100%;height:100%;background-color: white; ">

    <el-alert type="success" :closable="false">
      <!--工单状态提示--><div style="font-size: 16px">当前工单状态为：已完成</div>
    </el-alert>
    <!--行-->
    <div style="display: flex;justify-content: space-between;align-items: center;padding: 15px">
      <div style="flex: 1;display: flex; justify-content: start;align-items: center">
        <div style="width: 180px"> 工单编号：</div>
        <div>{{workData.workId}}</div>
      </div>

      <div style="flex: 1;display: flex; justify-content: start;align-items: center;">
        <div style="width: 180px"> 计划名称：</div>
        <div>{{workData.planName}}</div>
      </div>

      <div style="flex: 1;display: flex; justify-content: start;align-items: center">
        <div style="width: 180px"> 工单类型：</div>
        <div>{{workData.sys}}</div>
      </div>

    </div>
    <!--行-->
    <div style="display: flex;justify-content: space-between;align-items: center;padding: 15px">
      <div style="flex: 1;display: flex; justify-content: start;align-items: center">
        <div style="width: 180px"> 设备名称：</div>
        <div>{{checkData.deviceName}}</div>
      </div>

      <div style="flex: 1;display: flex; justify-content: start;align-items: center">
        <div style="width: 180px"> 设备型号：</div>
        <div>{{workData.deviceBh}}</div>
      </div>

      <div style="flex: 1;display: flex; justify-content: start;align-items: center">
        <div style=" width: 180px"> 设备分类：</div>
        <div>{{checkData.deviceClassify}}</div>
      </div>

    </div>
    <!--行-->
    <div style="display: flex;justify-content: space-between;align-items: center;padding: 15px">

      <div style="flex: 1;display: flex; justify-content: start;align-items: center">
        <div style="width: 180px"> 所属院区：</div>
        <div>{{workData.areaName}}</div>
      </div>

      <div style="flex: 1;display: flex; justify-content: start;align-items: center">
        <div style="width: 180px"> 所属科室：</div>
        <div>{{workData.deptName}}</div>
      </div>

      <div style="flex: 1;display: flex; justify-content: start;align-items: center">
        <div style=" width: 180px"> 所属区域：</div>
        <div>{{workData.regionName}}</div>
      </div>

    </div>
    <!--行-->
    <div style="display: flex;justify-content: space-between;align-items: center;padding: 15px">

      <div style="flex: 1;display: flex; justify-content: start;align-items: center">
        <div style=" width: 180px"> 检测周期：</div>
        <div>{{checkData.period}}天</div>
      </div>

      <div style="flex: 1;display: flex; justify-content: start;align-items: center">
        <div style=" width: 180px"> 检测人：</div>
        <div>{{workData.userName}}</div>
      </div>

      <div style="flex: 1;display: flex; justify-content: start;align-items: center">
        <div style=" width: 180px"> 审核人：</div>
        <div>{{workData.auditName}}</div>
      </div>
    </div>
    <!-- 保养详情-->
    <template v-if="workData.sys==='保养'">
      <div>
        <el-divider content-position="left">保养详情</el-divider>

        <div style="display: flex;justify-content: space-between;align-items: center;padding: 15px">
            <div style="flex: 1;display: flex; justify-content: start;align-items: center">
              <div style="width: 180px"> 保养类型：</div>
              <div>{{checkData.upkeepClassify}}</div>
            </div>

            <div style="flex: 1;display: flex; justify-content: start;align-items: center">
              <div style="width: 180px"> 保养费用：</div>
              <div>{{checkData.upkeepExpense}}元</div>
            </div>

          </div>
        <el-table :data="tableData" stripe style="width: 100%">
              <el-table-column prop="item_content" label="项目名称" width="180" />
              <el-table-column prop="notice" label="注意事项" width="180" />
              <el-table-column prop="upkeep_way" label="保养方法" />
            </el-table>
        <div style="display: flex;justify-content: space-between;align-items: center;padding: 15px">
              <div style="flex: 1;display: flex; justify-content: start;align-items: center">
                是否有异常：{{checkData.isUnusual}}
              </div>
            </div>
      </div>

      <template v-if="attachmentImages!=''">
            <div style="display: flex;justify-content: space-between;align-items: center;padding: 15px" >
              <div>
                照片附件：
              </div>
            </div>
            <div style="display: flex;justify-content: space-between;align-items: center;padding: 15px">
              <el-scrollbar>
                <div class="flex-content">
                  <template v-for="img in attachmentImages">
                    <div style="width: 90px;height: 90px; margin-right: 60px" comment="我的存在只是为了出现滚动条。。。">
<!--                      <img v-gallery:attachmentImages style="width: 80px;height: 80px;  " :src="img" alt=""/>-->
                    </div>
                  </template>
                </div>
              </el-scrollbar>
            </div>
          </template>
      <template v-if="attachmentFiles!=''">
            <div style="display: flex;justify-content: space-between;align-items: center;padding: 15px">
              <div>
                文件附件：
              </div>
            </div>
            <div style="display: flex;justify-content: space-between;align-items: center;padding: 15px">
              <el-scrollbar height="150px">
                <template v-for="file in attachmentFiles">
                  <div style="width: 400px;height: 30px;
                  display: flex;justify-content: start;align-items: center;">
                    <i class="el-icon-files"/>
                    <a @click="downloadFile(file)" style="margin: 15px">{{ file }}</a>
                  </div>
                </template>
              </el-scrollbar>
            </div>
          </template>
    </template>
    <!-- 巡检详情-->
    <template v-if="workData.sys==='巡检'">
      <div>
        <el-divider content-position="left">巡检详情</el-divider>

        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="itemContent" label="检查项目名" width="400" />
          <el-table-column prop="value" label="检查结果" width="400" />
        </el-table>
      </div>

      <template v-if="attachmentImages!=''">
          <div style="display: flex;justify-content: space-between;align-items: center;padding: 15px" >
            <div>
              照片附件：
            </div>
          </div>
          <div style="display: flex;justify-content: space-between;align-items: center;padding: 15px">
            <el-scrollbar>
              <div class="flex-content">
                <template v-for="img in attachmentImages">
                  <div style="width: 90px;height: 90px; margin-right: 60px" comment="我的存在只是为了出现滚动条。。。">
<!--                    <img v-gallery:attachmentImages style="width: 80px;height: 80px;  " :src="img" alt=""/>-->
                  </div>
                </template>
              </div>
            </el-scrollbar>
          </div>
        </template>
      <template v-if="attachmentFiles!=''">
          <div style="display: flex;justify-content: space-between;align-items: center;padding: 15px">
            <div>
              文件附件：
            </div>
          </div>
          <div style="display: flex;justify-content: space-between;align-items: center;padding: 15px">
            <el-scrollbar height="150px">
              <template v-for="file in attachmentFiles">
                <div style="width: 400px;height: 30px;
                  display: flex;justify-content: start;align-items: center;">
                  <i class="el-icon-files"/>
                  <a @click="downloadFile(file)" style="margin: 15px">{{ file }}</a>
                </div>
              </template>
            </el-scrollbar>
          </div>
        </template>

    </template>
    <!-- 计量详情-->
    <template v-if="workData.sys==='计量'">
      <div>
        <el-divider content-position="left">计量详情</el-divider>

        <div style="display: flex;justify-content: space-between;align-items: center;padding: 15px">
          <div style="flex: 1;display: flex; justify-content: start;align-items: center">
            <div style="width: 180px"> 计量等级：</div>
            <div>{{checkData.measureGrade}}</div>
          </div>

          <div style="flex: 1;display: flex; justify-content: start;align-items: center">
            <div style="width: 180px"> 计量类别：</div>
            <div>{{checkData.measureClassify}}</div>
          </div>

          <div style="flex: 1;display: flex; justify-content: start;align-items: center">
            <div style=" width: 180px"> 计量证书编号：</div>
            <div>{{checkData.certificateBh}}</div>
          </div>
        </div>
        <div style="display: flex;justify-content: space-between;align-items: center;padding: 15px">
          <div style="flex: 1;display: flex; justify-content: start;align-items: center">
            <div style="width: 180px"> 计量单位：</div>
            <div>{{checkData.measureUnits}}</div>
          </div>

          <div style="flex: 1;display: flex; justify-content: start;align-items: center">
            <div style="width: 180px"> 出厂编号：</div>
            <div>{{checkData.manufacturBh}}</div>
          </div>

          <div style="flex: 1;display: flex; justify-content: start;align-items: center">
            <div style=" width: 180px"> 生产厂商：</div>
            <div>{{checkData.manufacturer}}</div>
          </div>
        </div>

        <div style="display: flex;justify-content: space-between;align-items: center;padding: 15px">
          <div style="flex: 1;display: flex; justify-content: start;align-items: center">
            <div style="width: 180px"> 计量应检日期：</div>
            <div>{{checkData.execDate}}</div>
          </div>

          <div style="flex: 1;display: flex; justify-content: start;align-items: center">
            <div style=" width: 180px"> 计量费用：</div>
            <div>{{checkData.expense}}</div>
          </div>

          <div style="flex: 1;display: flex; justify-content: start;align-items: center">
            <div style=" width: 180px"> 检定机构：</div>
            <div>{{checkData.organ}}</div>
          </div>
        </div>
        <div style="display: flex;justify-content: space-between;align-items: center;padding: 15px">
          <div style="flex: 1;display: flex; justify-content: start;align-items: center">
            <div style="width: 180px"> 检定方式：</div>
            <div>{{checkData.way==0?"院内":"外包"}}</div>
          </div>

          <div style="flex: 1;display: flex; justify-content: start;align-items: center">
            <div style="width: 180px"> 计量检测结果：</div>
            <div>{{checkData.result==true?"合格":"不合格"}}</div>
          </div>

          <div style="flex: 1;display: flex; justify-content: start;align-items: center">
            <div style="width: 180px"> 实际检测时间：</div>
            <div>{{checkData.workDate}}</div>
          </div>
        </div>
      </div>

      <template v-if="attachmentImages!=''">
        <div style="display: flex;justify-content: space-between;align-items: center;padding: 15px" >
          <div>
            照片附件：
          </div>
        </div>
        <div style="display: flex;justify-content: space-between;align-items: center;padding: 15px">
          <el-scrollbar>
            <div class="flex-content">
              <template v-for="img in attachmentImages">
                <div style="width: 90px;height: 90px; margin-right: 60px" comment="我的存在只是为了出现滚动条。。。">
<!--                  <img v-gallery:attachmentImages style="width: 80px;height: 80px;  " :src="img" alt=""/>-->
                </div>
              </template>
            </div>
          </el-scrollbar>
        </div>
      </template>
      <template v-if="attachmentFiles!=''">
        <div style="display: flex;justify-content: space-between;align-items: center;padding: 15px">
          <div>
            文件附件：
          </div>
        </div>
        <div style="display: flex;justify-content: space-between;align-items: center;padding: 15px">
          <el-scrollbar height="150px">
            <template v-for="file in attachmentFiles">
              <div style="width: 400px;height: 30px;
                  display: flex;justify-content: start;align-items: center;">
                <i class="el-icon-files"/>
                <a @click="downloadFile(file)" style="margin: 15px">{{ file }}</a>
              </div>
            </template>
          </el-scrollbar>
        </div>
      </template>

    </template>
  </div><!--我是最外层div-->
</template>

<script>
import {onBeforeMount, onMounted, reactive, ref, watch} from "vue";

import {get_examine_list, get_warning_examine,get_warning_upkeep, get_warning_work,get_warning_measure} from "../../api/business";


export default {

  setup() {
    let workId=4
    let workData = reactive({})
    let checkData = reactive({})
    const tableData = reactive([])
    const attachmentImages = reactive([] )
    const attachmentFiles = reactive([] )
    const begin=() => {

      get_warning_work(workId).then((res1) => {
        console.log("wwwwwwwwwwwwww",res1)
        workData.workId=Object(res1).workId
        workData.sys=Object(res1).sys
        workData.planName=Object(res1).planName
        workData.deviceBh=Object(res1).deviceBh
        workData.areaName=Object(res1).areaName
        workData.deptName=Object(res1).deptName
        workData.regionName=Object(res1).regionName
        workData.userName=Object(res1).userName
        workData.auditName=Object(res1).auditName
        workData.execDate=Object(res1).execDate
        workData.address=Object(res1).address
        if(workData.sys=="保养"){
          get_warning_upkeep(workId).then((res2) => {
            checkData.deviceName=Object(res2).deviceName
            checkData.deviceClassify=Object(res2).deviceClassify
            checkData.period=Object(res2).period
            checkData.upkeepClassify=Object(res2).upkeepClassify
            checkData.upkeepExpense=Object(res2).upkeepExpense
            checkData.isUnusual=Object(res2).isUnusual==true?"是":"否";
            let arr=JSON.parse(Object(res2).data)
            for(let i=0;i<arr.length;i++){
              tableData.push(
                  {
                    item_content: JSON.parse(JSON.stringify(arr[i])).upkeepItemContent,
                    notice: JSON.parse(JSON.stringify(arr[i])).upkeepAttention,
                    upkeep_way: JSON.parse(JSON.stringify(arr[i])).upkeepMethod,
                  }
              )
            }
            getAttachmentFiles(Object(res2).file)
            getAttachmentImages(Object(res2).photo)
            console.log("oooooooooooooooooooooooo",res2)
          });
        }else if(workData.sys=="巡检"){
          get_warning_examine(workId).then((res2) => {
            checkData.deviceName=Object(res2).deviceName
            checkData.deviceClassify=Object(res2).deviceClassify
            checkData.period=Object(res2).period

            get_examine_list(workData.workId).then((res) => {

              for (let i = 0; i < JSON.parse(JSON.stringify(res)).length; i++) {
                tableData.push(
                    {
                      itemId:JSON.parse(JSON.stringify(res))[i].itemId,
                      itemContent: JSON.parse(JSON.stringify(res))[i].itemContent,
                      resultType:JSON.parse(JSON.stringify(res))[i].resultType,
                      data: JSON.parse(JSON.parse(JSON.stringify(res))[i].data),
                      value:JSON.parse(JSON.stringify(res))[i].value,
                    }
                )

              }
            })

            getAttachmentFiles(Object(res2).file)
            getAttachmentImages(Object(res2).photo)
            console.log("oooooooooooooooooooooooo",res2)
          })
        }else if(workData.sys=="计量"){
          get_warning_measure(workId).then((res2) => {
            checkData.deviceName=Object(res2).deviceName
            checkData.deviceClassify=Object(res2).deviceClassify
            checkData.period=Object(res2).period

            checkData.measureGrade=Object(res2).measureGrade
            checkData.measureClassify=Object(res2).measureClassify
            checkData.certificateBh=Object(res2).certificateBh
            checkData.measureUnits=Object(res2).measureUnits
            checkData.manufacturBh=Object(res2).manufacturBh
            checkData.manufacturer=Object(res2).manufacturer
            checkData.execDate=Object(res2).execDate
            checkData.workDate=Object(res2).workDate
            checkData.organ=Object(res2).organ
            checkData.way=Object(res2).way
            checkData.result=Object(res2).result
            checkData.expense=Object(res2).expense



            getAttachmentFiles(Object(res2).file)
            getAttachmentImages(Object(res2).photo)
            console.log("oooooooooooooooooooooooo",res2)
          })
        }


      });
    }
    const getAttachmentImages = (photo) => {
      if(photo!=null){
        var m = photo.split(",");
        for(var i=0;i<m.length;i++){
          attachmentImages.push(m[i])
        }
      }
    }
    const getAttachmentFiles = (file) => {
      if(file!=null){
        var m = file.split(",");
        for(var i=0;i<m.length;i++){
          attachmentFiles.push(m[i])
        }
      }
    }
    onMounted(() => {
      begin()
    })
    return {
      onMounted,
      checkData,
      workData,
      tableData,
      attachmentImages,
      attachmentFiles,
    };
  },
};
</script>


<style scoped>

</style>