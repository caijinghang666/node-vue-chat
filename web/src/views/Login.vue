<template>
  <el-dialog title="登录" width="30%" :visible.sync="dialogTableVisible" :showClose=false :close-on-click-modal='false'>
  <!-- <el-dialog :visible.sync="dialogVisible" v-if='dialogVisible'> -->
    <el-form id="msgdata" @submit.native.prevent="login">
      <el-input type="text" v-model="usernameinput" id="msg" placeholder="输入用户名" @input="change($event)" @keyup.native="$event.target.value = $event.target.value.replace(/^\s+|\s+$/gm,'')"></el-input>
      <el-button type="primary" class="btn" native-type="submit">登录</el-button>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  data(){
    return{
      usernameinput:'',
      dialogTableVisible: true,
      
    }
  },
  methods:{
    //element-input 显示问题
    change(){ 
      this.$forceUpdate()	
    },
    login(){
      if(this.usernameinput!=""){
        this.$socket.emit('new_user',this.usernameinput,(data,callback)=>{
        if(data){
          console.log(data)
          this.dialogTableVisible=callback;
          this.$emit("spot", this.usernameinput)
          
        }
        else{
          alert('用户已经存在，请重新输入')
        }
        
      });
      }
      
  }


    
      
        
    
  }
}
</script>
<style scoped>
.btn{
  margin-top: 40px;  
  
}

</style>>