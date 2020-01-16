<template>
  <div id="roles-list">
      <data-table :data="roleList" @addClicked="add" @checkboxChange="checkall" @delClicked="delMany" @searchChange="search" :editable="auths.roles.edit">
        <el-table-column label="角色名称" prop="name" width="200"></el-table-column>
        <el-table-column label="角色说明" prop="description"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope" >
            <el-button size="mini" @click="edit(scope.$index, scope.row)" :disabled="!auths.roles.edit">编辑</el-button>
            <el-button size="mini" type="danger" @click="del(scope.$index, scope.row)" :disabled="!auths.roles.edit">删除</el-button>
          </template>
        </el-table-column>
      </data-table>
  </div>
</template>

<script>
import {get_role,delete_role} from 'network/admin/roles'
import DataTable from 'components/admin/common/dataTable/DataTable'
export default {
  name:'RolesList',
  data() {
    return {
      roleList:[],
      checked:[]
    }
  },
  created() {
    this.get()
  },
  methods: {
    add(){
      this.$router.push({name:'role-create'})
    },
    del(index,row){
      this.$confirm('点击确定将会删除此角色, 是否继续?', '删除角色', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delete_role({id:row._id}).then(res=>{
          this.$message.success('删除成功')
          // 同步视图
          this.roleList.forEach((item,i)=>{
            if(item['_id']==row._id){
              this.roleList.splice(i,1)
              return false
            }
          })
        }).catch(err=>{
          this.$message.error(err.message)
        })
      })
    },
    edit(index,row){
      this.$router.push({name:'role-update',params:{id:row._id}})
    },
    get(){
      get_role().then(res=>{
        this.roleList=res.data.filter(item=>{
          return item.authorities.indexOf(100000)==-1
        })
      }).catch(err=>{
        this.$message.error(err.message)
      })
    },
    checkall(val){
      this.checked=val
    },
    delMany(){
      if(this.checked.length==0){
        this.$message.error('请选择需要删除的项目')
        return false
      }
      this.$confirm('此操作将会批量删除角色, 是否继续?', '删除角色', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delete_role({_ids:this.checked.map(item=>item._id)}).then(res=>{
          this.$message.success('删除成功')
          // 同步视图
          // 这里要倒序循环，因为splice会改变原数组（索引跟着改变），会导致正序循环不能正确删除
          for(var i=this.roleList.length-1;i>=0;i--){
            if(this.checked.map(item=>item._id).indexOf(this.roleList[i]['_id'])!=-1){
              this.roleList.splice(i,1)
            }
          }
        }).catch(err=>{
          this.$message.error(err.message)
        })
      })
    },
    search(content){
      get_role({search:content}).then(res=>{
        this.roleList=res.data.filter(item=>{
          return item.authorities.indexOf(100000)==-1
        })
      }).catch(err=>{
        this.$message.error(err.message)
      })
    }
  },
  components:{
    DataTable
  },
  computed: {
    auths(){
      return this.$store.getters.getAuths
    }
  }
}
</script>

<style>

</style>