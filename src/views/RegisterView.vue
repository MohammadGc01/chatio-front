<template>
  <div class="container">
      <div class="form-register">
         <form @submit.prevent="register">
          <input type="text" placeholder="username" v-model="username">
          <input type="email" placeholder="email" v-model="email">
          <input type="password" placeholder="password" v-model="password">
          <input type="password again" placeholder="password again" v-model="password_again">
          <button type="submit">submit</button>
         </form>
         <RouterLink to="/login"> You have a account? </RouterLink>

      </div>

  </div>
</template>

<script lang="js">
export default {
  data(){
    return {
        email : "",
        username : "",
        password : "",
        password_again : "",
        message : ""
    }
  },
  methods : {
    async register() {
      if(this.password !== this.password_again){
        return this.message === "password dosent match"
      }
    const register_fetch = await fetch('http://localhost:3500/user/register', {
       method : "POST",
        headers: {
         'Content-Type': 'application/json'
       },
       body : JSON.stringify({
        username : this.username,
        email : this.email,
        password : this.password
       })
     });

     if(register_fetch.ok){
      const res = await register_fetch.json()
      console.log(res)

        this.message = res.message
        this.username = ""
        this.email = ""
        this.password = ""
        this.password_again = ""
     }
    },
  }
}
</script>


<style>
.form-register{
       background-color: #1f222a;
  width: 300px;
  padding: 26px;
 border-radius: 20px;
 margin-left: 500px;
 margin-top: 300px;
       box-shadow: 0 0 15px rgba(0,0,0,0.3);
}

input , button {
   padding: 8px;
   margin-top: 10px;
   border-radius: 10px;
     border: none;
     background-color: #1f222a;
      box-shadow: 0 0 15px rgba(0,0,0,0.3);
          border: 1px solid #444;
}

button {
  color: white;

}

</style>
