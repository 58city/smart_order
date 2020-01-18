<template>
  <div id="attribute">
    <el-card>
      <el-alert show-icon title="注意：只允许为第三级分类设置相关参数！" type="warning" :closable="false"></el-alert>
      <el-row class="cat_opt">
        <el-col>
          <span>选择商品分类：</span>
          <el-cascader placeholder="全部分类"
            v-model="selectedCatIds"
            :options="goodscatList"
            :props="{ value: '_id',label:'name', children:'children'}"
            @change="handleCascaderChange"
          >
          </el-cascader>
        </el-col>
      </el-row>
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane label="动态参数" name="many">
          <el-button 
            type="primary" size="mini"  
            :disabled="selectedCatIds.length!=3"
            @click="handleDialogShow('add')"
          >
            添加参数
          </el-button>
          <el-table :data="manyData" border stripe>
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag v-for="(attr,index) in scope.row.attrs" :key="index" closable @close="handleTagClose(scope.row,index)">
                  {{attr}}
                </el-tag>
                <el-input
                  class="input-new-tag" size="small" ref="tagInput"
                  v-if="scope.row.tagInputVisible" v-model="scope.row.tagInputValue"
                  @keyup.enter.native="handleTagInputConfirm(scope.row)" @blur="handleTagInputConfirm(scope.row)"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="handleTagInputShow(scope.row)">+ New Tag</el-button>
              </template>
            </el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="参数名称" prop="name"></el-table-column>
            <el-table-column label="所属分类" prop="cid.name"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleDialogShow('edit',scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="del(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <el-button 
            type="primary" size="mini" 
            :disabled="selectedCatIds.length!=3"
            @click="handleDialogShow('add')"
          >
            添加属性
          </el-button>
          <el-table :data="onlyData" border stripe>
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag v-for="(attr,index) in scope.row.attrs" :key="index" closable @close="handleTagClose(scope.row,index)">
                  {{attr}}
                </el-tag>
                <el-input
                  class="input-new-tag" size="small" ref="tagInput"
                  v-if="scope.row.tagInputVisible" v-model="scope.row.tagInputValue"
                  @keyup.enter.native="handleTagInputConfirm(scope.row)" @blur="handleTagInputConfirm(scope.row)"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="handleTagInputShow(scope.row)">+ New Tag</el-button>
              </template>
            </el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="属性名称" prop="name"></el-table-column>
            <el-table-column label="所属分类" prop="cid.name"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleDialogShow('edit',scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="del(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <el-dialog
      :title="dialogAction+dialogTitle" width="50%"
      :visible.sync="isDialogShow"
      @close="handleAddDialogClose"
    >
      <el-form ref="attrAddForm" :model="attrFormInfo" :rules="attrFormRules" label-width="80px">
        <el-form-item :label="dialogTitle" prop="name">
          <el-input v-model="attrFormInfo.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isDialogShow = false">取 消</el-button>
        <el-button type="primary" v-if="dialogAction=='添加'" @click="add">确 定</el-button>
        <el-button type="primary" v-if="dialogAction=='编辑'" @click="edit(true)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {get_goodscat} from 'network/admin/goodscat.js'
  import {get_goodsattr,create_goodsattr,update_goodsattr,delete_goodsattr} from 'network/admin/goodsattr.js'
  export default {
    name:'Attribute',
    data() {
      return {
        goodscatList:[],          // 所属的分类列表
        selectedCatIds:[],        // 选择的分类ID
        activeName:'many',        // 默认激活的选项卡
        manyData:[],              // 动态参数数据
        onlyData:[],              // 静态属性数据
        isDialogShow:false,       // 控制添加和修改对话框的显示隐藏
        dialogAction:'add',       // 控制添加和修改对话框的行为和样式
        currentAttrId:'',         // 要修改的参数id
        attrFormInfo:{            // 增、改、查的数据空间
          name:'',
          cid:'',
          type:'many',
          attrs:''
        },
        attrFormRules:{           // 增、改时name的验证规则
          name:[
            { required: true, message: '请输入参数名称', trigger: 'blur' }
          ]
        }
      }
    },
    created(){
      this.getCatList()
      this.get()
    },
    methods: {
      getCatList(){
        get_goodscat({deleted:false}).then(res=>{
          this.goodscatList=res.data.list
        }).catch(err=>{
          this.$message.error(err.message)
        })
      },
      add(){
        this.$refs.attrAddForm.validate(res=>{
          if(res){
            this.attrFormInfo.cid=this.getCid
            this.attrFormInfo.type=this.activeName
            create_goodsattr(this.attrFormInfo).then(res=>{
              this.$message.success('添加成功')
              this.isDialogShow=false
              this.attrFormInfo.name=''
              this.get()
            }).catch(err=>{
              this.$message.error(err.message)
            })
          }
        })
      },
      get(){
        this.attrFormInfo.cid=this.getCid
        this.attrFormInfo.type=this.activeName
        get_goodsattr(this.attrFormInfo).then(res=>{
          res.data.list.forEach(element => {
            element.attrs=element.attrs.split(' ')
            if(element.attrs.length==1&&element.attrs[0]==''){
              element.attrs=[]
            }
            element.tagInputVisible=false
            element.tagInputValue=''
          })
          if(this.activeName=='many'){
            this.manyData=res.data.list
          }else{
            this.onlyData=res.data.list
          }
        }).catch(err=>{
          this.$message.error(err.message)
        })
      },
      edit(refresh,callback){
        update_goodsattr(this.currentAttrId,this.attrFormInfo).then(res=>{
          this.$message.success('修改成功')
          this.isDialogShow=false
          this.attrFormInfo.name=''
          this.attrFormInfo.attrs=''
          callback&&callback()
          refresh&&this.get()
        }).catch(err=>{
          this.$message.error(err.message)
        })
      },
      del(index,row){
        this.$confirm('点击确定将会删除此分类参数, 是否继续?', '删除参数', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delete_goodsattr({id:row._id}).then(res=>{
            this.$message.success('删除成功')
            // 同步视图
            if(this.activeName=='many'){
              this.manyData.splice(index,1)
            }else{
              this.onlyData.splice(index,1)
            }
          }).catch(err=>{
            this.$message.error(err.message)
          })
        })
      },
      handleCascaderChange(val){
        this.get()
        if(this.selectedCatIds.length!=3){   
          this.selectedCatIds=[]
          return 
        }
      },
      handleTabClick(){
        this.get()
      },
      handleAddDialogClose(){
        this.$refs.attrAddForm.resetFields()
        this.attrFormInfo.name=''
      },
      handleDialogShow(action,row){
        if(action=='add'){
          this.dialogAction='添加'
        }else if(action=='edit'){
          this.dialogAction='编辑'
        }
        if(row){
          this.attrFormInfo.name=row.name
          this.currentAttrId=row._id
        }
        this.isDialogShow=true
      },
      handleTagInputShow(row){
        row.tagInputVisible=true
        this.$nextTick(_ => {
          this.$refs.tagInput.$refs.input.focus();
        });
      },
      handleTagInputConfirm(row){
        if(row.tagInputValue.trim()==''){
          row.tagInputValue=''
          row.tagInputVisible=false
          return false
        }
        let attrs=row.attrs.slice(0)
        attrs.push(row.tagInputValue)
        this.currentAttrId=row._id
        this.attrFormInfo.attrs=attrs.join(' ')
        this.edit(false,function () {
          row.attrs.push(row.tagInputValue)
          row.tagInputVisible=false
          row.tagInputValue=''
        }) 
      },
      handleTagClose(row,index){
        let attrs=row.attrs.slice(0)
        attrs.splice(index,1)
        this.currentAttrId=row._id
        this.attrFormInfo.attrs=attrs.join(' ')
        this.edit(false,function () {
          row.attrs.splice(index,1)
        }) 
      }
    },
    computed: {
      dialogTitle(){
        if(this.activeName=='many'){
          return '动态参数'
        }else{
          return '静态属性'
        }
      },
      getCid(){
        if(this.selectedCatIds[2]){
          return this.selectedCatIds[2]
        }else{
          return ''
        } 
      }
    }
  }
</script>

<style scoped>
  .cat_opt{
    margin: 15px 0;
  }
  .el-table{
    margin-top: 15px;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>