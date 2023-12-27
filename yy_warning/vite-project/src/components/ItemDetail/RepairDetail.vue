<template>
  <div>
    <el-divider content-position="left">维修详情</el-divider>
    <div id="pdfDom">
      <div style="display: flex;justify-content: space-between;align-items: center;padding: 15px">
        <div style="flex: 1;display: flex; justify-content: start;align-items: center">
          <div style="width: 180px"> 存放地点：</div>
          <div>{{myData.savePlace}}</div>
        </div>

        <div style="flex: 1;display: flex; justify-content: start;align-items: center">
          <div style="width: 180px"> 品牌：</div>
          <div>{{myData.brand}}</div>
        </div>

        <div style="flex: 1;display: flex; justify-content: start;align-items: center">
          <div style=" width: 180px"> 规格：</div>
          <div>{{myData.specs}}</div>
        </div>
      </div>
      <div style="display: flex;justify-content: space-between;align-items: center;padding: 15px">
        <div style="flex: 1;display: flex; justify-content: start;align-items: center">
          <div style="width: 180px"> 实物图：</div>
          <div class="demo-image__preview">
            <el-image
                style="width: 100px; height: 100px"
                :src="myData.repairPicture"
                :zoom-rate="1.2"
                :preview-src-list="[myData.repairPicture]"
                :initial-index="4"
                fit="cover"
            />
          </div>
        </div>

        <div style="flex: 1;display: flex; justify-content: start;align-items: center">
          <div style="width: 180px"> 维修原因：</div>
          <div>{{myData.repairReason}}</div>
        </div>

        <div style="flex: 1;display: flex; justify-content: start;align-items: center" v-if="myData.record_state==='执行中'">
          <div style=" width: 180px"> 维修结果：</div>
          <el-select style="width: 100%" v-model="myData.repairResult" size="large"
                     placeholder="选择计量检测结果">
            <el-option
                v-for="item in repairResult_options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            >
            </el-option>
          </el-select>
        </div>

        <div style="flex: 1;display: flex; justify-content: start;align-items: center"  v-if="myData.record_state==='已完成'||myData.record_state==='已验收'">
          <div style="width: 180px"> 维修结果：</div>
          <div>{{myData.repairResult=="维修完成"?"维修完成":"无法维修"}}</div>
        </div>
      </div>
      <div style="display: flex;justify-content: space-between;align-items: center;padding: 15px">
        <div style="width: 180px"> 维修备注：</div>
        <el-input v-model="myData.remark" type="textarea" />
      </div>
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
        <el-button @click="RepairSubmitData()">提交</el-button>
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
  </div>



</template>

<script lang="ts">

import {defineComponent, onMounted, reactive, toRefs, watch} from "vue";
import {submit_file, submit_repair} from "@/api/business.ts";
import {RepairDataRequest} from "#/interface";



export default defineComponent({
  name: "RepairDetail",
  emits: ['RepairSubmitData'],
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

          myData.savePlace=mData.savePlace
          myData.brand=mData.brand
          myData.specs=mData.specs
          myData.repairPicture=mData.repairPicture
          myData.repairReason=mData.repairReason
          myData.repairResult=mData.repairResult
          getAttachmentFiles()
          getAttachmentImages()

        }
    );
    const repairResult_options = [
      {
        value: '无法维修',
        label: '无法维修',
      },
      {
        value: '维修完成',
        label: '维修完成',
      }
    ]
    let myData = reactive({
      workId:"",
      savePlace:"",
      brand:"",
      specs:"",
      repairPicture:"",
      repairReason:"",
      repairResult:"",
      record_state:"",
      remark:"",
      photo:"",
      file:""
    })
    const requsetRepair:RepairDataRequest= reactive({
      workId:1,
      savePlace:"",
      brand:"",
      specs:"",
      repairPicture:"",
      repairReason:"",
      repairResult:"",
      remark:"",
    })


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

    onMounted(() => {
      getAttachmentFiles()
      getAttachmentImages()

    })
    const RepairSubmitData=()=>{
      requsetRepair.workId=parseInt(myData.workId)
      requsetRepair.savePlace=myData.savePlace
      requsetRepair.brand=myData.brand
      requsetRepair.specs=myData.specs
      requsetRepair.repairPicture=myData.repairPicture
      requsetRepair.repairReason=myData.repairReason
      requsetRepair.repairResult=myData.repairResult
      requsetRepair.remark=myData.remark
      console.log("看这！"+JSON.stringify(myData))

      submit_repair(requsetRepair.workId,
          requsetRepair.repairResult,
          requsetRepair.remark).then((res) => {
        console.log(res)
      })

      submit_file(mData2.value.workId,imgPath.join(), filePath.join()).then((res) => {
        console.log(res)
      })

      emit('RepairSubmitData');
    }

    return {
      myData,
      getAttachmentImages,
      getAttachmentFiles,
      handleImgSuccess,
      handleFileSuccess,
      attachmentImages,
      attachmentFiles,
      RepairSubmitData,
      requsetRepair,
      repairResult_options
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
.demo-image__error .image-slot {
  font-size: 30px;
}
.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}
.demo-image__error .el-image {
  width: 100%;
  height: 200px;
}
</style>
