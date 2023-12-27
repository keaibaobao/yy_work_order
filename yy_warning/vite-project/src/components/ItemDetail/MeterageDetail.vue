<template>
  <div>
    <el-divider content-position="left">计量详情</el-divider>
    <div id="pdfDom">
      <div style="display: flex;justify-content: space-between;align-items: center;padding: 15px">
        <div style="flex: 1;display: flex; justify-content: start;align-items: center">
          <div style="width: 180px"> 计量等级：</div>
          <div>{{myData.measureGrade}}</div>
        </div>

        <div style="flex: 1;display: flex; justify-content: start;align-items: center">
          <div style="width: 180px"> 计量类别：</div>
          <div>{{myData.measureClassify}}</div>
        </div>

        <div style="flex: 1;display: flex; justify-content: start;align-items: center">
          <div style=" width: 180px"> 计量证书编号：</div>
          <div>{{myData.certificateBh}}</div>
        </div>
      </div>
      <div style="display: flex;justify-content: space-between;align-items: center;padding: 15px">
        <div style="flex: 1;display: flex; justify-content: start;align-items: center">
          <div style="width: 180px"> 计量单位：</div>
          <div>{{myData.measureUnits}}</div>
        </div>

        <div style="flex: 1;display: flex; justify-content: start;align-items: center">
          <div style="width: 180px"> 出厂编号：</div>
          <div>{{myData.manufacturBh}}</div>
        </div>

        <div style="flex: 1;display: flex; justify-content: start;align-items: center">
          <div style=" width: 180px"> 生产厂商：</div>
          <div>{{myData.manufacturer}}</div>
        </div>
      </div>
      <template v-if="myData.record_state==='执行中'">
        <div style="display: flex;justify-content: space-between;align-items: center;padding: 15px">
          <div style="flex: 1;display: flex; justify-content: start;align-items: center">
            <div style="width: 180px"> 计量应检日期：</div>
            <div>{{myData.execDate}}</div>
          </div>

          <div style="flex: 1;display: flex; justify-content: start;align-items: center">
            <div style=" width: 180px"> 计量费用：</div>
            <div>{{myData.expense}}</div>
          </div>

          <div style="flex: 1;display: flex; justify-content: start;align-items: center">
            <div style=" width: 180px"> 检定机构：</div>
            <el-input style="width: 100%" v-model="myData.organ" size="large"
                      placeholder="填写检定机构"/>
          </div>
        </div>


        <div style="display: flex;justify-content: space-between;align-items: center;padding: 15px">

          <div style="flex: 1;display: flex;justify-content: start;align-items: center;">
            <div style="width: 180px"> 检定方式：</div>
            <el-select style="width: 100%" v-model="myData.way" size="large"
                       placeholder="选择检定方式">
              <el-option
                  v-for="item in record_way_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              >
              </el-option>
            </el-select>
          </div>

          <div style="flex: 1;display: flex; justify-content: start;align-items: center">
            <div style=" width: 180px"> 计量检测结果：</div>
            <el-select style="width: 100%" v-model="myData.result" size="large"
                       placeholder="选择计量检测结果">
              <el-option
                  v-for="item in record_result_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              >
              </el-option>
            </el-select>
          </div>

          <div style="flex: 1;display: flex; justify-content: start;align-items: center">
            <div style=" width: 180px"> 实际检测时间：</div>
            <el-date-picker style="width: 100%" v-model="myData.workDate" type="date"
                            placeholder="实际检测时间">
            </el-date-picker>
          </div>
        </div>
      </template>
      <template v-if="myData.record_state==='已完成'||myData.record_state==='已验收'">

       <div style="display: flex;justify-content: space-between;align-items: center;padding: 15px">
          <div style="flex: 1;display: flex; justify-content: start;align-items: center">
            <div style="width: 180px"> 计量应检日期：</div>
            <div>{{myData.execDate}}</div>
          </div>

         <div style="flex: 1;display: flex; justify-content: start;align-items: center">
           <div style=" width: 180px"> 计量费用：</div>
           <div>{{myData.expense}}</div>
         </div>

          <div style="flex: 1;display: flex; justify-content: start;align-items: center">
            <div style=" width: 180px"> 检定机构：</div>
            <div>{{myData.organ}}</div>
          </div>
        </div>

        <div style="display: flex;justify-content: space-between;align-items: center;padding: 15px">
          <div style="flex: 1;display: flex; justify-content: start;align-items: center">
            <div style="width: 180px"> 检定方式：</div>
            <div>{{myData.way==0?"院内":"外包"}}</div>
          </div>

          <div style="flex: 1;display: flex; justify-content: start;align-items: center">
            <div style="width: 180px"> 计量检测结果：</div>
            <div>{{myData.result==true?"合格":"不合格"}}</div>
          </div>

          <div style="flex: 1;display: flex; justify-content: start;align-items: center">
            <div style="width: 180px"> 实际检测时间：</div>
            <div>{{myData.workDate}}</div>
          </div>
        </div>

    </template>
    </div>
    <template v-if="myData.record_state==='执行中'">
      <div style="display: flex;justify-content: space-between;align-items: center;padding: 15px">
        <div>
          照片附件：
        </div>
      </div>
      <div style="display: flex;justify-content: space-between;align-items: center;padding: 15px">


        <el-upload
            action="/warn/measure/Upload"
            list-type="picture-card"
            :on-success="handleImgSuccess"
            multiple="true"
        >

          <img width="50px" height="50px" src="../../../public/logo.png" />
        </el-upload>
        <el-dialog v-model="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>

      </div>

      <div style="display: flex;justify-content: space-between;align-items: center;padding: 15px">
        <div>
          文件附件：
        </div>
      </div>
      <div style="display: flex;justify-content: space-between;align-items: center;padding: 15px">
        <el-upload
            class="upload-demo"
            action="/warn/measure/Upload"
            :on-success="handleFileSuccess"

        >
          <el-button size="small" type="primary">Click to upload</el-button>
        </el-upload>
      </div>
      <div
          style="display: flex;justify-content: right;align-items: center;padding: 15px;color: #006590; ">
        <el-button @click="MeterageSubmitData()">提交</el-button>
      </div>

    </template>
    <template v-if="myData.record_state==='已完成'||myData.record_state==='已验收'">
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
<!--                <img v-gallery:attachmentImages style="width: 80px;height: 80px;  " :src="img" alt=""/>-->
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
<!--    <el-button type="button" class="btn btn-primary" @click="pdfBtn">导出PDF</el-button>-->
  </div>
