<template>
  <div id="admins-list">
    <data-table :data="adminList" :editable="auths.adminUsers.edit"
    @addClicked="add" @delClicked="delMany" 
    @checkboxChange="checkAll" @searchChange="search" 
    >
      <el-table-column label="邮箱" prop="email" width="200"></el-table-column>
      <el-table-column label="昵称" prop="nickname"></el-table-column>
      <el-table-column label="角色" prop="role.name"></el-table-column>
      <el-table-column label="权限" prop="role.description"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope" >
          <el-button size="mini" @click="edit(scope.$index, scope.row)" :disabled="!auths.adminUsers.edit">编辑</el-button>
          <el-button size="mini" type="danger" @click="del(scope.$index, scope.row)" :disabled="!auths.adminUsers.edit">删除</el-button>
        </template>
      </el-table-column>
    </data-table>
  </div>
</template>
<script>
import DataTable from 'components/admin/common/dataTable/DataTable'
import {get_admins,delete_admin} from 'network/admin/admins'
export default {
  name:'AdminsList',
  data() {
    return {
      adminList:[],
      checked:[]
    }
  },
  created() {
    this.get()
  },
  methods: {
    add(){
      this.$router.push({name:'admin-create'})
    },
    del(index,row){
      this.$confirm('点击确定将会删除此管理员, 是否继续?', '删除管理员', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delete_admin({id:row._id}).then(res=>{
          this.$message.success('删除成功')
          // 同步视图
          this.adminList.forEach((item,i)=>{
            if(item['_id']==row._id){
              this.adminList.splice(i,1)
              return false
            }
          })
        }).catch(err=>{
          this.$message.error(err.message)
        })
      })
    },
    edit(index,row){
      this.$router.push({name:'admin-update',params:{id:row._id}})
    },
    get(){
      get_admins().then(res=>{
        this.adminList=res.data.filter(item=>{
          if(!item.role){
            return true
          }
          return (item.role.authorities.indexOf(100000)==-1)&&(item.nickname!=this.$store.state.nickname)
        })
      }).catch(err=>{
        this.$message.error(err.message)
      })
    },
    checkAll(val){
      this.checked=val
    },
    delMany(){
      if(this.checked.length==0){
        this.$message.error('请选择需要删除的项目')
        return false
      }
      this.$confirm('此操作将会批量删除管理员, 是否继续?', '删除管理员', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delete_admin({ids:this.checked.map(item=>item._id)}).then(res=>{
          this.$message.success('删除成功')
          // 同步视图
          // 这里要倒序循环，因为splice会改变原数组（索引跟着改变），会导致正序循环不能正确删除
          for(var i=this.adminList.length-1;i>=0;i--){
            if(this.checked.map(item=>item._id).indexOf(this.adminList[i]['_id'])!=-1){
              this.adminList.splice(i,1)
            }
          }
        }).catch(err=>{
          this.$message.error(err.message)
        })
      })
    },
    search(content){
      get_admins({search:content}).then(res=>{
        this.adminList=res.data.filter(item=>{
          return (item.role.authorities.indexOf(100000)==-1)&&(item.nickname!=this.$store.state.nickname)
        })
      }).catch(err=>{
        this.$message.error(err.message)
      })
    }
  },
  computed: {
    auths(){
      return this.$store.getters.getAuths
    }
  },
  components:{DataTable}
}
</script>

<style>

</style>