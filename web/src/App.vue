<template>
  <el-row>
    <h1>欢迎“{{u}} ”进入聊天室({{usernum}}人)</h1>
    <h4>一起聊天的还有：{{usersss}}</h4>
    <el-col :span="6" offset="6" id="chatlist" class="chatlists">
      <ul v-for="(item,index) in items" :key="index">
        <p>{{item.un}}</p>
        <el-tag>{{item.m}}</el-tag>
      </ul>
    </el-col>
    <el-col :span="6" offset="1">
      <el-form id="msgdata" @submit.native.prevent="sendmsg">
        <el-input type="text" v-model="msginput" id="msg" placeholder="请输入内容" @input="change($event)"></el-input>
        <el-button style="margin-top:10px" native-type="submit">发送</el-button>
      </el-form>

    </el-col>
    <Login v-on:spot="spot"></Login>
  </el-row>
  
</template>
 
<script>
import Login from './views/Login'
export default{
  components: {Login},
  data(){  
    return{
      users:[],
      usersss:"",
      items:[],
      u:"",
      usernum:"",
      msginput:""
    }

  },

  sockets:{
    //接收消息
    new_message(data){
    this.items.push({m:data.msg,un:data.userna})        
    },
    //获取当前用户信息
    get_users(data){

    //获取在线用户数量
    this.usernum = data[0]

    //获取当前所有用户
    this.usersss  = data[1].join(',')
    }
  },
   
  methods:{
    //element-input 显示问题
    change(){ 
      this.$forceUpdate()	
    },
  
    //发送消息
    sendmsg(){
      if(this.msginput!="" && this.msginput.split(" ").join("").length!=0){
        this.$socket.emit('send_message',this.msginput);
        
        this.empty();
        
      }
      else{
        this.empty();
      }
         
    },

    //清空消息输入框
    empty(){
      this.msginput=""
    },
    //子组件传来的数据
    spot:function(data){
      this.u = data
      //console.log(this.u)
    }   
    
  }
}

</script>
<style scoped>
  .chatlists{
    padding: 10px 10px;
    border-radius: 2px;
    background: rgb(148, 191, 241);
    height: 600px;
    max-height: 600px;
    overflow: auto;
  }
  p{
    color: #FFF;
    font-weight: bold;
    font-size:7px;
    margin-bottom: 2px;
    padding-left: 6px;
  }
  h1{
    text-align: center
  }
  h4{
    text-align: center
  }
  
</style>