</template>

<script lang="ts">

import {submit_file, submit_measure} from "@/api/business.ts";
import {defineComponent, onMounted, reactive, toRefs, watch} from "vue";
// import {MeterageDataRequest} from "#/interface";



export default defineComponent({
  name: "MeterageDetail",
  emits: ['MeterageSubmitData'],
  props: {
    mData: {
      type: Object,
      default: {}
    },
    mData2:{
      type: Object,
      default: {}
    }
  },
  setup(props,{emit}) {
    const {mData,mData2} = toRefs(props)

    const imgPath = reactive([] as Array<string>)
    const filePath = reactive([] as Array<string>)
    const attachmentImages = reactive([] as Array<string>)
    const attachmentFiles = reactive([] as Array<string>)
    let myData = reactive({
      workId:"",
      measureGrade:"",
      measureClassify:"",
      certificateBh:"",
      measureUnits:"",
      manufacturBh:"",
      manufacturer:"",
      execDate:"",
      workDate:"",
      organ:"",
      way:"",
      result:"",
      expense:"",
      record_state:"",
      photo:"",
      file:""
    })
    const requsetMaterage:MeterageDataRequest= reactive({
      workId:1,
      result:true,
      workDate:"",
      organ:"",
      way:"",
      expense:""
    })
    const record_way_options = [
      {
        value: '0',
        label: '院内',
      },
      {
        value: '1',
        label: '外包',
      }
    ]

    const record_result_options = [
      {
        value: 'false',
        label: '不合格',
      },
      {
        value: 'true',
        label: '合格',
      }
    ]
  /*  const record_way_options = ref([
      {
        value: '0',
        label: '院内',
      },
      {
        value: '1',
        label: '外包',
      }
    ])
    const record_result_options = ref([
      {
        value: 'false',
        label: '不合格',
      },
      {
        value: 'true',
        label: '合格',
      }
    ])*/

    watch(
        props,
        (newProps) => {
          console.log(newProps); //这里看到新值
          const  mData  =  newProps.mData
          const  mData2  =  newProps.mData2
          myData.workId=mData2.workId
          myData.record_state=mData2.record_state
          myData.file=mData.file
          myData.photo=mData.photo
          myData.measureGrade = mData.measureGrade
          myData.measureClassify = mData.measureClassify
          myData.certificateBh = mData.certificateBh
          myData.measureUnits = mData.measureUnits
          myData.manufacturBh = mData.manufacturBh
          myData.manufacturer = mData.manufacturer
          myData.execDate = mData.execDate
          myData.workDate = mData.workDate
          myData.organ = mData.organ
          myData.way = mData.way
          myData.result = mData.result
          myData.expense = mData.expense
          getAttachmentFiles()
          getAttachmentImages()

        }
    );
    const getAttachmentImages = () => {
      if(mData.value.photo!=null){
        var m = mData.value.photo.split(",");
        for(var i=0;i<m.length;i++){
          attachmentImages.push(m[i])
        }
      }
    }
    const getAttachmentFiles = () => {
      if(mData.value.file!=null){
        var m = mData.value.file.split(",");
        for(var i=0;i<m.length;i++){
          attachmentFiles.push(m[i])
        }
      }
    }
    const handleImgSuccess =(response:string) =>{
      imgPath.push(response)
    }
    const handleFileSuccess =(response:string) =>{
      filePath.push(response)
    }
    const MeterageSubmitData=()=>{
      requsetMaterage.workId=parseInt(myData.workId)
      requsetMaterage.result=(myData.result=="true"?true:false)
      requsetMaterage.workDate=myData.workDate
      requsetMaterage.organ=myData.organ
      requsetMaterage.way=myData.way
      console.log("看这！"+JSON.stringify(myData))
      /*if(getRoles()==JSON.stringify(mData.value.userPhone)){*/
      if(requsetMaterage.result!=null&&requsetMaterage.workDate!=''&&requsetMaterage.organ!=''&&requsetMaterage.way!=''){
        submit_measure(requsetMaterage.workId,
            requsetMaterage.result,
            requsetMaterage.workDate,
            requsetMaterage.organ,
            requsetMaterage.way).then((res) => {
          console.log(res)
        })
        submit_file(mData2.value.workId,imgPath.join(), filePath.join()).then((res) => {
          console.log(res)
        })
        emit('MeterageSubmitData');
      }else{
        alert("请填写完整后提交")
      }
      /*}else {
        ElMessage('非本人请勿操作')
      }*/
    }
    onMounted(() => {
/*
      myData.workId=mData2.value.workId
      myData.record_state=mData2.value.record_state
      myData.file=mData.value.file
      myData.photo=mData.value.photo
      myData.measureGrade = mData.value.measureGrade
      myData.measureClassify = mData.value.measureClassify
      myData.certificateBh = mData.value.certificateBh
      myData.measureUnits = mData.value.measureUnits
      myData.manufacturBh = mData.value.manufacturBh
      myData.manufacturer = mData.value.manufacturer
      myData.execDate = mData.value.execDate
      myData.workDate = mData.value.workDate
      myData.organ = mData.value.organ
      myData.way = mData.value.way
      myData.result = mData.value.result
      myData.expense = mData.value.expense
        getAttachmentFiles()
        getAttachmentImages()
*/
    })

    const downloadFile=(file:any)=>{
      console.log(file)
      window.location.href=file;
    }

    return {
      myData,
      requsetMaterage,
      record_way_options,
      record_result_options,
      getAttachmentImages,
      getAttachmentFiles,
      handleImgSuccess,
      handleFileSuccess,
      attachmentImages,
      attachmentFiles,
      MeterageSubmitData,
      downloadFile,

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
