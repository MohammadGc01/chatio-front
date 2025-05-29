<template>

  <div v-if="Friend_ID" class="chat_input">
   <form @submit.prevent="send_message">
    <input type="text" class="rounded-5" placeholder="text...." v-model="message">
    <button :disabled="!message" type="submit" class="rounded-5">send</button>
   </form>
  </div>

</template>
<script>
import { decode } from '@/utills/jwt';

export default {
  props : {
    Friend_ID : {
      type : Number,
      required : true
    }
  },
  data() {
    return {
      user : {},
      message : ""
    }
  },
  methods : {
   async send_message(){

      await fetch('http://localhost:3500/chat/send',{
         method : "POST",
         headers : {
          "Content-Type": "application/json"
         },
         body : JSON.stringify( {
          target_id : this.Friend_ID,
          sender_id : this.user.id,
          message : this.message
         })
      })

    }
  },
  async mounted() {
    this.user = await decode(localStorage.getItem("chatio_token"))
  }
}
</script>
<style>
.chat_input{
  width: 500px;
  background-color: #292f3f;
  height: 50px;
  margin: 20px;
  border-radius: 20px;
}
.chat_input input {
  background-color: #33405e;
  border: none;
  height: 40px;
  margin-left: 5px;
  margin-top: 5px;
  padding-left: 20px;
  color: white;
  box-shadow: 0 0 5px 3px #333;

  width: 380px;
}
.chat_input input::placeholder{
 color: white;
}
.chat_input button {
  margin-left: 10px;
     background-color: #33405e;
  border: none;
  box-shadow: 0 0 5px 3px #333;
  height: 40px;
  width: 80px;
}
</style>
