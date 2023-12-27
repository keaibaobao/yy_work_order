<template>
  <div>
    <el-divider content-position="left">保养详情</el-divider>
    <div id="pdfDom">
      <div style="display: flex;justify-content: space-between;align-items: center;padding: 15px">
        <div style="flex: 1;display: flex; justify-content: start;align-items: center">
          <div style="width: 180px"> 保养类型：</div>
          <div>{{myData.upkeepClassify}}</div>
        </div>

        <div style="flex: 1;display: flex; justify-content: start;align-items: center">
          <div style="width: 180px"> 保养费用：</div>
          <div>{{myData.upkeepExpense}}元</div>
        </div>

      </div>
      <template v-if="myData.record_state==='执行中'">

          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="item_content" label="项目名称" width="180" />
            <el-table-column prop="notice" label="注意事项" width="180" />
            <el-table-column prop="upkeep_way" label="保养方法" />
          </el-table>
        <div style="display: flex;justify-content: space-between;align-items: center;padding: 15px">
          <div style="flex: 1;display: flex; justify-content: start;align-items: center">
            是否有异常：
          </div>

          <div style="flex: 1;display: flex; justify-content: start;align-items: center">
            <el-switch v-model="isUnusual" inline-prompt active-text="是" active-color="red" inactive-text="否"></el-switch>
          </div>
        </div>
      </template>
      <template v-if="myData.record_state==='已完成'||myData.record_state==='已验收'">

        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="item_content" label="项目名称" width="180" />
          <el-table-column prop="notice" label="注意事项" width="180" />
          <el-table-column prop="upkeep_way" label="保养方法" />
        </el-table>

        <div style="display: flex;justify-content: space-between;align-items: center;padding: 15px">
          <div style="flex: 1;display: flex; justify-content: start;align-items: center">
            是否有异常：{{myData.isUnusual}}
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
        <el-button @click="UpkeepSubmitData()">提交</el-button>
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
    <div style="width: 100%;display: flex;justify-content:flex-end;">
      <div style="margin-right: 10px;"><el-button type="button" class="btn btn-primary"  @click="pdfBtn">导出PDF</el-button></div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, reactive, ref, toRefs, watch} from "vue";
import {submit_file, submit_upkeep} from "@/api/business.ts";
import {getRoles} from "@/utils/auth.ts";
import {ElMessage} from "element-plus";
import {htmlToPdf} from "@/utils/htmlToPdf.ts";

export default defineComponent({
  name: "UpkeepDectail",
  emits: ['UpkeepSubmitData'],
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
    const myDataUpkeep = reactive({
      upkeepClassify:"",
      upkeepExpense:""
    });
    const  mData  =  props.mData
    const  mData2  =  props.mData2
    const isUnusual = ref(false)
    const imgPath = reactive([] as Array<string>)
    const filePath = reactive([] as Array<string>)
    const attachmentImages = reactive([] as Array<string>)
    const attachmentFiles = reactive([] as Array<string>)
    const tableData = reactive([] as any[])
    let arr:object[] = [{}]
    let myData = reactive({
      workId:1,
      upkeepClassify:"",
      upkeepExpense:"",
      isUnusual:"",
      record_state:"",
      photo:"",
      file:""
    })

    watch(
        props,
        (newProps) => {
          console.log(newProps); //这里看到新值
          const  mData  =  newProps.mData
          const  mData2  =  newProps.mData2
          myData.workId=mData2.workId
          myData.record_state=mData2.record_state
          myData.upkeepClassify=mData.upkeepClassify
          myData.upkeepExpense=mData.upkeepExpense
          myData.isUnusual=mData.isUnusual==true?"是":"否"

          arr=JSON.parse(mData.data)
          for(let i=0;i<arr.length;i++){
            tableData.push(
                {
                  item_content: JSON.parse(JSON.stringify(arr[i])).upkeepItemContent,
                  notice: JSON.parse(JSON.stringify(arr[i])).upkeepAttention,
                  upkeep_way: JSON.parse(JSON.stringify(arr[i])).upkeepMethod,
                }
            )
          }
          getAttachmentFiles(mData.file)
          getAttachmentImages(mData.photo)
        }
    );






    const getAttachmentImages = (photo:string) => {
      if(photo!=null){
        var m = photo.split(",");
        for(var i=0;i<m.length;i++){
          attachmentImages.push(m[i])
        }
      }
    }
    const getAttachmentFiles = (file:string) => {
      if(file!=null){
        var m = file.split(",");
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

    onMounted(() => {


    })
    const UpkeepSubmitData=()=>{
      console.log(typeof isUnusual.value)
      /*if(getRoles()==JSON.stringify(mData.value.userPhone)){*/
      submit_file(mData2.workId,imgPath.join(), filePath.join()).then((res) => {
        console.log(res)
      })
      submit_upkeep(myData.workId,
          isUnusual.value
          ).then((res) => {
        console.log(res)
      })

      emit('UpkeepSubmitData');
      /*}else {
        ElMessage('非本人请勿操作')
      }*/
    }
    const downloadFile=(file:any)=>{
      console.log(file)
      window.location.href=file;
    }
    const pdfBtn=()=>{
      htmlToPdf();
    }
    return {
      myData,
      getAttachmentImages,
      getAttachmentFiles,
      handleImgSuccess,
      handleFileSuccess,
      attachmentImages,
      attachmentFiles,
      UpkeepSubmitData,
      arr,
      tableData,
      myDataUpkeep,
      isUnusual,
      downloadFile,
      pdfBtn
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
