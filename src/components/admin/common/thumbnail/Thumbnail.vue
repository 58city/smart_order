<template>
  <div id="thumbnail">
    <el-upload class="thumbnail-upload" action="" :before-upload="beforeUpload">
      <img v-if="imageUrl" :src="imageUrl">
      <i v-else class="el-icon-plus"></i>
    </el-upload>
  </div>
</template>

<script>
import { VueCropper }  from 'vue-cropper'
import mimes  from './mimes'
export default {
  name:'Thumbnail',
  data() {
    return {
      imageUrl: ''
    };
  },
  methods: {
    beforeUpload(file) {
      const isImage = Object.values(mimes).indexOf(file.type)!=-1
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isImage) {
        this.$message.error('请选择正确的图片格式')
        return false
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB')
        return false
      }
      console.log(file.raw)
      return false
    }
  },
  components:{
    VueCropper
  }
}
</script>

<style>
  .thumbnail-upload .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .thumbnail-upload .el-upload:hover {
    border-color: #409EFF;
  }
  .thumbnail-upload .el-icon-plus {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .thumbnail-upload img{
    width: 178px;
    height: 178px;
    display: block;
  }
</style>