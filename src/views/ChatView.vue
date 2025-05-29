<template>
  <div class="row me-1">
    <div class="sidebar ">
      <div class="p-2">
        Friend's <span><img src="/plus.png" width="20px" alt="" class="ms-5" data-bs-toggle="modal" data-bs-target="#exampleModal"></span>
      </div>
      <hr>
      <div v-for="friend in friends" :key="friend.id" class="friends" @click="friend_id = friend.id">
        <img :src="`http://localhost:3500/image/profile/${friend.id}`" width="40px" height="40px" class="rounded-5" alt="">
        <span>{{friend.username}}</span>
        <span class="status"><img src="/green-circle.svg" width="10px" alt=""></span>
      </div>


    </div>
    <div class="col-5">
      <chat_msg :-friend_-i-d="friend_id" />
      <chat_input :-friend_-i-d="friend_id" />
    </div>

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Find User </h1>
   <input class="form-control form-control-lg" type="text" placeholder=".form-control-lg" aria-label=".form-control-lg example" v-model="userfind">
      </div>
    <div class="modal-body">
    <div v-for="users in users_data" :key="users.id" class="friend-find">
      <div v-if="users.id == user.id">
         <!-- چیزی نشون نمیده -->
      </div>
      <div v-else>
        <img :src="`http://localhost:3500/image/profile/${user.id}`" width="40px" alt="">
      <span>{{ users.username }}</span>
      <button class="" @click="addfriend(users.id)">add friend</button>
      </div>
    </div>

</div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
  </div>
</template>


<script>
import chat_input from '@/components/chat-input.vue'
import chat_msg from '@/components/chat-messages.vue'
import { decode } from '@/utills/jwt';

export default {
  data() {
    return {
      friend_id: "",
      userfind : "",
      users_data : [],
      user : {},
      friends: [],
      token : localStorage.getItem("chatio_token")
    }
  },
  components: {
    chat_input,
    chat_msg
  },
  methods : {
  async getUsers() {
  try {
    const response = await fetch(`http://localhost:3500/user/search/${this.userfind}`);
    const data = await response.json();
    this.users_data = data;
    console.log(this.users_data);

  } catch (error) {
    console.error('Error fetching users:', error);
  }
},
async  addfriend(receiver_id) {
 const response = await fetch('http://localhost:3500/user/addfriend', {
  method : "POST",
  headers : {
    "Content-type": "application/json"
  },
  body : JSON.stringify({
    requester_id : this.user.id,
    receiver_id : receiver_id
  })

 });
    const data = await response.json();
    console.log(data);

},
async getfriends(){
  const response = await fetch(`http://localhost:3500/user/getfriend/${this.user.id}`);
    const data = await response.json();
   this.friends = Array.from(new Map(data.map(f => [f.id, f])).values());

    console.log(data);
}

  },
async created() {

  const decoded = await decode(this.token);

  if (!decoded || decoded.message) {
    return (window.location.href = '/login');
  }

  this.user = decoded;
  this.getfriends();
},


  watch : {
    userfind(newVal){
      if(newVal){
         this.getUsers()
      }
    }

  },


}
</script>


<style scoped>
.sidebar {
  background-color: #292f3f;
  width: 200px;
  padding: 5px;
  margin: 30px;
  height: 900px;
  border-radius: 15px;
  box-shadow: 0 0 5px 3px #333;
}

.friends {
  background-color: #1b2130;
  padding: 5px;
  box-shadow: 0 1px 5px 2px #1b2130;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 25px;
}

.friends span {
  margin-left: 10px !important;
}

.friends .status {
  margin-left: 30px !important;
}

.friend-find{
  width: 220px;
   background-color: #1b2130c0;
  padding: 8px;
  box-shadow: 0 1px 5px 2px #1b2130;
  border-radius: 10px;
  margin-top: 25px;
  color: white;
}
.friend-find img {
  width: 40px;
  height: 40px;
  border-radius: 20px;
}

.friend-find span {
  margin-left: 20px;
}
</style>
