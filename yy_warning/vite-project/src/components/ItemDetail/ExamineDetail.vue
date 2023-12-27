<template>
  <div>
    <el-divider content-position="left">巡检详情</el-divider>

    <div id="pdfDom">
      <template  v-if="myData.record_state==='执行中'">
    <div v-for="(item,index) of itemList" style="display: flex;flex-direction: row;margin-bottom: 20px">
      <div style="margin-right: 50px;">{{item.itemContent}}</div>
      <div v-if="item.resultType=='text'">
        <el-input
            v-model="radio[item.itemId]"
            maxlength="50"
            placeholder="Please input"
            show-word-limit
            type="text"
            style="width: 500px"
        >
        </el-input>
      </div>
      <div v-if="item.resultType=='select'">
        <el-select v-model="radio[item.itemId]" @change="radioChange" class="m-2"  size="large">
          <el-option
              v-for="option in item.data"
              :key="option.checkPlanItemId"
              :label="option.checkPlanOptionContent"
              :value="option.checkPlanOptionContent"
          >
          </el-option>
        </el-select>
      </div>
    </div>

    </template>
      <template v-if="myData.record_state==='已完成'||myData.record_state==='已验收'">
        <el-table :data="itemList" stripe style="width: 100%">
          <el-table-column prop="itemContent" label="检查项目名" width="400" />
          <el-table-column prop="value" label="检查结果" width="400" />

        </el-table>
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
        <el-button @click="ExamineSubmitData()">提交</el-button>
        <el-button @click="FastSubmit()">一键提交</el-button>

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
import {defineComponent, onMounted, reactive, toRefs, watch} from 'vue'
import {get_examine_list, submit_examine, submit_file, submit_value} from "@/api/business.ts";
// import {getJSON} from "js-cookie";
import {htmlToPdf} from "@/utils/htmlToPdf.ts";
import { ElMessage, ElMessageBox } from 'element-plus'

export default defineComponent ({
  name: "ExamineDetail",
  emits: ['ExamineSubmitData'],
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
  setup: function (props, {emit}) {
    const {mData} = toRefs(props)
    const itemList = reactive([] as any[])
    const tableData = reactive([] as any[])
    const m = new Map()

    /*let radio:string[]=["锋利"]*/
    let radio = reactive([] as any[])
    const imgPath = reactive([] as Array<string>)
    const filePath = reactive([] as Array<string>)
    const attachmentImages = reactive([] as Array<string>)
    const attachmentFiles = reactive([] as Array<string>)
    let arr: object[] = [{itemContent: "", value: ""}]
    let arr2: object[] = [{checkPlanOptionContent: ""}]
    let obj = reactive({
      itemContent: "",
      value: ""
    })
    let myData = reactive({
      workId: 1,
      record_state: "",
      photo: "",
      file: ""
    })


    watch(
        props,
        (newProps) => {
          console.log(newProps); //这里看到新值
          const  mData  =  newProps.mData
          const  mData2  =  newProps.mData2
          myData.record_state = mData2.record_state
          myData.workId = mData.workId
          getAttachmentFiles()
          getAttachmentImages()
          get_examine_list(myData.workId).then((res) => {
            itemList.length = 0
            for (let i = 0; i < JSON.parse(JSON.stringify(res)).length; i++) {
              itemList.push(
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
        }
    );




    onMounted(() => {
  /*
      myData.record_state = mData2.value.record_state
      myData.workId = mData.value.workId
      getAttachmentFiles()
      getAttachmentImages()

      get_examine_list(myData.workId).then((res) => {

        itemList.length = 0
        for (let i = 0; i < JSON.parse(JSON.stringify(res)).length; i++) {

          itemList.push(
              {
                itemId:JSON.parse(JSON.stringify(res))[i].itemId,
                itemContent: JSON.parse(JSON.stringify(res))[i].itemContent,
                resultType:JSON.parse(JSON.stringify(res))[i].resultType,
                data: JSON.parse(JSON.parse(JSON.stringify(res))[i].data),
                value:JSON.parse(JSON.stringify(res))[i].value,
              }
          )

        }
      })*/
    })
    const radioChange=(val:any) => {
      console.log("这是我第个项目的选中值",val)
      console.log("我是radio",radio)
    }
    const getAttachmentImages = () => {
      if (mData.value.photo != null) {
        var f = mData.value.photo.split(",");
        for (var i = 0; i < f.length; i++) {
          attachmentImages.push(f[i])
        }
      }
    }
    const getAttachmentFiles = () => {
      if (mData.value.photo != null) {
        var f = mData.value.file.split(",");
        for (var i = 0; i < f.length; i++) {
          attachmentFiles.push(f[i])
        }
      }
    }
    const handleImgSuccess = (response: string) => {
      imgPath.push(response)
    }
    const handleFileSuccess = (response: string) => {
      filePath.push(response)
    }

    const selectChange = (event: any, res: any) => {
      m.set(res, event)
      console.log("我是m的长度", m)
      /*console.log("我是总长度"+arr.length)*/
    }

    const ExamineSubmitData = () => {
      /*if(getRoles()==JSON.stringify(mData.value.userPhone)){*/

        //提交
      for(let i=0;i<radio.length;i++){
        if(radio[i]!=null&&radio[i]!=""){
          submit_value(i,radio[i]).then((res) => {
            console.log(res)
          })
        }
      }
        submit_examine(myData.workId).then((res) => {
          console.log(res)
        })
        submit_file(myData.workId, imgPath.join(), filePath.join()).then((res) => {
          console.log(res)
        })

        emit('ExamineSubmitData');

      /* }else {
         ElMessage('非本人请勿操作')
       }*/

    }
    const FastSubmit= () => {
      ElMessageBox.confirm(
          '您确定您巡检的项目都没问题要一键提交吗?',
          'Warning',
          {
            confirmButtonText: 'YES',
            cancelButtonText: 'NO',
            type: 'warning',
          }
      )
          .then(() => {

            //提交
            for(let i=0;i<itemList.length;i++){
              for (let j=0;j<itemList[i].data.length;j++){
                if(itemList[i].data[j].bestChoice==0){
                  submit_value(itemList[i].itemId,itemList[i].data[j].checkPlanOptionContent).then((res) => {
                    console.log(res)
                  })
                }
              }
            }
            submit_examine(myData.workId).then((res) => {
              console.log(res)
            })

            emit('ExamineSubmitData');

          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '已取消一键提交',
            })
          })




    }

    const downloadFile=(file:any)=>{
      window.location.href=file;
    }
    const pdfBtn=()=>{
      htmlToPdf();
    }
    return {
      selectChange,
      itemList,
      m,
      ExamineSubmitData,
      FastSubmit,
      myData,
      tableData,
      obj,
      arr,
      arr2,
      getAttachmentImages,
      getAttachmentFiles,
      handleImgSuccess,
      handleFileSuccess,
      attachmentImages,
      attachmentFiles,
      radio,
      radioChange,
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
