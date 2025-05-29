<template>
  <div v-if="Friend_ID" class="messages">

   <div
  class="message"
  :class="{ 'me': msg.sender_id === user.id, 'friend': msg.sender_id !== user.id }"
  v-for="(msg, index) in messages"
  :key="index"
>
  <p><strong>{{ msg.sender_id === user.id ? 'You' : 'Friend' }}:</strong> {{ msg.message }}</p>
</div>

  </div>
</template>

<script>
import { decode } from '@/utills/jwt';
import io from "socket.io-client";
const socket = io("http://localhost:3500");

export default {
  props : {
    Friend_ID : {
      type : Number,
      required : true
    }
  },
  data() {
    return {
      messages : [],
      user : {},
    }
  },
  methods : {
 async get_message() {
  const url = `http://localhost:3500/chat/get/${this.Friend_ID}/${this.user.id}`;

  const response = await fetch(url);

  if (response.ok) {
    this.messages = await response.json();
  } else {
    console.error("Error fetching messages", response.status);
  }
}

  },

  async mounted() {
    this.user = await decode(localStorage.getItem("chatio_token"));
    this.get_message();

    socket.on('new_message', (msg) => {
      // فقط پیام‌هایی که مربوط به این گفتگوان
      if (
        (msg.sender_id === this.user.id && msg.target_id === this.Friend_ID) ||
        (msg.sender_id === this.Friend_ID && msg.target_id === this.user.id)
      ) {
        this.messages.push(msg);
      }
    });
  },
  watch: {
    Friend_ID(newVal) {
      if (newVal && this.user.id) {
        this.get_message();
      }
    }
  }

}
</script>

<style>
 .messages{
   width: 500px;
  background-color: #292f3f;
  margin: 20px;
  border-radius: 20px;
  padding: 20px;
 }
 .message{
  background-color: #1e212b;
  margin: 20px;
  border-radius: 20px;
  padding: 8px;
 }

 .message.me {
  background-color: #33405e;
  text-align: right;
}
.message.friend {
  background-color: #1e212b;
  text-align: left;
}

</style>
